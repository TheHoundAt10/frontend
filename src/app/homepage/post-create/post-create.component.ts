import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-create',
  templateUrl: './post-create.component.html',
  styleUrls: ['./post-create.component.css']
})
export class PostCreateComponent implements OnInit{

  constructor(public postservice: PostServiceService) { }

  ngOnInit(): void{
  }

  onaddpost(postform: NgForm) {
    if (postform.invalid){
      alert('Invalid Input!')
      return
    }
    alert(postform.value.enteredDepartment+':'+postform.value.enteredComplaint)

    this.postservice.addpost_service(postform.value.enteredDepartment, postform.value.enteredComplaint)
    postform.resetForm()
  }

}
