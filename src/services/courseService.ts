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
  const{data:user,error:userError}=await supabase.from("profile").select("is_blocked_as_teacher").eq("id",createdBy).single();
  if (userError || !user) {
    throw new Error("Failed to verify teacher status");
  }

  if (user.is_blocked_as_teacher) {
    throw new Error("Teacher is blocked from creating courses");
  }


    const { data,error }=await supabase.from("courses").insert({
        ...values,
        thumbnail_url:thumbnailUrl,
        created_by: createdBy,
    })
    .select()
    .single();
    if(error||!data){
        throw new Error("Course creation failed");   
    }
    return data;
    };

    // Get courses by teacher
    export const getCoursesByTeacher = async(teacherId:string):Promise<Course[]>=>{
      const{data:user,error:userError}=await supabase.from("profile").select("is_blocked_as_teacher").eq("id",teacherId).single();
  if (userError || !user) {
    throw new Error("Failed to verify teacher status");
  }

  if (user.is_blocked_as_teacher) {
    throw new Error("Teacher is blocked from creating courses");
  }

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
    //getchapterbyId
    export const getChapterById = async (chapterId: string): Promise<Chapter> => {
  const { data, error } = await supabase
    .from("chapter")
    .select("*")
    .eq("id", chapterId)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return data as Chapter;
};

    //getChapterBycourseId

    export const getChapterBycourseId=async(courseId:string)=>{

        const{data,error}=await supabase.from("chapter").select("*").eq("course_id",courseId);
    if (error) throw error;
  return data;
};
//update chapter
export const updateChapter = async (chapterId: string, updates: Partial<Chapter>) => {
   
  const { error } = await supabase
    .from("chapter")
    .update(updates)
    .eq("id", chapterId);

  if (error) throw error;
};
//Delte chapter
export const deleteChapter=async(chapterId:string)=>{
   
  const{error}=await supabase.from("chapter").delete().eq("id",chapterId)
  if(error){
    throw error;
  }
};
//handelENROLL
 export const enrollCourse=async(courseId:string,userId:string)=>{
  const{data:userProfile,error:profileError}=await supabase.from("profile").select("is_blocked_as_student").eq("id",userId).single();
  if (profileError) {
    console.error("Profile fetch error:", profileError.message);
    throw new Error("Could not verify user status.");
  }
   if (userProfile?.is_blocked_as_student) {
    console.warn("Blocked user cannot enroll.");
    throw new Error("You are blocked and cannot enroll in courses.");
  }

  //check already enroll
  const{data:existing}=await supabase.from("enrollments").select("*")
  
.match({user_id :userId,course_id:courseId});
console.log("Existing Enrollment:", existing);

  if(existing && existing.length>0){
    console.warn("Yoy already enrolled in this course.")
    return;
  }
    console.log("Sending to Supabase:", { userId, courseId });

  //insert enrollment
  const{error}=await supabase.from("enrollments").insert([
    {
       user_id: userId,
      course_id: courseId,
 
    },
  ]);
  if(error){
      console.error("Insert error:", error.message);

    throw new Error("Enrollment failed");
  }

};
//get enroll courses
export const getEnrolledCourses =async(userId:string):Promise<Course[]>=>{
   const { data: userProfile, error: profileError } = await supabase
    .from("profile")
    .select("is_blocked_as_student")
    .eq("id", userId)
    .single();

  if (profileError) {
    console.error("Error fetching profile:", profileError.message);
    throw new Error("Could not check user status.");
  }
  if(userProfile?.is_blocked_as_student){
    console.warn("Blocked user!")
    return[];
  }

  const{data, error}=await supabase.from("enrollments").select("courses!enrollments_course_id_fkey(*)")

   .eq("user_id", userId);
    if(error){
      console.error("Supabase error",error)
      throw new Error("Could not fetch Enrolled courses");
    }
    const coursesOnly =data.map((entry)=>entry.courses as unknown as Course);
      return coursesOnly;

  };

  //get course state

  export const getCourseStats=async(teacherId:string)=>{
    const{data:courses,error:courseError}=await supabase.from("courses").select("id,title").eq("created_by",teacherId)
    if(courseError)throw courseError;
    const stats=[];
    for(const course of courses){
      const{count,error:countError}=await supabase.from("enrollments").select("*",{count:"exact",head:true}).eq("course_id", course.id);
        if (countError) throw countError;
         stats.push({
      course: course.title,
      students: count ?? 0,
    });
  }

  return stats;
}
//MarkChapterWatched
export const markChapterAsWatched = async (userId: string, chapterId: string) => {
  const { data, error } = await supabase
    .from("watched_chapters")
    .upsert([
      {
        user_id: userId,
        chapter_id: chapterId,
        is_watched: true,
      },
    ],    { onConflict: 'user_id,chapter_id',}


  );
  if (error) {
    throw new Error("Failed to mark chapter as watched");
  }

  return data;
};
// get watched chapter

export const getWatchedChapter=async (userId:string):Promise<string[]>=>{
  const{data,error}=await supabase.from("watched_chapters").select("chapter_id") .eq("user_id",userId)
  if(error){
    console.error("Error fetching watched chapters:", error.message);
    return [];
  }

  return data.map((item) => item.chapter_id);
}

  


    









