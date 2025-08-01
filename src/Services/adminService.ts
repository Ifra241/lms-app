//get total courses

import { supabase } from "../supabase/supabaseClient"

export const getTotalCourses=async()=>{
  try{
    const{count,error}=await supabase.from("courses").select("id,title,description",{count:"exact",head:true});
        if (error) throw error;
        return count;

    }catch(err){
      console.error("Failed to get total courses",err);
    } 
}
//get total teachers

export const getTotalTeachers=async()=>{
    const{data,error}=await supabase.from("courses").select("created_by",{head:false});
    try{
    if(error)throw error;
    //count unique creators
    const uniqueTeacher=new Set(data.map((item)=>item.created_by));
    return uniqueTeacher.size;
    }catch(err){
      console.error("Failed to get total teachers",err);
    }

}
//get total students
export const getTotalStudents=async()=>{
    const{data,error}= await supabase.from("enrollments").select("user_id",{head:false});
    try{
    if(error)throw error;
    const uniqueStudents=new Set(data.map((item)=>item.user_id));
    return uniqueStudents.size;
    }catch(error){
      console.error("Failed to get total students",error);
    }

}
export const getAdminStats = async () => {
  const totalCourses = await getTotalCourses();
  const totalTeachers = await getTotalTeachers();
  const totalStudents = await getTotalStudents();

  return { totalCourses, totalTeachers, totalStudents };
};

//get ALL Users and  clasify their roles

export const getAllUsers=async()=>{
    const{data:users,error}=await supabase.from("profile").select("id,email,full_name,role");
    if(error)throw error;
    //get teacher id
    const{data:teacherCourses,error:teacherError}=await supabase.from("courses").select("created_by");
    if(teacherError)throw error;
    const teacherIds=[...new Set(teacherCourses.map((c)=>c.created_by))];
    //get student id
    const{data:enrolledData,error:studentError}=await supabase.from("enrollments").select("user_id");
    if(studentError)throw error;
      const studentIds = [...new Set(enrolledData.map((e) => e.user_id))];
//categorize
const userRole=users.map((user)=>{
    if (user.role==="admin"){
        return{
            ...user,
            calculatedRole:"Admin"
        }
    }

    const roles=[];
     if(teacherIds.includes(user.id))roles.push("Teacher");
     if(studentIds.includes(user.id))roles.push("Student");
         const calculatedRole = roles.length > 0 ? roles.join(", ") : "User";


        return{
...user,
calculatedRole,

};


});
return userRole;
};
// getAllcoure wIth enrollments
export const getAllCoursesWithEnrollments=async()=>{
  try{
   const{data,error}=await supabase
  .from("course_with_creator")
  .select("*");

    if(error){
        console.error("Error in fatching",error);
        throw error;
    }
    return data;
    }catch(err){
      console.error("Failed to get coursesWithEnrollments",err);
    }
};
//get Summary of Teachers
export const getTeacherSummary=async()=>{
    const{data,error}=await supabase.from("teacher_course_summary").select("*");
  try{
    if(error){
        console.error("Failed to fetch teacher summary",error);throw error;
    }
    return data;
    }catch(err){
      console.error("Failed to get teacher summary",err);
    }
};
// get student Summary

export const getStudentSummary=async()=>{
    const{data,error}=await supabase.from("student_course_summary").select("*");
    try{
    if(error){
        console.error("Failed fatching summary",error);throw error;
    }
    return data;
    }catch(Error){
      console.error("There was an error",Error);
    }
};
//Block student
export const blockStudent=async(email:string,isBlocked:boolean)=>{
  try{
    const{data,error}=await supabase.from("profile").update({is_blocked_as_student:isBlocked}).eq("email",email);
    if(error){
        console.error("Failed to update",error)
        throw error;
    }
    return data;
    }catch(err){
      console.error("Something went wrong while blocking the students",err);
    }
};
//block teacher
export const blockTeacher=async(email:string,isBlocked:boolean)=>{
  try{
    const{data,error}=await supabase.from("profile").update({is_blocked_as_teacher:isBlocked}).eq("email",email);
    if(error){
        console.error("Failed to block",error)
        throw error
    };
    return data;
    }catch(error){
      console.error("Failed to block teacher",error);
    }
};
//get block teacher
export const getProfile = async (userId: string) => {
  try{
  const { data, error } = await supabase
    .from("profile")
    .select("*")
    .eq("id", userId)
    .single();

  if (error) {
    throw error;
  };

  return data;
  }catch(err){
    console.error("Failed to get Block Teacher",err);
  }
};
//block course
export const blockCourse=async(courseId:string,isBlocked:boolean)=>{
  try{
    const{data,error}=await supabase.from("courses").update({is_blocked:isBlocked}).eq("id",courseId);
     if(error){
        console.error("Failed to block course",error.message);}
    return data;
  }catch(error){
    console.error("Faild to block Course",error);
    throw error

  }
};                
// user detail
export const getUserDetailsFromView = async (userId: string) => {
  try {
    const { data, error } = await supabase
      .from("user_detailed_profile_view")
      .select("*")
      .eq("id", userId)
      .single();

    if (error) throw error;

    return data;
  } catch (err) {
    console.error("Failed to fetch user details:", err);
    throw err;
  }
};















  
