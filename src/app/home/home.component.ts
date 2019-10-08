import { NgModule } from '@angular/core';
import { Component, OnInit } from '@angular/core';
import { LeftSiderComponent } from '../left-sider/left-sider.component';
import { RightSiderComponent } from '../right-sider/right-sider.component';
import { ArticlesComponent } from '../articles/articles.component';
import { ArticleDetailComponent } from '../article-detail/article-detail.component';
import { Routes, RouterModule } from '@angular/router';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

@NgModule({
  declarations: [
    LeftSiderComponent,
    RightSiderComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    HomeComponent
  ],
  imports: [],
})
export class HomeComponent implements OnInit {


  constructor() { }

  ngOnInit() {
  }

}
