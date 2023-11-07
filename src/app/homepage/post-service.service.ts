import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http'
import { Subject } from 'rxjs'

@Injectable({
  providedIn: 'root'
})
export class PostServiceService {
  private postsdisplay:{_id:string, department:string, complaint:string, __v:string}[] = [];
  private updatedpostsdisplay = new Subject<{_id:string, department:string, complaint:string, __v:string}[]>();

  constructor(private http: HttpClient) { }

  addpost_service(pdepartment:string, pcomplaint:string){
    this.http.post<{message:string,post:any}>('https://localhost:3000/api/bulletinpost',{department:pdepartment,complaint:pcomplaint})
    .subscribe((response)=>{
      console.log(response)
    })
  }

  getpost_service() {
    this.http.get<{ message: string, bulletinpost: any[] }>('https://localhost:3000/api/bulletinpost')
        .subscribe((thepost) => {
            if (Array.isArray(thepost.bulletinpost)) {
                //updates posts
                this.postsdisplay = thepost.bulletinpost;
                this.updatedpostsdisplay.next([...this.postsdisplay]);
            } else {
                console.error('Bulletinpost is not an array:', thepost.bulletinpost);
            }
        })
}


  deletepost_service(postid: string){
    this.http.delete('https://localhost:3000/api/bulletinpost/' + postid)
    .subscribe(()=>
    {
      const updatedpostsdeleted = this.postsdisplay.filter(post=>post._id!==postid);
      this.postsdisplay= updatedpostsdeleted;
      this.updatedpostsdisplay.next([...this.postsdisplay]);
    })
  }

  getUpdateListener()
  {
    return this.updatedpostsdisplay.asObservable();
  }
}
