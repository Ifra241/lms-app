export type SignupFormValues = {
  email: string;
  password: string;
  fullName: string;
  profilePic?: File;
  profilePicUrl?:string;
};

export type LoginFormValues = {
  email: string;
  password: string
};
