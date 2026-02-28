// // lib/api/admin.ts
// import { baseAPI } from "@/lib/axios"; // adjust import based on your setup

// export interface PaginationParams {
//   page?: number;
//   limit?: number;
//   search?: string;
// }

// export interface DashboardStats {
//   totalUsers: number;
//   totalTutors: number;
//   totalStudents: number;
//   totalRevenue: number;
//   pendingBookings: number;
//   completedBookings: number;
//   bannedUsers: number;
// }

// export interface User {
//   id: string;
//   email: string;
//   name: string;
//   role: "student" | "tutor" | "admin";
//   isBanned: boolean;
//   created_at: string;
//   image?: string;
// }

// export interface Booking {
//   id: string;
//   student: User;
//   tutor: {
//     id: string;
//     user: User;
//     rating_average: number;
//   };
//   status: "pending" | "confirmed" | "completed" | "cancelled";
//   total_price: number;
//   duration_hours: number;
//   subject: string;
//   created_at: string;
//   availability?: {
//     start_date_time: string;
//     end_date_time: string;
//   };
// }

// export interface Category {
//   id: number;
//   name: string;
//   description?: string;
// }

// export interface TutorData {
//   id: string;
//   user: User;
//   hourly_rate: number;
//   bio: string;
//   rating_average: number;
//   isFeatured: boolean;
//   image?: string;
//   categories: Category[];
// }

// // Dashboard APIs
// export const adminDashboardAPI = {
//   getStats: async (): Promise<DashboardStats> => {
//     const response = await baseAPI.get("/admin/dashboard/stats");
//     return response.data;
//   },

//   getChartData: async () => {
//     const response = await baseAPI.get("/admin/dashboard/charts");
//     return response.data;
//   },
// };

// // Users Management APIs
// export const adminUsersAPI = {
//   getAll: async (params?: PaginationParams) => {
//     const response = await baseAPI.get("/admin/users", { params });
//     return response.data;
//   },

//   getById: async (userId: string) => {
//     const response = await baseAPI.get(`/admin/users/${userId}`);
//     return response.data;
//   },

//   updateStatus: async (userId: string, isBanned: boolean) => {
//     const response = await baseAPI.patch(`/admin/users/${userId}/status`, {
//       isBanned,
//     });
//     return response.data;
//   },

//   getStats: async () => {
//     const response = await baseAPI.get("/admin/users/stats");
//     return response.data;
//   },

//   deleteUser: async (userId: string) => {
//     const response = await baseAPI.delete(`/admin/users/${userId}`);
//     return response.data;
//   },
// };

// // Bookings Management APIs
// export const adminBookingsAPI = {
//   getAll: async (params?: PaginationParams & { status?: string }) => {
//     const response = await baseAPI.get("/admin/bookings", { params });
//     return response.data;
//   },

//   getById: async (bookingId: string) => {
//     const response = await baseAPI.get(`/admin/bookings/${bookingId}`);
//     return response.data;
//   },

//   updateStatus: async (
//     bookingId: string,
//     status: "pending" | "confirmed" | "completed" | "cancelled",
//   ) => {
//     const response = await baseAPI.patch(
//       `/admin/bookings/${bookingId}/status`,
//       {
//         status,
//       },
//     );
//     return response.data;
//   },

//   getStats: async () => {
//     const response = await baseAPI.get("/admin/bookings/stats");
//     return response.data;
//   },
// };

// // Categories Management APIs
// export const adminCategoriesAPI = {
//   getAll: async (params?: PaginationParams) => {
//     const response = await baseAPI.get("/admin/categories", { params });
//     return response.data;
//   },

//   create: async (data: { name: string; description?: string }) => {
//     const response = await baseAPI.post("/admin/categories", data);
//     return response.data;
//   },

//   update: async (
//     categoryId: number,
//     data: { name: string; description?: string },
//   ) => {
//     const response = await baseAPI.put(`/admin/categories/${categoryId}`, data);
//     return response.data;
//   },

//   delete: async (categoryId: number) => {
//     const response = await baseAPI.delete(`/admin/categories/${categoryId}`);
//     return response.data;
//   },
// };

// // Tutors Management APIs
// export const adminTutorsAPI = {
//   getAll: async (params?: PaginationParams & { featured?: boolean }) => {
//     const response = await baseAPI.get("/admin/tutors", { params });
//     return response.data;
//   },

//   getById: async (tutorId: string) => {
//     const response = await baseAPI.get(`/admin/tutors/${tutorId}`);
//     return response.data;
//   },

//   toggleFeatured: async (tutorId: string, isFeatured: boolean) => {
//     const response = await baseAPI.patch(`/admin/tutors/${tutorId}/featured`, {
//       isFeatured,
//     });
//     return response.data;
//   },

//   updateStatus: async (tutorId: string, isActive: boolean) => {
//     const response = await baseAPI.patch(`/admin/tutors/${tutorId}/status`, {
//       isActive,
//     });
//     return response.data;
//   },

//   getStats: async () => {
//     const response = await baseAPI.get("/admin/tutors/stats");
//     return response.data;
//   },
// };

// // Reviews Management APIs
// export const adminReviewsAPI = {
//   getAll: async (params?: PaginationParams) => {
//     const response = await baseAPI.get("/admin/reviews", { params });
//     return response.data;
//   },

//   delete: async (reviewId: string) => {
//     const response = await baseAPI.delete(`/admin/reviews/${reviewId}`);
//     return response.data;
//   },
// };
