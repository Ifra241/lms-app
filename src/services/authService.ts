import { supabase } from '../supabase/supabaseClient';

import type { SignupFormValues,LoginFormValues } from "../types/auth";

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
    if (signUpError)throw signUpError
    const userId=signUpData.user?.id;
    const userEmail=signUpData.user?.email;
    if(userId&&userEmail){
      const{error:Error}=await supabase.from("profile").insert([
        {
        id:userId,
        full_name:fullName,
        email:userEmail,
        },
      ]);
      if(Error)throw Error;
    }
    return signUpData;
}
//Login
export async function loginUser({email,password}:LoginFormValues){
    return await supabase.auth.signInWithPassword({
        email,
        password,
    });
}
//Get User

export const getCurrentUser= async()=>{

    const{data,error}=await supabase.auth.getUser();
    return{user:data?.user,error};
};
//
export const uploadProfilePic = async (file: File): Promise<string | null> => {
  const fileName = `profile_${Date.now()}_${file.name}`;
  const { data, error } = await supabase.storage
    .from("profile-pics")
    .upload(fileName, file);

  if (error) {
    console.error("Upload failed", error);
    return null;
  }

  const { publicUrl } = supabase.storage
    .from("profile-pics")
    .getPublicUrl(data.path);

  return publicUrl;
};

