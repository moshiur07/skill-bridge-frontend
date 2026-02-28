// ! claude tanstack + zod

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
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Star,
  DollarSign,
  Loader2,
  CheckCircle2,
  AlertCircle,
  ShieldCheck,
  X,
  Plus,
  BookOpen,
} from "lucide-react";

const API_BASE = "https://skill-bridge-backend-myyv.onrender.com";

// ─── Subjects ─────────────────────────────────────────────────────────────────

const SUBJECTS = [
  { id: 1, subject: "Mathematics" },
  { id: 2, subject: "Physics" },
  { id: 3, subject: "English Literature" },
  { id: 4, subject: "Organic Chemistry" },
  { id: 5, subject: "Biology" },
  { id: 6, subject: "Economics" },
  { id: 7, subject: "History" },
  { id: 8, subject: "Computer Science" },
  { id: 9, subject: "Psychology" },
  { id: 10, subject: "Statistics" },
  { id: 11, subject: "Web Development" },
  { id: 12, subject: "Graphic Design" },
  { id: 13, subject: "Digital Marketing" },
  { id: 14, subject: "Public Speaking" },
  { id: 15, subject: "Data Science" },
];

// ─── Zod Schema ───────────────────────────────────────────────────────────────

const profileSchema = z.object({
  bio: z
    .string()
    .min(20, "Bio must be at least 20 characters.")
    .max(1000, "Bio cannot exceed 1000 characters."),
  hourly_rate: z
    .number({ invalid_type_error: "Enter a valid number." })
    .min(1, "Rate must be at least $1.")
    .max(1000, "Rate cannot exceed $1000."),
  image: z.string().url("Must be a valid URL.").optional().or(z.literal("")),
  categories: z.array(z.number()).min(1, "Add at least one subject."),
});

type ProfileFormValues = z.infer<typeof profileSchema>;

// ─── Types ────────────────────────────────────────────────────────────────────

interface Category {
  id: number;
  name: string;
}

interface TutorProfile {
  id: string;
  bio: string;
  hourly_rate: number;
  rating_average: number;
  isFeatured: boolean;
  image?: string;
  user: { name: string; email: string };
  categories: Category[];
}

// ─── Helpers ──────────────────────────────────────────────────────────────────

function initials(name: string) {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase();
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function TutorProfileClient({
  profile,
}: {
  profile: TutorProfile;
}) {
  const [successMsg, setSuccessMsg] = useState("");
  const [apiError, setApiError] = useState("");

  // map existing categories to ids for initial form value
  const initialCategoryIds: number[] = (profile.categories ?? [])
    .map((c) => SUBJECTS.find((s) => s.subject === c.name)?.id)
    .filter((id): id is number => id !== undefined);

  // ── TanStack Form ──────────────────────────────────────────────────────────
  const form = useForm({
    defaultValues: {
      bio: profile.bio ?? "",
      hourly_rate: profile.hourly_rate ?? 0,
      image: profile.image ?? "",
      categories: initialCategoryIds,
    },
    onSubmit: async ({ value }) => {
      setApiError("");
      setSuccessMsg("");
      try {
        const res = await fetch(`${API_BASE}/api/tutors/${profile.id}`, {
          method: "PUT",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            bio: value.bio.trim(),
            hourly_rate: value.hourly_rate,
            image: value.image?.trim() || null,
            categories: value.categories, // number[]
          }),
        });

        if (!res.ok) {
          const json = await res.json().catch(() => ({}));
          throw new Error(json.message ?? `Update failed (${res.status})`);
        }

        setSuccessMsg("Profile updated successfully.");
        setTimeout(() => setSuccessMsg(""), 3000);
      } catch (err) {
        setApiError(
          err instanceof Error ? err.message : "Failed to update profile.",
        );
      }
    },
  });

  // ── Validate a single field with zod ──────────────────────────────────────
  function validateField<K extends keyof ProfileFormValues>(
    field: K,
    value: ProfileFormValues[K],
  ): string | undefined {
    const result = profileSchema.shape[field].safeParse(value);
    return result.success ? undefined : result.error.issues[0]?.message;
  }

  // ── Render ─────────────────────────────────────────────────────────────────
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      {/* Heading */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Profile</h1>
        <p className="text-sm text-muted-foreground mt-0.5">
          Update your public tutor profile. Students see this when browsing.
        </p>
      </div>

      {/* ── Identity (read-only) ─────────────────────────────────────────── */}
      <Card className="shadow-sm">
        <CardContent className="pt-5 pb-5">
          <div className="flex items-center gap-4 flex-wrap">
            <form.Subscribe selector={(s) => s.values.image}>
              {(image) => (
                <Avatar className="w-14 h-14 shrink-0">
                  <AvatarImage
                    src={image || undefined}
                    alt={profile.user?.name}
                  />
                  <AvatarFallback className="text-base font-semibold bg-primary/10 text-primary">
                    {initials(profile.user?.name ?? "T")}
                  </AvatarFallback>
                </Avatar>
              )}
            </form.Subscribe>

            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap items-center gap-2 mb-1">
                <p className="font-semibold text-lg">{profile.user?.name}</p>
                {profile.isFeatured ? (
                  <Badge className="gap-1 bg-amber-100 text-amber-700 border-amber-200 hover:bg-amber-100 dark:bg-amber-900/30 dark:text-amber-400">
                    <ShieldCheck className="w-3 h-3" /> Featured
                  </Badge>
                ) : (
                  <Badge
                    variant="outline"
                    className="gap-1 text-muted-foreground text-xs"
                  >
                    Not featured
                  </Badge>
                )}
              </div>
              <p className="text-sm text-muted-foreground">
                {profile.user?.email}
              </p>
              <div className="flex items-center gap-3 mt-1.5 text-sm text-muted-foreground">
                <span className="flex items-center gap-1">
                  <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
                  {profile.rating_average?.toFixed(1) ?? "0.0"} rating
                </span>
                <span className="flex items-center gap-1">
                  <DollarSign className="w-3.5 h-3.5" />${profile.hourly_rate}
                  /hr current rate
                </span>
              </div>
            </div>

            <p className="text-xs text-muted-foreground bg-muted px-3 py-1.5 rounded-md w-full sm:w-auto text-center">
              Featured status is managed by admins
            </p>
          </div>
        </CardContent>
      </Card>

      {/* ── Form ─────────────────────────────────────────────────────────── */}
      <form
        onSubmit={(e) => {
          e.preventDefault();
          // run full zod validation before submit
          const result = profileSchema.safeParse(form.state.values);
          if (!result.success) return; // field-level errors already shown
          form.handleSubmit();
        }}
      >
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 items-start">
          {/* ── Left: bio + rate + image ─────────────────────────────────── */}
          <Card className="lg:col-span-3 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base">Basic Info</CardTitle>
              <CardDescription>
                Your bio and session rate shown to students.
              </CardDescription>
            </CardHeader>

            <CardContent className="space-y-5">
              {/* Bio */}
              <form.Field
                name="bio"
                validators={{
                  onChange: ({ value }) => validateField("bio", value),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={5}
                      placeholder="Tell students about your background, teaching style, and experience…"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                      className="resize-none"
                    />
                    <div className="flex justify-between">
                      {field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched ? (
                        <p className="text-xs text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      ) : (
                        <span />
                      )}
                      <p className="text-xs text-muted-foreground text-right">
                        {field.state.value.length}/1000
                      </p>
                    </div>
                  </div>
                )}
              </form.Field>

              <Separator />

              {/* Hourly rate */}
              <form.Field
                name="hourly_rate"
                validators={{
                  onChange: ({ value }) => validateField("hourly_rate", value),
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="rate">Hourly Rate (USD)</Label>
                    <div className="relative">
                      <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="rate"
                        type="number"
                        min={1}
                        placeholder="45"
                        value={field.state.value || ""}
                        onChange={(e) =>
                          field.handleChange(Number(e.target.value))
                        }
                        onBlur={field.handleBlur}
                        className="pl-8"
                      />
                    </div>
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched && (
                        <p className="text-xs text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                  </div>
                )}
              </form.Field>

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
                      placeholder="https://example.com/your-photo.jpg"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                      onBlur={field.handleBlur}
                    />
                    {field.state.meta.errors.length > 0 &&
                      field.state.meta.isTouched && (
                        <p className="text-xs text-destructive">
                          {field.state.meta.errors[0]}
                        </p>
                      )}
                    {field.state.value && (
                      <div className="flex items-center gap-2 mt-1">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src={field.state.value} alt="Preview" />
                          <AvatarFallback className="text-xs">?</AvatarFallback>
                        </Avatar>
                        <p className="text-xs text-muted-foreground">Preview</p>
                      </div>
                    )}
                  </div>
                )}
              </form.Field>
            </CardContent>
          </Card>

          {/* ── Right: subjects ──────────────────────────────────────────── */}
          <Card className="lg:col-span-2 shadow-sm">
            <CardHeader className="pb-4">
              <CardTitle className="text-base flex items-center gap-2">
                <BookOpen className="w-4 h-4" /> Subjects
              </CardTitle>
              <CardDescription>
                Subjects you teach. Students filter by these.
              </CardDescription>
            </CardHeader>

            <CardContent>
              <form.Field
                name="categories"
                validators={{
                  onChange: ({ value }) => validateField("categories", value),
                }}
              >
                {(field) => {
                  const selected = field.state.value; // number[]

                  // subjects not yet selected
                  const available = SUBJECTS.filter(
                    (s) => !selected.includes(s.id),
                  );

                  function addSubject(idStr: string) {
                    const id = Number(idStr);
                    if (!selected.includes(id)) {
                      field.handleChange([...selected, id]);
                    }
                  }

                  function removeSubject(id: number) {
                    field.handleChange(selected.filter((s) => s !== id));
                  }

                  return (
                    <div className="space-y-4">
                      {/* Select dropdown */}
                      <div className="flex gap-2">
                        <Select
                          onValueChange={addSubject}
                          value=""
                          disabled={available.length === 0}
                        >
                          <SelectTrigger className="flex-1">
                            <SelectValue
                              placeholder={
                                available.length === 0
                                  ? "All subjects added"
                                  : "Add a subject…"
                              }
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {available.map((s) => (
                              <SelectItem key={s.id} value={String(s.id)}>
                                {s.subject}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <Button
                          type="button"
                          variant="outline"
                          size="icon"
                          className="shrink-0"
                          disabled={available.length === 0}
                        >
                          <Plus className="w-4 h-4" />
                        </Button>
                      </div>

                      {/* Selected tags */}
                      {selected.length === 0 ? (
                        <p className="text-xs text-muted-foreground text-center py-4 border border-dashed rounded-lg">
                          No subjects added yet.
                        </p>
                      ) : (
                        <div className="flex flex-wrap gap-2">
                          {selected.map((id) => {
                            const subject = SUBJECTS.find((s) => s.id === id);
                            if (!subject) return null;
                            return (
                              <span
                                key={id}
                                className="inline-flex items-center gap-1 text-xs rounded-full border px-3 py-1 bg-muted"
                              >
                                {subject.subject}
                                <button
                                  type="button"
                                  onClick={() => removeSubject(id)}
                                  className="ml-0.5 text-muted-foreground hover:text-destructive transition-colors"
                                >
                                  <X className="w-3 h-3" />
                                </button>
                              </span>
                            );
                          })}
                        </div>
                      )}

                      {/* Validation error */}
                      {field.state.meta.errors.length > 0 &&
                        field.state.meta.isTouched && (
                          <p className="text-xs text-destructive">
                            {field.state.meta.errors[0]}
                          </p>
                        )}
                    </div>
                  );
                }}
              </form.Field>
            </CardContent>
          </Card>
        </div>

        {/* ── Footer ───────────────────────────────────────────────────── */}
        <div className="space-y-3 mt-6">
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
                  type="submit"
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
      </form>
    </div>
  );
}
