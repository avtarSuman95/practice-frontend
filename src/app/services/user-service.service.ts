import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import User from '../types/user';

@Injectable({
  providedIn: 'root',
})
export class UserServiceService {
  constructor(public httpClient: HttpClient) {}
  apiUrl = 'http://localhost:4000';

  getUsers() {
    return this.httpClient.get<User[]>(this.apiUrl + '/usersDetails');
  }

  addUser(model: User) {
    return this.httpClient.post(this.apiUrl + '/usersDetails', model);
  }

  getUserById(id: string) {
    return this.httpClient.get<User>(this.apiUrl + '/usersDetails/' + id);
  }

  updateUser(id: string, model: User) {
    return this.httpClient.put(this.apiUrl + '/usersDetails/' + id, model);
  }

  deleteUser(id: string) {
    return this.httpClient.delete(this.apiUrl + '/usersDetails/' + id);
  }
}
