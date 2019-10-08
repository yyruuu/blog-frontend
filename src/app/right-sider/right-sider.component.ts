import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service';
import { ArticlesService } from '../sevices/articles.service';
@Component({
  selector: 'app-right-sider',
  templateUrl: './right-sider.component.html',
  styleUrls: ['./right-sider.component.css']
})
export class RightSiderComponent implements OnInit {
  public lastestArticles = [];
  public achieves = [];
  public tags = [];
  constructor(
    public http: HttpClient,
    public configService: ConfigService,
    public articlesService: ArticlesService
  ) { }

  async ngOnInit() {
    const res = await this.http.get(`${this.configService.path}/api/lastest-article`).toPromise();
    console.log("res", res);
    if (res["err"] === 0) {
      this.lastestArticles = res["data"];
    }
    console.log(this.lastestArticles);

    const achievesRes = await this.http.get(`${this.configService.path}/api/achieves`).toPromise();
    if (achievesRes["err"] === 0) {
      this.achieves = achievesRes["data"];
    }

    const tagsRes = await this.http.get(`${this.configService.path}/api/tag`, { "withCredentials": true }).toPromise();
    if(tagsRes["err"] === 0) {
      this.tags = tagsRes["data"];
    }
  }

  articleFilter(date) {
    let { year, month } = date;
    this.articlesService.filter = {
        endDate: `${year}-${+month + 1}-1`,
        startDate: `${year}-${+month}-1`
    }
    this.articlesService.articles = [];
    this.articlesService.getArticles(true);
  }

  getArticlesByTag(tag) {
    this.articlesService.articles = [];
    this.articlesService.getArticlesByTag(tag.id);
  }
}
