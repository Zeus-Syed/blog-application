import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { BlogHttpService } from '../blog-http.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-blog-edit',
  templateUrl: './blog-edit.component.html',
  styleUrls: ['./blog-edit.component.css']
})
export class BlogEditComponent implements OnInit {
  public currentBlog;
  public poscategory = ["comedy", "Action", "Romance", "thriller"];
  constructor(private _route: ActivatedRoute,
    private router: Router, public blogHttpService: BlogHttpService,
    public toastr: ToastrManager) { }

  ngOnInit() {
    let myBlogId = this._route.snapshot.paramMap.get('blogId');
    console.log(myBlogId);
    this.currentBlog = this.blogHttpService.getBlogId(myBlogId).subscribe(

      data => {
        this.currentBlog = data['data'];
        console.log(this.currentBlog);
      },
      error => {
        console.log("error occured in blog view");
      }

    )
  }

  public editThisBlog(): any {
    this.blogHttpService.editBlog(this.currentBlog.blogId, this.currentBlog).subscribe(
      data => {
        this.toastr.successToastr("Blog edited Successfully!!!", 'Success!!!');
        setTimeout(() => {
          this.router.navigate(['/home']);
        }, 1000)


      },
      error => {
        this.toastr.errorToastr("some issue in editing!!");
      }

    )

  }
}
