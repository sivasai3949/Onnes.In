import { Component, OnInit } from '@angular/core';
import { FormService } from '../service/form.service';

@Component({
  selector: 'app-blog-news',
  templateUrl: './blog-news.component.html',
  styleUrls: ['./blog-news.component.css']
})
export class BlogNewsComponent implements OnInit{
  allBlogNewsData: any;

  constructor(public formService : FormService){
    
  }

  ngOnInit(): void {
    this.getBlogNews();
  }

  getBlogNews(){
    this.formService.getBlogNews().subscribe({
      next:(res)=>{
        this.allBlogNewsData = res;
      },
      error:(err)=>{
        console.log(err.message);
      }
    })
  }
}
