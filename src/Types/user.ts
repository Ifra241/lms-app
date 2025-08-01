export interface Course {
  id: string;
  title: string;
}

export interface UserDetailedProfile {
  user_id: string;
  full_name: string;
  email: string;
  role: string;
  created_courses: Course[];
  enrolled_courses: Course[];
  is_blocked_as_teacher: boolean;
  is_blocked_as_student: boolean;
}
