import { Component, OnInit } from '@angular/core';

import { ActivatedRoute, Router } from '@angular/router';
import { BlogService } from '../blog.service';

import { BlogHttpService } from '../blog-http.service';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Location } from '@angular/common';

@Component({
  selector: 'app-blog-view',
  templateUrl: './blog-view.component.html',
  styleUrls: ['./blog-view.component.css']
})
export class BlogViewComponent implements OnInit {

  constructor(private _route:ActivatedRoute,
    private router:Router,public blogHttpService: BlogHttpService,
    public toastr: ToastrManager, private location: Location) {
    console.log("blog-view const called");
   }
public currentBlog: any;
  ngOnInit() {
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    this.currentBlog = this.blogHttpService.getBlogId(myBlogId).subscribe(

      data => {
        this.currentBlog = data['data'];
      },
      error => {
        console.log("error occured in blog view");
      }

    )


  }

  public deleteThisBlog(): any {
    this.blogHttpService.deleteBlog(this.currentBlog.blogId).subscribe(

      data => {
        this.toastr.successToastr("blog Deleted Successfully", 'DELETED!!!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000)
      },
      error => {
        this.toastr.errorToastr("Some problem occurred");
      }
    )
  }
  public goBack(): any {
    this.location.back();
  }
  

}
