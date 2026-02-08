interface User {
  id: string;
  email: string;
  role: string;
  name: string;
  image: string | null;
  emailVerified: boolean;
  created_at: string;
  updated_at: string;
}

interface Booking {
  id: string;
  total_price: number;
  status: string;
  created_at: string;
  duration_hours: number;
  student: {
    name: string;
    email: string;
  };
}

interface Schedule {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface Availability {
  id: string;
  start_date_time: string;
  end_date_time: string;
  is_booked: boolean;
}

interface TutorProfile {
  id: string;
  bio: string;
  hourly_rate: number;
  rating_average: number;
  isFeatured: boolean;
  user_id: string;
  image?: string | null; // Optional field that will be added
  categories: Category[];
  user: User;
  bookings: Booking[];
  schedules: Schedule[];
  availabilities: Availability[];
}

interface ApiResponse {
  success: boolean;
  data: TutorProfile;
}

interface Category {
  id: number;
  name: string;
  description: string | null;
}

interface User {
  id: string;
  name: string;
  email: string;
  image: string | null;
}

interface Booking {
  id: string;
  total_price: number;
  status: string;
  created_at: string;
  duration_hours: number;
  student: {
    name: string;
    email: string;
  };
}

interface Schedule {
  id: string;
  day_of_week: number;
  start_time: string;
  end_time: string;
}

interface Availability {
  id: string;
  start_date_time: string;
  end_date_time: string;
  is_booked: boolean;
}

interface TutorProfile {
  id: string;
  bio: string;
  hourly_rate: number;
  rating_average: number;
  isFeatured: boolean;
  user_id: string;
  image?: string | null;
  categories: Category[];
  user: User;
  bookings: Booking[];
  schedules: Schedule[];
  availabilities: Availability[];
}

interface TutorProfileClientProps {
  tutor: TutorProfile;
  tutorId: string;
}

interface TutorProfilePageProps {
  params: Promise<{ id: string }>;
}

export type {
  User,
  Booking,
  Schedule,
  Availability,
  TutorProfile,
  TutorProfileClientProps,
  TutorProfilePageProps,
  Category,
  ApiResponse,
};
