import { supabase } from "../supabase/supabaseClient";
import type { CreateCourseFormValues} from "../types/course.types";

//uplodthumbnail function
    export const uploadThumbnail = async(thumbnail:File):Promise<string>=>{
        const fileName = `${Date.now()}_${thumbnail.name}`;
        const{error:uploadError }= await supabase.storage
        .from("thumbnails").upload(fileName,thumbnail);
        if(uploadError){
            throw new Error("Thumbnail upload failed");
        }
        const publicUrl = `${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/thumbnails/${fileName}`;
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

