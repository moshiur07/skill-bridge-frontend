// // app/admin/tutors/page.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// import { adminTutorsAPI, TutorData } from "@/lib/api/admin";
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
//   Star,
//   AlertCircle,
//   Trash2,
//   Zap,
// } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";
// import { formatDistanceToNow } from "date-fns";

// export default function TutorsPage() {
//   const [tutors, setTutors] = useState<TutorData[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [page, setPage] = useState(1);
//   const [totalTutors, setTotalTutors] = useState(0);

//   // Dialog states
//   const [selectedTutor, setSelectedTutor] = useState<TutorData | null>(null);
//   const [actionType, setActionType] = useState<"featured" | "delete" | null>(
//     null,
//   );
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);

//   useEffect(() => {
//     fetchTutors();
//   }, [page, searchTerm]);

//   const fetchTutors = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await adminTutorsAPI.getAll({
//         page,
//         limit: 10,
//         search: searchTerm,
//       });
//       setTutors(response.data || []);
//       setTotalTutors(response.total || 0);
//     } catch (err) {
//       setError("Failed to load tutors. Please try again.");
//       console.error("Error fetching tutors:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleToggleFeatured = async (
//     tutorId: string,
//     currentFeatured: boolean,
//   ) => {
//     try {
//       setIsActionLoading(true);
//       await adminTutorsAPI.toggleFeatured(tutorId, !currentFeatured);
//       // Update local state
//       setTutors(
//         tutors.map((tutor) =>
//           tutor.id === tutorId
//             ? { ...tutor, isFeatured: !currentFeatured }
//             : tutor,
//         ),
//       );
//       setSelectedTutor(null);
//       setActionType(null);
//       setShowDialog(false);
//     } catch (err) {
//       setError("Failed to update featured status. Please try again.");
//       console.error("Error updating featured status:", err);
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const handleDeleteTutor = async (tutorId: string) => {
//     try {
//       setIsActionLoading(true);
//       await adminTutorsAPI.getById(tutorId); // Verify tutor exists, then delete
//       // Note: Delete endpoint would need to be called here
//       setTutors(tutors.filter((tutor) => tutor.id !== tutorId));
//       setSelectedTutor(null);
//       setActionType(null);
//       setShowDialog(false);
//     } catch (err) {
//       setError("Failed to delete tutor. Please try again.");
//       console.error("Error deleting tutor:", err);
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   if (isLoading && tutors.length === 0) {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Tutors Management
//           </h1>
//           <p className="text-gray-600 mt-1">
//             Manage all tutors on the platform
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
//         <h1 className="text-3xl font-bold text-gray-900">Tutors Management</h1>
//         <p className="text-gray-600 mt-1">Manage all tutors on the platform</p>
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
//               <TableHead>Subjects</TableHead>
//               <TableHead>Rate</TableHead>
//               <TableHead>Rating</TableHead>
//               <TableHead>Featured</TableHead>
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
//                       <Skeleton className="h-4 w-20" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-16" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-16" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-6 w-12" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-8 w-8" />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </>
//             ) : tutors.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center py-8">
//                   <p className="text-gray-500">No tutors found</p>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               tutors.map((tutor) => (
//                 <TableRow key={tutor.id} className="border-b hover:bg-gray-50">
//                   <TableCell>
//                     {tutor.image ? (
//                       <Image
//                         src={tutor.image}
//                         alt={tutor.user.name}
//                         width={32}
//                         height={32}
//                         className="w-8 h-8 rounded-full"
//                       />
//                     ) : (
//                       <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
//                         {tutor.user.name.charAt(0)}
//                       </div>
//                     )}
//                   </TableCell>
//                   <TableCell className="font-medium text-gray-900">
//                     {tutor.user.name}
//                   </TableCell>
//                   <TableCell className="text-gray-600">
//                     {tutor.user.email}
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex flex-wrap gap-1">
//                       {tutor.categories.slice(0, 2).map((cat: any) => (
//                         <Badge
//                           key={cat.id}
//                           variant="secondary"
//                           className="text-xs"
//                         >
//                           {cat.name}
//                         </Badge>
//                       ))}
//                       {tutor.categories.length > 2 && (
//                         <Badge variant="secondary" className="text-xs">
//                           +{tutor.categories.length - 2}
//                         </Badge>
//                       )}
//                     </div>
//                   </TableCell>
//                   <TableCell className="font-medium">
//                     ${tutor.hourly_rate}/h
//                   </TableCell>
//                   <TableCell>
//                     <div className="flex items-center gap-1">
//                       <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
//                       <span className="font-medium">
//                         {tutor.rating_average.toFixed(1)}
//                       </span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     {tutor.isFeatured ? (
//                       <Badge className="bg-blue-100 text-blue-800">
//                         Featured
//                       </Badge>
//                     ) : (
//                       <Badge variant="outline">Regular</Badge>
//                     )}
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
//                             setSelectedTutor(tutor);
//                             setActionType("featured");
//                             setShowDialog(true);
//                           }}
//                           className="cursor-pointer"
//                         >
//                           <Zap className="w-4 h-4 mr-2" />
//                           {tutor.isFeatured ? "Unfeature" : "Feature"}
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => {
//                             setSelectedTutor(tutor);
//                             setActionType("delete");
//                             setShowDialog(true);
//                           }}
//                           className="text-red-600 cursor-pointer"
//                         >
//                           <Trash2 className="w-4 h-4 mr-2" />
//                           Delete
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

//       {/* Pagination */}
//       <div className="flex items-center justify-between text-sm text-gray-600">
//         <p>
//           Showing {Math.min(page * 10, totalTutors)} of {totalTutors} tutors
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
//             disabled={page * 10 >= totalTutors}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* Action Dialog */}
//       {selectedTutor && actionType && (
//         <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
//           <AlertDialogContent>
//             <AlertDialogTitle>
//               {actionType === "featured"
//                 ? `${selectedTutor.isFeatured ? "Unfeature" : "Feature"} Tutor`
//                 : "Delete Tutor"}
//             </AlertDialogTitle>
//             <AlertDialogDescription>
//               {actionType === "featured"
//                 ? `Are you sure you want to ${selectedTutor.isFeatured ? "unfeature" : "feature"} ${selectedTutor.user.name}?`
//                 : `Are you sure you want to permanently delete ${selectedTutor.user.name}? This action cannot be undone.`}
//             </AlertDialogDescription>
//             <div className="flex gap-3 justify-end">
//               <AlertDialogCancel onClick={() => setShowDialog(false)}>
//                 Cancel
//               </AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() => {
//                   if (actionType === "featured") {
//                     handleToggleFeatured(
//                       selectedTutor.id,
//                       selectedTutor.isFeatured,
//                     );
//                   } else {
//                     handleDeleteTutor(selectedTutor.id);
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
