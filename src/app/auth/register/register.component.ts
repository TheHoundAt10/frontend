import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { AuthServiceService } from '../auth-service.service';

@Component ( {
selector: 'app-register',
templateUrl: './register.component.html',
styleUrls: ['./register.component.css']
})

export class RegisterComponent implements OnInit {

  constructor(public authservice: AuthServiceService, private router: Router) { }

  option: string = this.router.url

  ngOnInit(): void {
  }  
  
  onSignup(signupform: NgForm){
  
  if (signupform.invalid){
  return;
  }

  if (this.option == '/register') {
    this.authservice.signup(signupform.value.enteredfirstname, 
      signupform.value.enteredsurname, 
      signupform.value.enteredusername, 
      signupform.value.entereduseremail,
      signupform.value.enteredpassword, 
      signupform.value.enteredcityofresidence)
  } 
  }
}
