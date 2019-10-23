import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';


@Injectable({
  providedIn: 'root'
})
export class BlogHttpService {

  public currentBlog;
  public allBlogs;
  //public BaseUrl = 'https://blogapp.edwisor.com/api/v1/blogs';
  //public authToken = '?authToken=NmFmOGYxNzhiMjlmNmRkYTA5N2U1NDRkNTI2Mjk1ZDc0MDc2OTEwZTdjMzNjM2UxZDAxMWE3OTM4ZGZkYmE4ZjQ4Mjk0NzdhY2YzN2Q3NzU2N2RiNTI3OTBjMGExNDI3YjM2ZDI2ODZhMmI0YjBiZTUyY2FjNDliYTAxOGJmOThmOA==';
public BaseUrl = 'http://localhost:3000';

  constructor(private _http: HttpClient) {
    console.log("BHTTPS called");
  }

  private handleError(err: HttpErrorResponse) {
    console.log(err.message);
    return Observable.throw(err.message)
  }
  public getAllBlogs(): any {

   // let myResponse = this._http.get(this.BaseUrl + '/all' + this.authToken);
    let myResponse = this._http.get(this.BaseUrl + '/all');
    console.log(myResponse);
    return myResponse;
  }

  public getBlogId(currentBlogId: string): any {
    //this.currentBlog = this._http.get(this.BaseUrl + '/view/' + currentBlogId + this.authToken);
    this.currentBlog = this._http.get(this.BaseUrl + '/view/' + currentBlogId );
    console.log(this.currentBlog);
    return this.currentBlog;
  }

  public createBlog(blogData): any {
    //let myResponse = this._http.post(this.BaseUrl + '/create' + this.authToken, blogData);
    let myResponse = this._http.post(this.BaseUrl + '/create' , blogData);
    return myResponse;
  }
  public deleteBlog(blogId: string): any {
    let data = {};
    //let myResponse = this._http.post(this.BaseUrl + '/' + blogId + '/delete' + this.authToken, data);
    let myResponse = this._http.post(this.BaseUrl + '/' + blogId + '/delete' , data);
    return myResponse;
  }
  public editBlog(blogId: string, blogData: any): any {
    //let myResponse = this._http.put(this.BaseUrl + '/' + blogId + '/edit' + this.authToken, blogData);
    let myResponse = this._http.put(this.BaseUrl + '/' + blogId + '/edit' , blogData);
    return myResponse;
  }
}
