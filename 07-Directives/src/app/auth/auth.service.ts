import { Injectable, signal } from '@angular/core';

import { Permission } from './auth.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  activePermission = signal<Permission>('guest');

  authenticate(email: string, password: string) {
    console.log('authenticate', email, password);
    if (email === 'admin@example.com' && password === 'admin') {
      console.log("Setting to admin")
      this.activePermission.set('admin');
    } else if (email === 'user@example.com' && password === 'user') {
      console.log("Setting to user")
      this.activePermission.set('user');
    } else {
      console.log("Setting to guest")
      this.activePermission.set('guest');
    }
  }

  logout() {
    this.activePermission.set('guest');
  }
}
