'use server'

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

interface LoginData {
  email : string,
  password : string,
}

export async function login(formData: LoginData) {
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

  revalidatePath('/', 'layout')
  redirect('/profile')
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
  const data = {
    email: email,
    password: password,
    options: {
      data: {
        username: username
      }
    }
  }

  const { error } = await supabase.auth.signUp(data)

  if (error) {
    throw error;
  }

  revalidatePath('/', 'layout')
  redirect('/profile')
}

export async function logout() {
  const supabase = createClient();

  const { error } = await supabase.auth.signOut();

  if (error) { 
    redirect("/error");
  }

  revalidatePath('/', 'layout')
  redirect('/')
}