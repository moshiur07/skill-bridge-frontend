"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "@tanstack/react-form";
import { z } from "zod";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";

type Category = {
  id: number;
  name: string;
  description: string;
};

const bioSchema = z
  .string()
  .trim()
  .min(30, "Bio must be at least 30 characters.")
  .max(1200, "Bio is too long.");

const hourlyRateSchema = z
  .string()
  .min(1, "Hourly rate is required.")
  .refine((v) => !Number.isNaN(Number(v)), "Hourly rate must be a number.")
  .refine((v) => Number(v) > 0, "Hourly rate must be greater than 0.")
  .refine(
    (v) => Number.isInteger(Number(v)),
    "Hourly rate must be a whole number.",
  );

const categoriesSchema = z
  .array(z.number().int().positive())
  .min(1, "Select at least one category.");

const imageSchema = z
  .instanceof(File, { message: "Profile image is required." })
  .refine((file) => file.size > 0, "Please choose a valid image file.")
  .refine(
    (file) =>
      ["image/jpeg", "image/jpg", "image/png", "image/webp"].includes(
        file.type,
      ),
    "Only JPG, PNG, or WEBP images are allowed.",
  )
  .refine((file) => file.size <= 5 * 1024 * 1024, "Max image size is 5MB.");

export default function BecomeATutorRegisterPage() {
  const router = useRouter();
  const [apiError, setApiError] = useState("");
  const [apiSuccess, setApiSuccess] = useState("");
  const [categories, setCategories] = useState<Category[]>([]);
  const [categoriesLoading, setCategoriesLoading] = useState(true);
  const [categoriesError, setCategoriesError] = useState("");

  const baseUrl = useMemo(
    () =>
      process.env.NEXT_PUBLIC_BACKEND_URL ||
      process.env.NEXT_PUBLIC_API_URL ||
      "",
    [],
  );

  useEffect(() => {
    let active = true;

    const loadCategories = async () => {
      if (!baseUrl) {
        setCategoriesError("Backend URL is not configured.");
        setCategoriesLoading(false);
        return;
      }

      try {
        setCategoriesLoading(true);
        setCategoriesError("");

        const res = await fetch(`${baseUrl}/api/category`, {
          method: "GET",
          credentials: "include",
        });

        const json = await res.json().catch(() => ({}));
        if (!res.ok || !json?.success || !Array.isArray(json?.data)) {
          throw new Error(json?.message || "Failed to load categories.");
        }

        const parsed = z
          .array(
            z.object({
              id: z.number().int(),
              name: z.string(),
              description: z.string().optional().default(""),
            }),
          )
          .safeParse(json.data);

        if (!parsed.success) {
          throw new Error("Invalid category response format.");
        }

        if (active) setCategories(parsed.data);
      } catch (error) {
        if (active) {
          setCategoriesError(
            error instanceof Error
              ? error.message
              : "Failed to load categories.",
          );
        }
      } finally {
        if (active) setCategoriesLoading(false);
      }
    };

    loadCategories();
    return () => {
      active = false;
    };
  }, [baseUrl]);

  const form = useForm({
    defaultValues: {
      bio: "",
      hourly_rate: "",
      categories: [] as number[],
      image: null as File | null,
    },
    onSubmit: async ({ value }) => {
      setApiError("");
      setApiSuccess("");

      const parsed = z
        .object({
          bio: bioSchema,
          hourly_rate: hourlyRateSchema,
          categories: categoriesSchema,
          image: imageSchema,
        })
        .safeParse(value);

      if (!parsed.success) {
        setApiError(parsed.error.issues[0]?.message || "Validation failed.");
        return;
      }

      if (!baseUrl) {
        setApiError("Backend URL is not configured.");
        return;
      }

      const payload = {
        bio: parsed.data.bio,
        hourly_rate: Number(parsed.data.hourly_rate),
        categories: parsed.data.categories,
      };

      const formData = new FormData();
      formData.append("data", JSON.stringify(payload));
      formData.append("image", parsed.data.image);

      try {
        toast.loading("Submitting your tutor profile...", {
          id: "tutor-submit",
          position: "top-center",
        });
        const token =
          typeof window !== "undefined"
            ? localStorage.getItem("accessToken") ||
              localStorage.getItem("token") ||
              localStorage.getItem("authToken")
            : null;

        const headers: HeadersInit = {};
        if (token) headers.Authorization = `Bearer ${token}`;

        const res = await fetch(`${baseUrl}/api/tutors`, {
          method: "POST",
          body: formData,
          headers,
          credentials: "include",
        });

        const result = await res.json().catch(() => ({}));
        if (!res.ok) {
          toast.error(result?.message || "Failed to submit tutor profile.", {
            id: "tutor-submit",
            position: "top-center",
          });
        }
        toast.success(
          "Tutor profile submitted successfully! Please add availability in your dashboard!",
          {
            id: "tutor-submit",
            duration: 5000,
            position: "top-center",
          },
        );
        form.reset();
        router.push("/tutor-dashboard");
      } catch (error) {
        toast.error(
          error instanceof Error ? error.message : "Failed to submit profile.",
          { id: "tutor-submit", position: "top-center" },
        );
      }
    },
  });

  return (
    <div className="relative overflow-hidden">
      <div className="pointer-events-none absolute -left-24 top-8 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
      <div className="pointer-events-none absolute -right-20 top-28 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

      <div className="mx-auto w-full max-w-4xl px-4 py-10 sm:px-6 lg:px-8">
        <Card className="rounded-3xl border-border/60 bg-card/80 shadow-sm backdrop-blur">
          <CardHeader>
            <Badge className="mb-2 w-fit border-primary/20 bg-primary/10 text-primary">
              Tutor Onboarding
            </Badge>
            <CardTitle className="text-2xl sm:text-3xl">
              Become a Tutor
            </CardTitle>
          </CardHeader>

          <CardContent className="space-y-6">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="rounded-xl border border-primary/20  p-4">
                <p className="text-xs uppercase  tracking-wide text-muted-foreground">
                  isFeatured
                </p>
                <p className="mt-2 select-none text-lg font-semibold ">
                  Not yet
                </p>
              </div>
              <div className="rounded-xl border border-primary/20  p-4">
                <p className="text-xs uppercase tracking-wide text-muted-foreground">
                  rating_average
                </p>
                <p className="mt-2 select-none  text-lg font-semibold ">0.0</p>
              </div>
            </div>

            <form
              onSubmit={(e) => {
                e.preventDefault();
                e.stopPropagation();
                form.handleSubmit();
              }}
              className="space-y-5"
            >
              <form.Field
                name="bio"
                validators={{
                  onChange: ({ value }) => {
                    const r = bioSchema.safeParse(value);
                    return r.success ? undefined : r.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="bio">Bio</Label>
                    <Textarea
                      id="bio"
                      rows={6}
                      placeholder="Write your experience, methodology, and strengths..."
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors[0] ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="hourly_rate"
                validators={{
                  onChange: ({ value }) => {
                    const r = hourlyRateSchema.safeParse(value);
                    return r.success ? undefined : r.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="hourly_rate">Hourly Rate</Label>
                    <Input
                      id="hourly_rate"
                      type="number"
                      min={1}
                      step="1"
                      placeholder="e.g. 500"
                      value={field.state.value}
                      onChange={(e) => field.handleChange(e.target.value)}
                    />
                    {field.state.meta.errors[0] ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="categories"
                validators={{
                  onChange: ({ value }) => {
                    const r = categoriesSchema.safeParse(value);
                    return r.success ? undefined : r.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-3">
                    <Label>Categories</Label>

                    {categoriesLoading ? (
                      <p className="text-sm text-muted-foreground">
                        Loading categories...
                      </p>
                    ) : categoriesError ? (
                      <p className="text-sm text-destructive">
                        {categoriesError}
                      </p>
                    ) : (
                      <div className="grid grid-cols-1 gap-2 sm:grid-cols-2">
                        {categories.map((cat) => {
                          const checked = field.state.value.includes(cat.id);
                          return (
                            <button
                              key={cat.id}
                              type="button"
                              onClick={() => {
                                const next = checked
                                  ? field.state.value.filter(
                                      (id) => id !== cat.id,
                                    )
                                  : [...field.state.value, cat.id];
                                field.handleChange(next);
                              }}
                              className={`rounded-xl border p-3 text-left transition ${
                                checked
                                  ? "border-primary bg-primary/10"
                                  : "border-border hover:border-primary/40"
                              }`}
                            >
                              <p className="font-medium">{cat.name}</p>
                              <p className="line-clamp-2 text-xs text-muted-foreground">
                                {cat.description}
                              </p>
                            </button>
                          );
                        })}
                      </div>
                    )}

                    {field.state.meta.errors[0] ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              <form.Field
                name="image"
                validators={{
                  onChange: ({ value }) => {
                    if (!value) return "Profile image is required.";
                    const r = imageSchema.safeParse(value);
                    return r.success ? undefined : r.error.issues[0]?.message;
                  },
                }}
              >
                {(field) => (
                  <div className="space-y-2">
                    <Label htmlFor="image">Profile Image</Label>
                    <Input
                      id="image"
                      type="file"
                      accept="image/jpeg,image/jpg,image/png,image/webp"
                      onChange={(e) =>
                        field.handleChange(e.target.files?.[0] ?? null)
                      }
                    />
                    {field.state.meta.errors[0] ? (
                      <p className="text-sm text-destructive">
                        {field.state.meta.errors[0]}
                      </p>
                    ) : null}
                  </div>
                )}
              </form.Field>

              {apiError ? (
                <p className="text-sm text-destructive">{apiError}</p>
              ) : null}
              {apiSuccess ? (
                <p className="text-sm text-emerald-600">{apiSuccess}</p>
              ) : null}

              <form.Subscribe selector={(s) => [s.isSubmitting]}>
                {([isSubmitting]) => (
                  <Button
                    type="submit"
                    disabled={
                      isSubmitting || categoriesLoading || !!categoriesError
                    }
                    className="w-full sm:w-auto"
                  >
                    {isSubmitting ? "Submitting..." : "Submit Tutor Profile"}
                  </Button>
                )}
              </form.Subscribe>
            </form>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
