import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { PostServiceService } from '../post-service.service';

@Component({
  selector: 'app-post-display',
  templateUrl: './post-display.component.html',
  styleUrls: ['./post-display.component.css']
})
export class PostDisplayComponent implements OnInit{
  posts:{_id:string,department:string,complaint:string, __v:string}[] = [];

  constructor(public postservice: PostServiceService) { }
  private postsubscription!: Subscription;

  ngOnInit(): void {
    this.postservice.getpost_service();
    this.postsubscription = this.postservice.getUpdateListener().subscribe(
      (posts: {_id: string, department: string, complaint: string, __v: string}[])=>{
        this.posts=posts;
      });
  }

  ngOnDestroy() {
    this.postsubscription.unsubscribe();
  }

  ondelete(postid: string) {
    this.postservice.deletepost_service(postid)
  }
  
}
