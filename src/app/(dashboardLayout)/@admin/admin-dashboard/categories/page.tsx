// app/admin/categories/page.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  MoreVertical,
  Plus,
  Search,
  Edit,
  Trash2,
  AlertCircle,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
const API_BASE = process.env.NEXT_PUBLIC_API_URL;
// Validation schema
const categorySchema = z.object({
  name: z.string().min(1, "Category name is required"),
  description: z.string().optional(),
});

type CategoryFormData = z.infer<typeof categorySchema>;

export default function CategoriesPage() {
  const [categories, setCategories] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [page, setPage] = useState(1);
  const [totalCategories, setTotalCategories] = useState(0);

  // Dialog states
  const [showCreateDialog, setShowCreateDialog] = useState(false);
  const [editingCategory, setEditingCategory] = useState<Category | null>(null);
  const [deleteCategory, setDeleteCategory] = useState<Category | null>(null);
  const [isFormLoading, setIsFormLoading] = useState(false);

  // Form
  const form = useForm<CategoryFormData>({
    resolver: zodResolver(categorySchema),
    defaultValues: {
      name: "",
      description: "",
    },
  });

  useEffect(() => {
    fetchCategories();
  }, [page, searchTerm]);

  const fetchCategories = async () => {
    try {
      setIsLoading(true);
      setError(null);

      const res = await fetch(`${API_BASE}/api/admin/categories`, {
        credentials: "include",
      });
      const response = await res.json();
      setCategories(response.data || []);
      setTotalCategories(response.total || 0);
    } catch (err) {
      setError("Failed to load categories. Please try again.");
      console.error("Error fetching categories:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const onSubmit = async (data: CategoryFormData) => {
    console.log({ createData: data });
    try {
      setIsFormLoading(true);
      if (editingCategory) {
        await adminCategoriesAPI.update(editingCategory.id, data);
        setCategories(
          categories.map((cat) =>
            cat.id === editingCategory.id ? { ...cat, ...data } : cat,
          ),
        );
      } else {
        const res = await fetch(`${API_BASE}/api/admin/categories`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          credentials: "include",
          body: JSON.stringify(data),
        });
        const responseData = await res.json();
        console.log({ responseData });
        setCategories([...categories, responseData.data]);
      }

      setShowCreateDialog(false);
      setEditingCategory(null);
      form.reset();
    } catch (err) {
      setError("Failed to save category. Please try again.");
      console.error("Error saving category:", err);
    } finally {
      setIsFormLoading(false);
    }
  };

  const handleDeleteCategory = async (categoryId: number) => {
    try {
      setIsFormLoading(true);
      const res = await fetch(
        `${API_BASE}/api/admin/categories/${categoryId}`,
        {
          method: "DELETE",
          credentials: "include",
        },
      );
      setCategories(categories.filter((cat) => cat.id !== categoryId));
      setDeleteCategory(null);
    } catch (err) {
      setError("Failed to delete category. Please try again.");
      console.error("Error deleting category:", err);
    } finally {
      setIsFormLoading(false);
    }
  };

  const closeDialog = () => {
    setShowCreateDialog(false);
    setEditingCategory(null);
    form.reset();
  };

  if (isLoading && categories.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Categories Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage tutoring subject categories
          </p>
        </div>
        <div className="space-y-4">
          <Skeleton className="h-10 w-64" />
          <Skeleton className="h-96 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6  px-5 lg:px-10 py-3 lg:py-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">
            Categories Management
          </h1>
          <p className="text-gray-600 mt-1">
            Manage tutoring subject categories
          </p>
        </div>
        <Button
          onClick={() => {
            setEditingCategory(null);
            form.reset();
            setShowCreateDialog(true);
          }}
        >
          <Plus className="w-4 h-4 mr-2" />
          Add Category
        </Button>
      </div>

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {/* Table */}
      <div className="bg-slate-100 rounded-lg border border-gray-200 overflow-hidden px-5 py-3">
        <Table>
          <TableHeader>
            <TableRow className="bg-slate-200 border-b border-slate-200">
              <TableHead>ID</TableHead>
              <TableHead>Category Name</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-12">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              <>
                {[...Array(5)].map((_, i) => (
                  <TableRow key={i}>
                    <TableCell>
                      <Skeleton className="h-4 w-8" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-24" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-4 w-40" />
                    </TableCell>
                    <TableCell>
                      <Skeleton className="h-8 w-8" />
                    </TableCell>
                  </TableRow>
                ))}
              </>
            ) : categories.length === 0 ? (
              <TableRow>
                <TableCell colSpan={4} className="text-center py-8">
                  <p className="text-gray-500">No categories found</p>
                </TableCell>
              </TableRow>
            ) : (
              categories?.map((category) => (
                <TableRow
                  key={category?.id}
                  className="border-b hover:bg-gray-50"
                >
                  <TableCell className="text-sm text-gray-600">
                    #{category?.id}
                  </TableCell>
                  <TableCell className="font-medium text-gray-900">
                    {category?.name}
                  </TableCell>
                  <TableCell className="text-sm text-gray-600">
                    {category?.description || "-"}
                  </TableCell>
                  <TableCell>
                    <Button
                      onClick={() => setDeleteCategory(category)}
                      className="text-red-600 bg-slate-50 cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4 mr-2" />
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      {/* Create/Edit Dialog */}
      <Dialog open={showCreateDialog} onOpenChange={setShowCreateDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>
              {editingCategory ? "Edit Category" : "Add New Category"}
            </DialogTitle>
            <DialogDescription>
              {editingCategory
                ? "Update the category details below"
                : "Create a new tutoring subject category"}
            </DialogDescription>
          </DialogHeader>

          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category Name</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="e.g., Mathematics, Physics, Chemistry..."
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Describe this category..."
                        {...field}
                        rows={4}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <DialogFooter>
                <Button
                  type="button"
                  variant="outline"
                  onClick={closeDialog}
                  disabled={isFormLoading}
                >
                  Cancel
                </Button>
                <Button type="submit" disabled={isFormLoading}>
                  {isFormLoading
                    ? "Saving..."
                    : editingCategory
                      ? "Update Category"
                      : "Create Category"}
                </Button>
              </DialogFooter>
            </form>
          </Form>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      {deleteCategory && (
        <AlertDialog
          open={!!deleteCategory}
          onOpenChange={() => setDeleteCategory(null)}
        >
          <AlertDialogContent>
            <AlertDialogTitle>Delete Category</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to delete "{deleteCategory.name}"? This
              action cannot be undone.
            </AlertDialogDescription>
            <div className="flex gap-3 justify-end">
              <AlertDialogCancel onClick={() => setDeleteCategory(null)}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => handleDeleteCategory(deleteCategory.id)}
                disabled={isFormLoading}
                className="bg-red-600 hover:bg-red-700"
              >
                {isFormLoading ? "Deleting..." : "Delete"}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
