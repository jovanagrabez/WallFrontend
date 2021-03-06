import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Router} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient, private router: Router) { }


  register(user): any {
    return this.http.post('/api/users/register', user);

  } login(user): any {
    return this.http.post('/api/users/login', user);

  }
}
