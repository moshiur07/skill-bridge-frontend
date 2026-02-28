"use client";

import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";
import { toast } from "sonner";

const API_BASE = "https://skill-bridge-backend-myyv.onrender.com";

interface User {
  id: string;
  name: string;
  email: string;
  image?: string;
}

const schema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters."),
  image: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
});
type FormValues = z.infer<typeof schema>;

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

export default function StudentProfileClient({ user }: { user: User }) {
  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");

  const form = useForm({
    defaultValues: { name: user.name ?? "", image: user.image ?? "" },
    onSubmit: async ({ value }) => {
      setApiError("");
      setSuccessMsg("");
      try {
        const res = await fetch(`${API_BASE}/api/users/${user.id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            name: value.name.trim(),
            image: value.image?.trim() || null,
          }),
        });
        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.message ?? `Update failed (${res.status})`);
        }
        toast.success("Your Profile Updated Successfully!!", {
          position: "top-center",
        });
        setSuccessMsg("Profile updated successfully.");
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        setApiError(
          err instanceof Error ? err.message : "Failed to update profile.",
        );
      }
    },
  });

  function validateField<K extends keyof FormValues>(
    field: K,
    value: FormValues[K],
  ) {
    const result = schema.shape[field].safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  }

  return (
    <div className="p-6 max-w-lg mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Update your account information.
        </p>
      </div>

      {/* Avatar preview */}
      <div className="flex items-center gap-4">
        <form.Subscribe selector={(s) => s.values.image}>
          {(image) => (
            <Avatar className="w-16 h-16">
              <AvatarImage src={image || undefined} alt={user.name} />
              <AvatarFallback className="text-base font-semibold bg-primary/10 text-primary">
                {initials(user.name ?? "S")}
              </AvatarFallback>
            </Avatar>
          )}
        </form.Subscribe>
        <div>
          <p className="font-medium">{user.name}</p>
          <p className="text-sm text-muted-foreground">{user.email}</p>
        </div>
      </div>

      <Card className="shadow-xl shadow-slate-800">
        <CardHeader className="pb-4">
          <CardTitle className="text-base">Account Info</CardTitle>
          <CardDescription>Your name and profile image.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-5">
          {/* Name */}
          <form.Field
            name="name"
            validators={{
              onChange: ({ value }) => validateField("name", value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                  placeholder="Your name"
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
              </div>
            )}
          </form.Field>

          <Separator />

          {/* Email — read only */}
          <div className="space-y-2">
            <Label>Email</Label>
            <Input
              value={user.email}
              disabled
              className="bg-muted text-muted-foreground"
            />
            <p className="text-xs text-muted-foreground">
              Email cannot be changed.
            </p>
          </div>

          <Separator />

          {/* Image URL */}
          <form.Field
            name="image"
            validators={{
              onChange: ({ value }) => validateField("image", value),
            }}
          >
            {(field) => (
              <div className="space-y-2">
                <Label htmlFor="image">Profile Image URL</Label>
                <Input
                  id="image"
                  type="url"
                  placeholder="https://example.com/photo.jpg"
                  value={field.state.value}
                  onChange={(e) => field.handleChange(e.target.value)}
                  onBlur={field.handleBlur}
                />
                {field.state.meta.isTouched &&
                  field.state.meta.errors.length > 0 && (
                    <p className="text-xs text-destructive">
                      {field.state.meta.errors[0]}
                    </p>
                  )}
              </div>
            )}
          </form.Field>
        </CardContent>
      </Card>

      {/* Feedback */}
      {apiError && (
        <p className="text-xs text-destructive bg-destructive/10 rounded-md px-3 py-2 flex items-center gap-1.5">
          <AlertCircle className="w-3.5 h-3.5 shrink-0" /> {apiError}
        </p>
      )}
      {successMsg && (
        <p className="text-xs text-emerald-600 bg-emerald-50 dark:bg-emerald-950/20 rounded-md px-3 py-2 flex items-center gap-1.5">
          <CheckCircle2 className="w-3.5 h-3.5 shrink-0" /> {successMsg}
        </p>
      )}

      <div className="flex justify-end">
        <form.Subscribe selector={(s) => s.isSubmitting}>
          {(isSubmitting) => (
            <Button
              onClick={() => form.handleSubmit()}
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" /> Saving…
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          )}
        </form.Subscribe>
      </div>
    </div>
  );
}
