import { Component, OnInit } from '@angular/core';
import { BlogService } from '../blog.service';
import { BlogHttpService } from '../blog-http.service';
import { Observable } from 'rxjs/Observable';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  public allBlogs;
  constructor(public blogHttpService:BlogHttpService) {
      console.log("home const callled");
   }

  ngOnInit() {

     this.allBlogs = this.blogHttpService.getAllBlogs().subscribe(
  data=>{
        this.allBlogs = data['data'];
        
  },
  error=>{
    console.log("some err");
  }

     );
    console.log(this.allBlogs);
  }

}
