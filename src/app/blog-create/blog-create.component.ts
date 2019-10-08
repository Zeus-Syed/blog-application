import { Component, OnInit } from '@angular/core';
import { BlogHttpService } from '../blog-http.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrManager} from 'ng6-toastr-notifications';

@Component({
  selector: 'app-blog-create',
  templateUrl: './blog-create.component.html',
  styleUrls: ['./blog-create.component.css']
})
export class BlogCreateComponent implements OnInit {

  constructor(private blogHttpService:BlogHttpService, 
    public _route:ActivatedRoute, public router:Router,
    private toastr: ToastrManager) {
    
  }
  public blogTitle:string;
public blogBodyHtml:string;
public blogDescription:string;
public blogCategory:string;
public poscategory = ["comedy","Action","Romance","thriller"];
  
public createBlog():any{
 let blogData = {
   title:this.blogTitle,
  blogBody:this.blogBodyHtml,
  description:this.blogDescription,
  category:this.blogCategory
 }
 
 this.blogHttpService.createBlog(blogData).subscribe(
   
   data=> {
     console.log("blog cretaetd succe");
     console.log(data);
     this.toastr.successToastr("BLOG CREATED SUCCESSFULLY",'Success!!');
     setTimeout(()=>{
      this.router.navigate(['/blog',data.data.blogId]);
     },1000)
     
   }  ,
   error =>{
     console.log('err in cret');
     this.toastr.errorToastr("Error occurred");
   }
 )
}
  ngOnInit() {

  }

}
