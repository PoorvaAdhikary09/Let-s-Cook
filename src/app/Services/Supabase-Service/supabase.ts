import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private readonly supabase: SupabaseClient;

  constructor() { 
    this.supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
    );
  }

  get client() {
    return this.supabase;
  }

  async signUp(name: string, email: string, password: string) {
  return await this.supabase.auth.signUp({
    email,
    password,
    options: {
      data: {
        name,
      },
    },
  });
}

async signIn(email: string, password: string) {
  return await this.supabase.auth.signInWithPassword({
    email,
    password,
  });
}

getSession() {
  return this.supabase.auth.getSession();
}

}
