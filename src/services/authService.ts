import { supabase } from '../supabase/supabaseClient';

import type { SignupFormValues,LoginFormValues, UserProfile } from "../types/auth";

//Signup

export async function signUpUser({
    email,
    password,
    fullName,
    profilePicUrl,

}:SignupFormValues){
  
  

   const{data:signUpData,error:signUpError} = await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                fullName,
                profilePic: profilePicUrl,
            },
        },
    });
    if (signUpError){
      console.error("Failed to signup",signUpError);
      throw signUpError
    }
    const userId=signUpData.user?.id;
    const userEmail=signUpData.user?.email;
    if(userId&&userEmail){
      const{error:Error}=await supabase.from("profile").insert([
        {
        id:userId,
        full_name:fullName,
        email:userEmail,
        role:"user",
        profile_pic:profilePicUrl,
        },
      ]);
      if(Error)throw Error;
    }
    return signUpData;
};
//Login
export async function loginUser({email,password}:LoginFormValues){
    return await supabase.auth.signInWithPassword({
        email,
        password,
    });
};

//Get User

export const getCurrentUser= async()=>{

    const{data,error}=await supabase.auth.getUser();
    return{user:data?.user,error};
};
//Upload Profile Img
export const uploadProfilePic = async (file: File): Promise<string | null> => {
  const fileName = `profile_${Date.now()}_${file.name}`;
  
  const { data, error } = await supabase.storage
    .from("profile-pics")
    .upload(fileName, file);

  if (error) {
    console.error("Upload failed", error);
    return null;
  }

  if (!data?.path) {
    console.error("No path returned from upload");
    return null;
  }

  const { data: publicUrlData } = supabase
    .storage
    .from("profile-pics")
    .getPublicUrl(data.path);

  if (!publicUrlData?.publicUrl) {
    console.error("No public URL returned");
    return null;
  }

  console.log("Uploaded image URL:", publicUrlData.publicUrl);
  return publicUrlData.publicUrl;
};


//get currn user profile

export const getCurrentUserProfile = async () => {
  const { data: authData, error: authError } = await supabase.auth.getUser();
  if (authError) throw authError;

  const user = authData?.user;
  if (!user) throw new Error("No authenticated user found");

  const { data: profileData, error: profileError } = await supabase
    .from("profile")
    .select("*")
    .eq("id", user.id)
    .single();

  if (profileError) throw profileError;

  return profileData;
};
//update profile

export const updateProfile=async(updatedData:Partial<UserProfile>)=>{
  const { data: user } = await supabase.auth.getUser();
  const userId = user?.user?.id;
  if (!userId) throw new Error("User not logged in");



  const{ data:profile,error}=await supabase.from("profile").update(updatedData).eq("id", userId);
   if (error) throw error;
  return profile;
};



