import { Injectable } from '@angular/core';
//This creates a connection between your app and Supabase backend.
import { createClient, SupabaseClient } from '@supabase/supabase-js';
import { environment } from 'src/environments/environments';
import { BehaviorSubject } from 'rxjs';
import { Session, User } from '@supabase/supabase-js'; //Session : contains access token, user info, expiry


@Injectable({
  providedIn: 'root',
})
export class Supabase {
  private readonly supabase: SupabaseClient;
  private _session = new BehaviorSubject<Session | null>(null); //creating a BehaviorSubject to store the current login session. Behaviour Subject is a house
  session$ = this._session.asObservable(); //Because components should observe session changes but not modify it. Obseravable is a watchman

  constructor() { 
    this.supabase = createClient(
    environment.supabaseUrl,
    environment.supabaseAnonKey
    );
    
    // 🔑 Listen to auth changes
    this.supabase.auth.onAuthStateChange((_event, session) => {
      this._session.next(session);
    });
    this.initializeSession(); //Because Supabase stores login session in local storage.
  }

  private async initializeSession() {
  const { data } = await this.supabase.auth.getSession();
    if (data.session !== this._session.value) {
    this._session.next(data.session);
  }
  }

  //This allows other services to access the Supabase client.
  get client() {
    return this.supabase;
  }

  //Returns current login session.
  getSession() {
    return this.supabase.auth.getSession();
  }

  //creates new user
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
