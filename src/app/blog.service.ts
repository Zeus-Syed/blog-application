import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class BlogService {


  public allBlogs = [
    {
      "blogId": "1",
      "lastModified": "2017-10-20T12:20:47.8542",
      "created": "2017-10-20T12:20:47.8542",
      "tags": ["HI", "THIS", "IS"],
      "author": "Admin",
      "category": "Comedy",
      "isPublished": true,
      "views": 0,
      "bodyHtml": "this is blog body",
      "description": "this is blog 1 description",
      "title": "This is blog 1"
    },
    {
      "blogId": "2",
      "lastModified": "2018-12-20T12:20:48.8542",
      "created": "2018-08-20T12:20:47.8542",
      "tags": ["tag 1", "tag 2", "tag 3"],
      "author": "Admin",
      "category": "Comedy",
      "isPublished": true,
      "views": 0,
      "bodyHtml": "<h2>this is blog no 2 body</h2>",
      "description": "this is blog 2 description which is very essential",
      "title": "This is blog 2"
    },
    {
      "blogId": "3",
      "lastModified": "2018-07-20T12:20:48.8542",
      "created": "2019-07-20T12:20:47.8542",
      "tags": ["crossed", "half", "sea"],
      "author": "Admin",
      "category": "Comedy",
      "isPublished": true,
      "views": 0,
      "bodyHtml": "<h2>this is blog no 3 body</h2>",
      "description": "this is blog 3 description which is very very very essential",
      "title": "This is blog 3"
    }
  ]
  constructor() { 
     console.log("service const called");
  }
public currentBlog:any;
  public getAllBlogs():any{
       return this.allBlogs;
  }
public getBlogId(currentBlogId: string){
    for(let blog of this.allBlogs){
      if(currentBlogId == blog.blogId){
          this.currentBlog = blog;
      }
    }
    console.log(this.currentBlog);
    return this.currentBlog;
}


}
