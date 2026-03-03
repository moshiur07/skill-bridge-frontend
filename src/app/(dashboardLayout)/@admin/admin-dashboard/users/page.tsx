// app/admin/users/page.tsx
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  MoreVertical,
  Search,
  Lock,
  Trash2,
  AlertCircle,
  Star,
  Loader2,
} from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import { formatDistanceToNow } from "date-fns";
import { adminService } from "@/components/services/admin.service";

export default function UsersPage() {
  const [users, setUsers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [roleFilter, setRoleFilter] = useState<string>("all");
  const [page, setPage] = useState(1);
  const [totalUsers, setTotalUsers] = useState(0);

  // Dialog states
  const [selectedUser, setSelectedUser] = useState(null);
  const [actionType, setActionType] = useState<
    "ban" | "delete" | "feature" | null
  >(null);
  const [isActionLoading, setIsActionLoading] = useState(false);
  const [showDialog, setShowDialog] = useState(false);

  const API_BASE = process.env.NEXT_PUBLIC_API_URL;

  useEffect(() => {
    fetchUsers();
  }, [roleFilter]);

  // Auto-hide success message
  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => setSuccessMessage(null), 3000);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const fetchUsers = async () => {
    try {
      setIsLoading(true);
      setError(null);
      // const response = await adminService.getAllUsers(roleFilter);
      const res = await fetch(
        `${API_BASE}/api/admin/users?role=${roleFilter}`,
        {
          credentials: "include",
        },
      );
      const data = await res.json();
      console.log("data of admin stats", data);

      setUsers(data?.data?.users || []);
      setTotalUsers(data?.data?.count || 0);
    } catch (err) {
      setError("Failed to load users. Please try again.");
      console.error("Error fetching users:", err);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBanUser = async (userId: string, currentBanStatus: boolean) => {
    try {
      setIsActionLoading(true);
      console.log({ userId });
      const res = await fetch(`${API_BASE}/api/users/${userId}/status`, {
        method: "PUT",
        credentials: "include",
      });
      // Update local state
      setUsers(
        users?.map((user) =>
          user.id === userId ? { ...user, isBanned: !currentBanStatus } : user,
        ),
      );

      setSuccessMessage(
        `User ${!currentBanStatus ? "banned" : "unbanned"} successfully`,
      );
      setSelectedUser(null);
      setActionType(null);
      setShowDialog(false);
    } catch (err) {
      setError("Failed to update user status. Please try again.");
      console.error("Error updating user:", err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleDeleteUser = async (userId: string) => {
    try {
      setIsActionLoading(true);
      const res = await fetch(`${API_BASE}/api/users/${userId}`, {
        method: "DELETE",
        credentials: "include",
      });
      // Update local state
      setUsers(users.filter((user) => user?.id !== userId));

      setSuccessMessage("User deleted successfully");
      setSelectedUser(null);
      setActionType(null);
      setShowDialog(false);
    } catch (err) {
      setError("Failed to delete user. Please try again.");
      console.error("Error deleting user:", err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const handleMakeTutorFeatured = async (
    tutorId: string,
    currentFeatured: boolean,
  ) => {
    try {
      setIsActionLoading(true);
      console.log({ tutorId });
      const res = await fetch(`${API_BASE}/api/tutors/${tutorId}/featured`, {
        method: "PUT",
        credentials: "include",
      });

      setSuccessMessage(
        `Tutor ${!currentFeatured ? "featured" : "unfeatured"} successfully`,
      );
      setSelectedUser(null);
      setActionType(null);
      setShowDialog(false);

      // Refetch to update the display
      fetchUsers();
    } catch (err) {
      setError("Failed to update tutor featured status. Please try again.");
      console.error("Error updating tutor:", err);
    } finally {
      setIsActionLoading(false);
    }
  };

  const getRoleBadgeColor = (role: string) => {
    switch (role) {
      case "admin":
        return "bg-red-100 text-red-800";
      case "tutor":
        return "bg-blue-100 text-blue-800";
      case "student":
        return "bg-green-100 text-green-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const openActionDialog = (user: any, type: "ban" | "delete" | "feature") => {
    setSelectedUser(user);
    setActionType(type);
    setShowDialog(true);
  };

  if (isLoading && users.length === 0) {
    return (
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
          <p className="text-gray-600 mt-1">
            Manage and monitor all platform users
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
    <div className="space-y-6 px-10 py-8">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
        <p className="text-gray-600 mt-1">
          Manage and monitor all platform users
        </p>
      </div>

      {/* Success Alert */}
      {successMessage && (
        <Alert className="bg-green-50 border-green-200">
          <AlertCircle className="h-4 w-4 text-green-600" />
          <AlertDescription className="text-green-800">
            {successMessage}
          </AlertDescription>
        </Alert>
      )}

      {/* Error Alert */}
      {error && (
        <Alert variant="destructive">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}
      <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
        {/* Role Filter */}
        <Select
          value={roleFilter}
          onValueChange={(value) => {
            setRoleFilter(value);
          }}
        >
          <SelectTrigger className="w-full sm:w-48">
            <SelectValue placeholder="Filter by role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Roles</SelectItem>
            <SelectItem value="student">Students</SelectItem>
            <SelectItem value="tutor">Tutors</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {/* User Count */}
      <div className="flex items-center gap-4 text-sm text-gray-600">
        <span>Showing {users.length} users</span>
      </div>

      {/* Table */}
      <div className="bg-slate-100 rounded-lg py-5 border border-gray-200 overflow-hidden px-5">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow className="bg-slate-400 hover:bg-slate-400 rounded-lg border-b border-gray-200">
                <TableHead className="w-12">Avatar</TableHead>
                <TableHead>Name</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Joined</TableHead>
                <TableHead className="w-12">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {isLoading ? (
                <>
                  {[...Array(5)].map((_, i) => (
                    <TableRow key={i}>
                      <TableCell>
                        <Skeleton className="h-8 w-8 rounded-full" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-24" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-32" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-6 w-16" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-4 w-20" />
                      </TableCell>
                      <TableCell>
                        <Skeleton className="h-8 w-8" />
                      </TableCell>
                    </TableRow>
                  ))}
                </>
              ) : users?.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={7} className="text-center py-8">
                    <p className="text-gray-500">No users found</p>
                  </TableCell>
                </TableRow>
              ) : (
                users?.map((user) => (
                  <TableRow
                    key={user?.id}
                    className="border-b hover:bg-gray-200"
                  >
                    <TableCell>
                      {user?.image ? (
                        <Image
                          src={user?.image}
                          alt={user?.name}
                          width={32}
                          height={32}
                          className="w-8 h-8 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
                          {user?.name.charAt(0).toUpperCase()}
                        </div>
                      )}
                    </TableCell>
                    <TableCell className="font-medium text-gray-900">
                      {user?.name}
                    </TableCell>
                    <TableCell className="text-gray-600 text-sm">
                      {user.email}
                    </TableCell>
                    <TableCell>
                      <Badge className={getRoleBadgeColor(user.role)}>
                        {user.role.charAt(0).toUpperCase() +
                          user?.role.slice(1)}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      {user.isBanned ? (
                        <Badge variant="destructive">Banned</Badge>
                      ) : (
                        <Badge
                          variant="outline"
                          className="bg-green-50 text-green-700 border-green-200"
                        >
                          Active
                        </Badge>
                      )}
                    </TableCell>
                    <TableCell className="text-sm text-gray-600">
                      {formatDistanceToNow(new Date(user?.createdAt), {
                        addSuffix: true,
                      })}
                    </TableCell>
                    <TableCell>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="w-4 h-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-48">
                          {/* Ban/Unban - only for students and tutors */}
                          {user.role !== "admin" && (
                            <DropdownMenuItem
                              onClick={() => openActionDialog(user, "ban")}
                              className="cursor-pointer"
                            >
                              <Lock className="w-4 h-4 mr-2" />
                              {user.isBanned ? "Unban User" : "Ban User"}
                            </DropdownMenuItem>
                          )}

                          {/* Feature Tutor - only for tutors */}
                          {user.role === "tutor" && (
                            <DropdownMenuItem
                              onClick={() => openActionDialog(user, "feature")}
                              className="cursor-pointer"
                            >
                              <Star className="w-4 h-4 mr-2" />
                              {user?.tutor_profile == null
                                ? "Make Featured"
                                : "Unfeatured Tutor"}
                            </DropdownMenuItem>
                          )}

                          {/* Delete - for all except admin */}
                          {user.role !== "admin" && (
                            <>
                              <DropdownMenuItem
                                onClick={() => openActionDialog(user, "delete")}
                                className="text-red-600 cursor-pointer"
                              >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete User
                              </DropdownMenuItem>
                            </>
                          )}

                          {/* Admin warning */}
                          {user.role === "admin" && (
                            <DropdownMenuItem
                              disabled
                              className="text-gray-500"
                            >
                              <AlertCircle className="w-4 h-4 mr-2" />
                              Cannot modify admin
                            </DropdownMenuItem>
                          )}
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </div>

      {/* Action Dialog */}
      {selectedUser && actionType && (
        <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
          <AlertDialogContent>
            <AlertDialogTitle>
              {actionType === "ban"
                ? `${selectedUser.isBanned ? "Unban" : "Ban"} User`
                : actionType === "feature"
                  ? "Make Tutor Featured"
                  : "Delete User"}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {actionType === "ban" && (
                <>
                  Are you sure you want to{" "}
                  <span className="font-semibold">
                    {selectedUser.isBanned ? "unban" : "ban"}
                  </span>{" "}
                  <span className="font-semibold">{selectedUser.name}</span>?
                  {!selectedUser.isBanned && (
                    <span className="mt-2 text-sm text-amber-700 bg-amber-50 p-2 rounded">
                      They will not be able to access their account.
                    </span>
                  )}
                </>
              )}
              {actionType === "feature" && (
                <>
                  Make{" "}
                  <span className="font-semibold">{selectedUser.name}</span> a
                  featured tutor? This will increase their visibility to
                  students.
                </>
              )}
              {actionType === "delete" && (
                <>
                  Are you sure you want to permanently delete{" "}
                  <span className="font-semibold">{selectedUser.name}</span>?
                  <span className="mt-2 text-sm text-red-700 bg-red-50 p-2 rounded font-semibold">
                    This action cannot be undone. All associated data will be
                    deleted.
                  </span>
                </>
              )}
            </AlertDialogDescription>
            <div className="flex gap-3 justify-end">
              <AlertDialogCancel disabled={isActionLoading}>
                Cancel
              </AlertDialogCancel>
              <AlertDialogAction
                onClick={() => {
                  if (actionType === "ban") {
                    handleBanUser(selectedUser.id, selectedUser.isBanned);
                  } else if (actionType === "feature") {
                    handleMakeTutorFeatured(selectedUser.id, false);
                  } else {
                    handleDeleteUser(selectedUser.id);
                  }
                }}
                disabled={isActionLoading}
                className={
                  actionType === "delete"
                    ? "bg-red-600 hover:bg-red-700"
                    : actionType === "ban"
                      ? "bg-amber-600 hover:bg-amber-700"
                      : ""
                }
              >
                {isActionLoading ? (
                  <>
                    <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                    Processing...
                  </>
                ) : (
                  "Confirm"
                )}
              </AlertDialogAction>
            </div>
          </AlertDialogContent>
        </AlertDialog>
      )}
    </div>
  );
}
