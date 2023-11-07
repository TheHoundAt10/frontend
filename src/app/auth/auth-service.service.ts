import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UrlHandlingStrategy } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

  private token!: string;

  constructor(private http: HttpClient) { }

  signup (userfirstname:string, usersurname: string, userusername: string, useremail: string, userpassword: string, usercityofresidence: string)
  {
    this.http.post('https://localhost:3000/api/user/signup', {firstname:userfirstname, surname:usersurname, username:userusername, email:useremail, password: userpassword, cityofresidence:usercityofresidence})
    .subscribe(response=>{
    })
  }

  login (userusername:string, userpassword:string){
    this.http.post<{token: string}>('https://localhost:3000/api/user/login',{username:userusername, password:userpassword})
    .subscribe(response=>{
      const token = response.token;
      localStorage.setItem('token', token)
    });
  }

  getToken() {
    return localStorage.getItem('token');
  }
}
