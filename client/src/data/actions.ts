'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

interface LoginData {
  email : string,
  password : string,
}

export async function login(formData: LoginData) {
  'use server';

  const supabase = createClient()

  // type-casting here for convenience
  // in practice, you should validate your inputs
  
  const { email, password } = formData;
  const data = {
    email: email,
    password: password,
  }

  const { error } = await supabase.auth.signInWithPassword(data);

  if (error) {
    throw error;
  }

  revalidatePath('/', 'layout');
  redirect("/");
}

interface RegisterData {
  email : string,
  password : string,
  username : string
}

export async function signup(formData: RegisterData) {
  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { email, password, username } = formData;
  const insert = {
    email: email,
    password: password,
    data: {
      username : username
    }
  }

  // insert new user
  const { data, error } = await supabase.auth.signUp(insert,);
  if (error || !data) { throw error; }

  // insert into profile
  const {error:error2} = await supabase.from("profile").insert({username:username});
  if (error2) { throw error2; }

  // return
  revalidatePath('/', 'layout')
  redirect('/profile')
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) { 
    redirect("/error");
  }

  revalidatePath('/', 'layout');
  redirect("/");
}