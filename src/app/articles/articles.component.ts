import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service'
import { ArticlesService } from '../sevices/articles.service'
import {Location} from '@angular/common';

@Component({
  selector: 'app-articles',
  templateUrl: './articles.component.html',
  styleUrls: ['./articles.component.css']
})
export class ArticlesComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public configService: ConfigService,
    public articlesService: ArticlesService,
    public location: Location
  ) { }

  async ngOnInit() {
    await this.onScroll();
  }

  async onScroll() {
    this.articlesService.getArticles();
    console.log("scroll");  
  }

}
