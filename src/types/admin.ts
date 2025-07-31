export type AdminStats={
    totalCourses:number;
    totalTeachers:number;
    totalStudents:number;
};

export type UserWithRole={
     id: string;
  email: string;
  full_name: string;
  role: string;
  calculatedRole: string;

};
export type StatsType = {
  totalCourses: number;
  totalTeachers: number;
  totalStudents: number;
};