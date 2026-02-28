// // app/admin/users/page.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// // import { adminUsersAPI, User } from "@/lib/api/admin";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogTitle,
// } from "@/components/ui/alert-dialog";
// import {
//   MoreVertical,
//   Search,
//   Shield,
//   Lock,
//   Trash2,
//   AlertCircle,
// } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";
// import { formatDistanceToNow } from "date-fns";
// import { adminUsersAPI, User } from "@/lib/api/admin";

// export default function UsersPage() {
//   const [users, setUsers] = useState<User[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalUsers, setTotalUsers] = useState(0);

//   // Dialog states
//   const [selectedUser, setSelectedUser] = useState<User | null>(null);
//   const [actionType, setActionType] = useState<"ban" | "delete" | null>(null);
//   const [isActionLoading, setIsActionLoading] = useState(false);

//   useEffect(() => {
//     fetchUsers();
//   }, [page, searchTerm]);

//   const fetchUsers = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await adminUsersAPI.getAll({
//         page,
//         limit: 10,
//         search: searchTerm,
//       });
//       setUsers(response.data || []);
//       setTotalUsers(response.total || 0);
//     } catch (err) {
//       setError("Failed to load users. Please try again.");
//       console.error("Error fetching users:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleBanUser = async (userId: string, currentBanStatus: boolean) => {
//     try {
//       setIsActionLoading(true);
//       await adminUsersAPI.updateStatus(userId, !currentBanStatus);
//       // Update local state
//       setUsers(
//         users.map((user) =>
//           user.id === userId ? { ...user, isBanned: !currentBanStatus } : user,
//         ),
//       );
//       setSelectedUser(null);
//       setActionType(null);
//     } catch (err) {
//       setError("Failed to update user status. Please try again.");
//       console.error("Error updating user:", err);
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleDeleteUser = async (userId: string) => {
//     try {
//       setIsActionLoading(true);
//       await adminUsersAPI.deleteUser(userId);
//       // Update local state
//       setUsers(users.filter((user) => user.id !== userId));
//       setSelectedUser(null);
//       setActionType(null);
//     } catch (err) {
//       setError("Failed to delete user. Please try again.");
//       console.error("Error deleting user:", err);
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getRoleBadgeColor = (role: string) => {
//     switch (role) {
//       case "admin":
//         return "bg-red-100 text-red-800";
//       case "tutor":
//         return "bg-blue-100 text-blue-800";
//       case "student":
//         return "bg-green-100 text-green-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (isLoading && users.length === 0) {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
//           <p className="text-gray-600 mt-1">
//             Manage and monitor all platform users
//           </p>
//         </div>
//         <div className="space-y-4">
//           <Skeleton className="h-10 w-64" />
//           <Skeleton className="h-96 w-full" />
//         </div>
//       </div>
//     );
//   }

//   return (
//     <div className="space-y-6">
//       {/* Header */}
//       <div>
//         <h1 className="text-3xl font-bold text-gray-900">Users Management</h1>
//         <p className="text-gray-600 mt-1">
//           Manage and monitor all platform users
//         </p>
//       </div>

//       {/* Error Alert */}
//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {/* Search */}
//       <div className="flex items-center gap-2">
//         <Search className="w-5 h-5 text-gray-400" />
//         <Input
//           placeholder="Search by name or email..."
//           value={searchTerm}
//           onChange={(e) => {
//             setSearchTerm(e.target.value);
//             setPage(1);
//           }}
//           className="max-w-md"
//         />
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-50 border-b border-gray-200">
//               <TableHead className="w-12">Avatar</TableHead>
//               <TableHead>Name</TableHead>
//               <TableHead>Email</TableHead>
//               <TableHead>Role</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Joined</TableHead>
//               <TableHead className="w-12">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <>
//                 {[...Array(5)].map((_, i) => (
//                   <TableRow key={i}>
//                     <TableCell>
//                       <Skeleton className="h-8 w-8 rounded-full" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-24" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-32" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-16" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-6 w-16" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-20" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-8 w-8" />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </>
//             ) : users.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={7} className="text-center py-8">
//                   <p className="text-gray-500">No users found</p>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               users.map((user) => (
//                 <TableRow key={user.id} className="border-b hover:bg-gray-50">
//                   <TableCell>
//                     {user.image ? (
//                       <Image
//                         src={user.image}
//                         alt={user.name}
//                         width={32}
//                         height={32}
//                         className="w-8 h-8 rounded-full"
//                       />
//                     ) : (
//                       <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
//                         {user.name.charAt(0)}
//                       </div>
//                     )}
//                   </TableCell>
//                   <TableCell className="font-medium text-gray-900">
//                     {user.name}
//                   </TableCell>
//                   <TableCell className="text-gray-600">{user.email}</TableCell>
//                   <TableCell>
//                     <Badge className={getRoleBadgeColor(user.role)}>
//                       {user.role}
//                     </Badge>
//                   </TableCell>
//                   <TableCell>
//                     {user.isBanned ? (
//                       <Badge variant="destructive">Banned</Badge>
//                     ) : (
//                       <Badge variant="outline">Active</Badge>
//                     )}
//                   </TableCell>
//                   <TableCell className="text-sm text-gray-600">
//                     {formatDistanceToNow(new Date(user.created_at), {
//                       addSuffix: true,
//                     })}
//                   </TableCell>
//                   <TableCell>
//                     <DropdownMenu>
//                       <DropdownMenuTrigger asChild>
//                         <Button variant="ghost" size="sm">
//                           <MoreVertical className="w-4 h-4" />
//                         </Button>
//                       </DropdownMenuTrigger>
//                       <DropdownMenuContent align="end">
//                         <DropdownMenuItem
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setActionType("ban");
//                           }}
//                           className="cursor-pointer"
//                         >
//                           <Lock className="w-4 h-4 mr-2" />
//                           {user.isBanned ? "Unban" : "Ban"} User
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => {
//                             setSelectedUser(user);
//                             setActionType("delete");
//                           }}
//                           className="text-red-600 cursor-pointer"
//                         >
//                           <Trash2 className="w-4 h-4 mr-2" />
//                           Delete User
//                         </DropdownMenuItem>
//                       </DropdownMenuContent>
//                     </DropdownMenu>
//                   </TableCell>
//                 </TableRow>
//               ))
//             )}
//           </TableBody>
//         </Table>
//       </div>

//       {/* Pagination Info */}
//       <div className="flex items-center justify-between text-sm text-gray-600">
//         <p>
//           Showing {Math.min(page * 10, totalUsers)} of {totalUsers} users
//         </p>
//         <div className="flex gap-2">
//           <Button
//             variant="outline"
//             onClick={() => setPage(Math.max(1, page - 1))}
//             disabled={page === 1}
//           >
//             Previous
//           </Button>
//           <Button
//             variant="outline"
//             onClick={() => setPage(page + 1)}
//             disabled={page * 10 >= totalUsers}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* Action Dialog */}
//       {selectedUser && actionType && (
//         <AlertDialog open={true} onOpenChange={() => setActionType(null)}>
//           <AlertDialogContent>
//             <AlertDialogTitle>
//               {actionType === "ban"
//                 ? `${selectedUser.isBanned ? "Unban" : "Ban"} User`
//                 : "Delete User"}
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               {actionType === "ban"
//                 ? `Are you sure you want to ${selectedUser.isBanned ? "unban" : "ban"} ${selectedUser.name}? ${!selectedUser.isBanned ? "They will not be able to access their account." : ""}`
//                 : `Are you sure you want to permanently delete ${selectedUser.name}? This action cannot be undone.`}
//             </AlertDialogDescription>
//             <div className="flex gap-3 justify-end">
//               <AlertDialogCancel onClick={() => setActionType(null)}>
//                 Cancel
//               </AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => {
//                   if (actionType === "ban") {
//                     handleBanUser(selectedUser.id, selectedUser.isBanned);
//                   } else {
//                     handleDeleteUser(selectedUser.id);
//                   }
//                 }}
//                 disabled={isActionLoading}
//                 className={
//                   actionType === "delete" ? "bg-red-600 hover:bg-red-700" : ""
//                 }
//               >
//                 {isActionLoading ? "Processing..." : "Confirm"}
//               </AlertDialogAction>
//             </div>
//           </AlertDialogContent>
//         </AlertDialog>
//       )}
//     </div>
//   );
// }
