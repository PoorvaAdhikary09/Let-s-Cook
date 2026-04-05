import { Injectable } from '@angular/core';
import users from '../../../assets/users/users.json';
import { BehaviorSubject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class AuthService {

  private userList: any[] = users;

  private authState = new BehaviorSubject<boolean>(this.getCurrentUser());
  authState$ = this.authState.asObservable();

  //SIGNUP handled in signup-form.component.
  async signup(name: string, email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const userExists = users.find((u: any) => u.email === email);

    if (userExists) {
      return {
        data: null,
        error: { message: 'User already exists' }
      };
    }

    const newUser = { name, email, password };

    users.push(newUser);
    localStorage.setItem('users', JSON.stringify(users));

    return {
      data: newUser,
      error: null
    };
 }

  //LOGIN handled in login-form.component. 
   async login(email: string, password: string) {
    const users = JSON.parse(localStorage.getItem('users') || '[]');

    const user = users.find(
      (u: any) => u.email === email && u.password === password
    );

    if (!user) {
      return {
        data: null,
        error: { message: 'Invalid credentials' }
      };
    }

    
    // store session
    localStorage.setItem('currentUser', JSON.stringify(user));
    
    this.authState.next(true);
    return {
      data: user,
      error: null
    };
}

  getCurrentUser() {
    const user = localStorage.getItem('currentUser');
    return user ? JSON.parse(user) : null;
  }

  logout() {
    localStorage.removeItem('currentUser');
    this.authState.next(false);
  }

  isLoggedIn() {
    return !!localStorage.getItem('currentUser');
  }
}
