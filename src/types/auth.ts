export type SignupFormValues = {
  email: string;
  password: string;
  fullName: string;
  profilePic?: string|null;
  profilePicUrl?:string;
};

export type LoginFormValues = {
  email: string;
  password: string
};

export type UserProfile = {
  id: string;
  full_name: string;
  profile_pic: string;
  role: "student" | "teacher" | "admin";
  bio: string | null;
};

