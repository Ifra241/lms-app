import { supabase } from "../supabase/supabaseClient";
import type { CreateCourseFormValues} from "../types/course.types";
import type { Course } from "../types/course.types";

//uplodthumbnail function
    export const uploadThumbnail = async(thumbnail:File):Promise<string>=>{
        const fileName = `${Date.now()}_${thumbnail.name}`;
        const{error:uploadError }= await supabase.storage
        .from("course-thumbnails").upload(fileName,thumbnail);
        if(uploadError){
            throw new Error("Thumbnail upload failed");
        }
        const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/course-thumbnails/${fileName}`;
  return publicUrl;
    };


//insert course function
    export const createCourse= async(values:CreateCourseFormValues,thumbnailUrl: string)=>{

    const { error:insertError }=await supabase.from("courses").insert({
        ...values,
        thumbnail_url:thumbnailUrl,
    });
    if(insertError){
        throw new Error("Course creation failed");
        
    }
    };

    // Get courses by teacher
    export const getCoursesByTeacher = async(teacherId:string):Promise<Course[]>=>{
        const{ data, error}=await supabase.from("courses").select("*").eq("created_by", teacherId);
          if (error) {
    console.error("Failed to fetch courses", error);
    throw new Error("Could not fetch courses");
  }

  return data as Course[];
};

    

