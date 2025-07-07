import { supabase } from "../supabase/supabaseClient";
import type { CreateCourseFormValues} from "../types/course.types";
import type { Course } from "../types/course.types";
import type{Chapter}from "../types/course.types"


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
  export const createCourse= async(values:CreateCourseFormValues,thumbnailUrl: string,createdBy: string
)=>{

    const { error:insertError }=await supabase.from("courses").insert({
        ...values,
        thumbnail_url:thumbnailUrl,
        created_by: createdBy
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
//getCoursebyId
export const getCourseById=async(courseId:string):Promise<Course>=>{

  const{data,error}=await supabase.from("courses").select("*").eq("id",courseId)
  .single();// single course milega
  if(error||!data){
     throw new Error("Failed to fetch course");
  }

  return data;

  };
  //get all courses
  export const getAllCourses = async (): Promise<Course[]> => {
  const { data, error } = await supabase.from("courses").select("*");
  if (error) throw new Error("Failed to fetch all courses");
  return data;
};


//upload vedio Function

export const uploadVedio=async(vedio:File):Promise<string>=>{
    const fileName=`${Date.now()}_${vedio.name}`;
  const {error:uploadError}=await supabase.storage.from("chapter-videos").upload(fileName,vedio);
  if(uploadError){
    console.error("Upload error:", uploadError);
    throw new Error("Failed Upload vedio");}
    const publicUrl=`${import.meta.env.VITE_SUPABASE_URL}/storage/v1/object/public/chapter-videos/${fileName}`;
    return publicUrl;
}
    //Add chapter Function
    export const addChapter=async(chapter:Chapter)=>{
        const{data,error}=await supabase.from("chapter").insert([chapter]);
        if (error) {
    throw error;
  }

  return data;
    };
    //getChapterBycourseId

    export const getChapterBycourseId=async(courseId:string)=>{

        const{data,error}=await supabase.from("chapter").select("*").eq("course_id",courseId);
    if (error) throw error;
  return data;
};

//handelENROLL
 export const enrollCourse=async(courseId:string,userId:string)=>{
  //check already enroll
  const{data:existing}=await supabase.from("enrollments").select("*").eq("user_id", userId).eq("course_id", courseId)
  if(existing && existing.length>0){
    console.warn("Yoy already enrolled in this course.")
    return;
  }
  //in sert enrollment
  const{error}=await supabase.from("enrollments").insert([
    {
       user_id: userId,
      course_id: courseId,
 
    },
  ]);
  if(error){
    throw new Error("Enrollment failed");
  }

};




