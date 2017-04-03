import { Injectable } from '@angular/core';

export class User {
  name: string;
}

@Injectable()
export class UserService {
  user: User;
  isLoggedIn: boolean;
}
