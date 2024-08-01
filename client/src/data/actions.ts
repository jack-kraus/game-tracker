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
 
  try {
    const { error } = await supabase.auth.signInWithPassword(data);
    if (error) throw error.message;
  } catch (e) {
    return { success : false, key : "password", message : e }
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
  'use server';

  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { email, password, username } = formData;
  const insert = {
    email: email,
    password: password
  }

  // check if username taken
  try {
    const { count } = await supabase
      .from('profile')
      .select('*', { count: 'exact', head: true })
      .eq('username', username);
    if ((typeof count !== "number") || count >= 1) return { success : false, key : "username", message : "Username taken" }
  } catch(e) {
    return { success : false, key : "password", message : e.toString() }
  }
  
  // insert new user
  try {
    const { data, error } = await supabase.auth.signUp(insert);
    if (error || !data?.user) {
      if (error?.code === "user_already_exists") return { success : false, key : "email", message : error.message }
      else return { success : false, key : "confirm_password", message : error?.message || "Server error" }
    }
  } catch(e) {
    return { success : false, key : "password", message : e.toString() }
  }
  
  // insert into profile (if error, bypass in remote case of race condition with user sign-up)
  try { await supabase.from("profile").upsert({ username:username }, { onConflict: 'id' }); }
  catch(e) { console.error(e); }

  // return
  revalidatePath('/', 'layout');
  redirect('/profile');
}

export async function logout() {
  'use server';

  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) { 
    redirect("/error");
  }

  revalidatePath('/', 'layout');
  redirect("/");
}

export async function change_password(formData: RegisterData) {
  'use server';

  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { password } = formData;

  // update user user
  try {
    const { data, error } = await supabase.auth.updateUser({ password: password });
    if (error || !data?.user) {
      if (error?.code === "user_already_exists") return { success : false, key : "email", message : error.message }
      else return { success : false, key : "confirm_password", message : error?.message || "Server error" }
    }
  } catch(e) {
    return { success : false, key : "password", message : e.toString() }
  }

  // return
  revalidatePath('/', 'layout');
  redirect('/profile');
}


export async function change_username(formData: RegisterData) {
  'use server';

  const supabase = createClient();

  // type-casting here for convenience
  // in practice, you should validate your inputs
  const { username } = formData;

  // add username
  try {
    const { error } = await supabase.from("profile").upsert({ username:username }, { onConflict: 'id' });
    if (error) throw error.message.startsWith("duplicate key value") ? "Username taken" : error.message;
  } catch(e) {
    return { success : false, key : "username", message : e.toString() }
  }

  // return
  revalidatePath('/', 'layout');
  redirect('/profile');
}