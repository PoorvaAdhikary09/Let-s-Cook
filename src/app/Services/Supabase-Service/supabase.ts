import { Injectable } from '@angular/core';
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environment';
import { BehaviorSubject } from 'rxjs';
import { Session, User } from '@supabase/supabase-js';


@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private readonly supabase: SupabaseClient;
  private _session = new BehaviorSubject<Session | null>(null);
  session$ = this._session.asObservable();

  constructor() { 
    this.supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
    );
    
    // 🔑 Listen to auth changes
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._session.next(session);
    });
    this.initializeSession();
  }

  private async initializeSession() {
  const { data } = await this.supabase.auth.getSession();
    if (data.session !== this._session.value) {
    this._session.next(data.session);
  }
 }

  get client() {
    return this.supabase;
  }
  
  getSession() {
    return this.supabase.auth.getSession();
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


async logout() {
  await this.supabase.auth.signOut();
}

}
