import { supabase } from '../supabase/supabaseClient';

import type { SignupFormValues,LoginFormValues } from "../types/auth";

//Signup

export async function signUpUser({
    email,
    password,
    fullName,
}:SignupFormValues){
    return await supabase.auth.signUp({
        email,
        password,
        options:{
            data:{
                fullName,
            },
        },
    });
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