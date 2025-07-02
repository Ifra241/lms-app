export interface  CreateCourseFormValues{
    title:string;
    description:string;
}
export interface Course extends CreateCourseFormValues{
    id:string;
    thumbnail_url:string;
    created_by: string;
  created_at: string;
    
}