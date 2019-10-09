import { Injectable } from '@angular/core';
import { ConfigService } from '../sevices/config.service';
import { HttpClient } from '@angular/common/http';

interface Article {
  err?: number,
  title?: string,
  target?: string,
  clickTimes?: string,
  content?: string,
  author?: number,
  time?: Date
}

@Injectable({
  providedIn: 'root'
})
export class ArticlesService {
  public filter = {};
  public articles = [];
  public pageNation = {
    pageSize: 10,
    total: 10,
    offset: 0,
    nextPage: 0
  }
  constructor(
    public configService: ConfigService,
    public http: HttpClient,

  ) { }

  async getArticles(isInitial = false) {
    if (isInitial) {
      this.pageNation = {
        pageSize: 10,
        total: 10,
        offset: 0,
        nextPage: 0
      }
    }else {
      this.filter = null;
    }
    if (this.pageNation.nextPage !== null) {
      const res = await this.http.get(`${this.configService.path}/api/article?offset=${this.pageNation.nextPage}&pageSize=${this.pageNation.pageSize}&filter=${JSON.stringify(this.filter)}`).toPromise();
      if (res["err"] === 0) {
        //请求成功
        this.articles = [...this.articles, ...res["data"]];
        this.pageNation = res["pageNation"];
      }
    }
  }

  async getArticlesByTag(tagId){
    const res = await this.http.get(`${this.configService.path}/api/tag/article/${tagId}`).toPromise();
    if(res["err"] === 0) {
      this.articles = res["data"];
    }
  }
}
