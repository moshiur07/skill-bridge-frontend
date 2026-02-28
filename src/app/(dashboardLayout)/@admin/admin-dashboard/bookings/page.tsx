// // app/admin/bookings/page.tsx
// "use client";

// import React, { useEffect, useState } from "react";
// // import { adminBookingsAPI, Booking } from "@/lib/api/admin";
// import {
//   Table,
//   TableBody,
//   TableCell,
//   TableHead,
//   TableHeader,
//   TableRow,
// } from "@/components/ui/table";
// import {
//   Select,
//   SelectContent,
//   SelectItem,
//   SelectTrigger,
//   SelectValue,
// } from "@/components/ui/select";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Badge } from "@/components/ui/badge";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";
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
//   Calendar,
//   DollarSign,
//   AlertCircle,
//   User,
// } from "lucide-react";
// import { Alert, AlertDescription } from "@/components/ui/alert";
// import { Skeleton } from "@/components/ui/skeleton";
// import Image from "next/image";
// import { format } from "date-fns";
// import { adminBookingsAPI, Booking } from "@/lib/api/admin";

// export default function BookingsPage() {
//   const [bookings, setBookings] = useState<Booking[]>([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState<string | null>(null);
//   const [searchTerm, setSearchTerm] = useState("");
//   const [statusFilter, setStatusFilter] = useState<string>("all");
//   const [page, setPage] = useState(1);
//   const [totalBookings, setTotalBookings] = useState(0);

//   // Dialog states
//   const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
//   const [newStatus, setNewStatus] = useState<
//     "pending" | "confirmed" | "completed" | "cancelled" | null
//   >(null);
//   const [isActionLoading, setIsActionLoading] = useState(false);
//   const [showDialog, setShowDialog] = useState(false);

//   useEffect(() => {
//     fetchBookings();
//   }, [page, searchTerm, statusFilter]);

//   const fetchBookings = async () => {
//     try {
//       setIsLoading(true);
//       setError(null);
//       const response = await adminBookingsAPI.getAll({
//         page,
//         limit: 10,
//         search: searchTerm,
//         status: statusFilter !== "all" ? statusFilter : undefined,
//       });
//       setBookings(response.data || []);
//       setTotalBookings(response.total || 0);
//     } catch (err) {
//       setError("Failed to load bookings. Please try again.");
//       console.error("Error fetching bookings:", err);
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   const handleStatusChange = async (
//     bookingId: string,
//     status: "pending" | "confirmed" | "completed" | "cancelled",
//   ) => {
//     try {
//       setIsActionLoading(true);
//       await adminBookingsAPI.updateStatus(bookingId, status);
//       // Update local state
//       setBookings(
//         bookings.map((booking) =>
//           booking.id === bookingId ? { ...booking, status } : booking,
//         ),
//       );
//       setShowDialog(false);
//       setSelectedBooking(null);
//       setNewStatus(null);
//     } catch (err) {
//       setError("Failed to update booking status. Please try again.");
//       console.error("Error updating booking:", err);
//     } finally {
//       setIsActionLoading(false);
//     }
//   };

//   const getStatusColor = (status: string) => {
//     switch (status) {
//       case "completed":
//         return "bg-green-100 text-green-800";
//       case "confirmed":
//         return "bg-blue-100 text-blue-800";
//       case "pending":
//         return "bg-yellow-100 text-yellow-800";
//       case "cancelled":
//         return "bg-red-100 text-red-800";
//       default:
//         return "bg-gray-100 text-gray-800";
//     }
//   };

//   if (isLoading && bookings.length === 0) {
//     return (
//       <div className="space-y-6">
//         <div>
//           <h1 className="text-3xl font-bold text-gray-900">
//             Bookings Management
//           </h1>
//           <p className="text-gray-600 mt-1">
//             View and manage all tutoring sessions
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
//         <h1 className="text-3xl font-bold text-gray-900">
//           Bookings Management
//         </h1>
//         <p className="text-gray-600 mt-1">
//           View and manage all tutoring sessions
//         </p>
//       </div>

//       {/* Error Alert */}
//       {error && (
//         <Alert variant="destructive">
//           <AlertCircle className="h-4 w-4" />
//           <AlertDescription>{error}</AlertDescription>
//         </Alert>
//       )}

//       {/* Filters */}
//       <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
//         <div className="flex items-center gap-2 flex-1">
//           <Search className="w-5 h-5 text-gray-400" />
//           <Input
//             placeholder="Search by student or tutor name..."
//             value={searchTerm}
//             onChange={(e) => {
//               setSearchTerm(e.target.value);
//               setPage(1);
//             }}
//             className="flex-1"
//           />
//         </div>
//         <Select
//           value={statusFilter}
//           onValueChange={(value) => {
//             setStatusFilter(value);
//             setPage(1);
//           }}
//         >
//           <SelectTrigger className="w-full sm:w-48">
//             <SelectValue placeholder="Filter by status" />
//           </SelectTrigger>
//           <SelectContent>
//             <SelectItem value="all">All Statuses</SelectItem>
//             <SelectItem value="pending">Pending</SelectItem>
//             <SelectItem value="confirmed">Confirmed</SelectItem>
//             <SelectItem value="completed">Completed</SelectItem>
//             <SelectItem value="cancelled">Cancelled</SelectItem>
//           </SelectContent>
//         </Select>
//       </div>

//       {/* Table */}
//       <div className="bg-white rounded-lg border border-gray-200 overflow-hidden">
//         <Table>
//           <TableHeader>
//             <TableRow className="bg-gray-50 border-b border-gray-200">
//               <TableHead>Student</TableHead>
//               <TableHead>Tutor</TableHead>
//               <TableHead>Subject</TableHead>
//               <TableHead>Duration</TableHead>
//               <TableHead>Price</TableHead>
//               <TableHead>Status</TableHead>
//               <TableHead>Date</TableHead>
//               <TableHead className="w-12">Actions</TableHead>
//             </TableRow>
//           </TableHeader>
//           <TableBody>
//             {isLoading ? (
//               <>
//                 {[...Array(5)].map((_, i) => (
//                   <TableRow key={i}>
//                     <TableCell>
//                       <Skeleton className="h-4 w-24" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-24" />
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
//                       <Skeleton className="h-6 w-20" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-4 w-24" />
//                     </TableCell>
//                     <TableCell>
//                       <Skeleton className="h-8 w-8" />
//                     </TableCell>
//                   </TableRow>
//                 ))}
//               </>
//             ) : bookings.length === 0 ? (
//               <TableRow>
//                 <TableCell colSpan={8} className="text-center py-8">
//                   <p className="text-gray-500">No bookings found</p>
//                 </TableCell>
//               </TableRow>
//             ) : (
//               bookings.map((booking) => (
//                 <TableRow
//                   key={booking.id}
//                   className="border-b hover:bg-gray-50"
//                 >
//                   <TableCell className="font-medium">
//                     <div className="flex items-center gap-2">
//                       {booking.student.image ? (
//                         <Image
//                           src={booking.student.image}
//                           alt={booking.student.name}
//                           width={32}
//                           height={32}
//                           className="w-6 h-6 rounded-full"
//                         />
//                       ) : (
//                         <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center text-white text-xs font-bold">
//                           {booking.student.name.charAt(0)}
//                         </div>
//                       )}
//                       <span className="text-sm">{booking.student.name}</span>
//                     </div>
//                   </TableCell>
//                   <TableCell>
//                     <div className="text-sm">{booking.tutor.user.name}</div>
//                     <div className="text-xs text-gray-500">
//                       Rating: {booking.tutor.rating_average}
//                     </div>
//                   </TableCell>
//                   <TableCell className="text-sm">{booking.subject}</TableCell>
//                   <TableCell className="text-sm">
//                     {booking.duration_hours}h
//                   </TableCell>
//                   <TableCell className="text-sm font-medium">
//                     ${booking.total_price}
//                   </TableCell>
//                   <TableCell>
//                     <Badge className={getStatusColor(booking.status)}>
//                       {booking.status}
//                     </Badge>
//                   </TableCell>
//                   <TableCell className="text-sm text-gray-600">
//                     {booking.availability
//                       ? format(
//                           new Date(booking.availability.start_date_time),
//                           "MMM dd, yyyy",
//                         )
//                       : "N/A"}
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
//                             setSelectedBooking(booking);
//                             setNewStatus("confirmed");
//                             setShowDialog(true);
//                           }}
//                           className="cursor-pointer"
//                           disabled={booking.status === "confirmed"}
//                         >
//                           Confirm
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => {
//                             setSelectedBooking(booking);
//                             setNewStatus("completed");
//                             setShowDialog(true);
//                           }}
//                           className="cursor-pointer"
//                           disabled={booking.status === "completed"}
//                         >
//                           Mark Complete
//                         </DropdownMenuItem>
//                         <DropdownMenuItem
//                           onClick={() => {
//                             setSelectedBooking(booking);
//                             setNewStatus("cancelled");
//                             setShowDialog(true);
//                           }}
//                           className="text-red-600 cursor-pointer"
//                           disabled={booking.status === "cancelled"}
//                         >
//                           Cancel
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
//           Showing {Math.min(page * 10, totalBookings)} of {totalBookings}{" "}
//           bookings
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
//             disabled={page * 10 >= totalBookings}
//           >
//             Next
//           </Button>
//         </div>
//       </div>

//       {/* Status Change Dialog */}
//       {selectedBooking && newStatus && (
//         <AlertDialog open={showDialog} onOpenChange={setShowDialog}>
//           <AlertDialogContent>
//             <AlertDialogTitle>Update Booking Status</AlertDialogTitle>
//             <AlertDialogDescription>
//               Change status of booking {selectedBooking.id} to {newStatus}?
//             </AlertDialogDescription>
//             <div className="flex gap-3 justify-end">
//               <AlertDialogCancel onClick={() => setShowDialog(false)}>
//                 Cancel
//               </AlertDialogCancel>
//               <AlertDialogAction
//                 onClick={() =>
//                   handleStatusChange(selectedBooking.id, newStatus)
//                 }
//                 disabled={isActionLoading}
//               >
//                 {isActionLoading ? "Updating..." : "Confirm"}
//               </AlertDialogAction>
//             </div>
//           </AlertDialogContent>
//         </AlertDialog>
//       )}
//     </div>
//   );
// }
