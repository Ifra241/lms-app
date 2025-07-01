import { supabase } from '../supabase/supabaseClient';

import type { SignupFormValues,LoginFormValues } from "../types/auth";



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
export async function loginUser({email,password}:LoginFormValues){
    return await supabase.auth.signInWithPassword({
        email,
        password,
    });
}
