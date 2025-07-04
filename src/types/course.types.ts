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

export interface Chapter {
  title: string;
  video_url: string;
  course_id: string;
  created_at?:string;
  id?:string
}