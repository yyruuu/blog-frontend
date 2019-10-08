import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { ArticlesService } from '../sevices/articles.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service'

@Component({
  selector: 'app-article-detail',
  templateUrl: './article-detail.component.html',
  styleUrls: ['./article-detail.component.css']
})
export class ArticleDetailComponent implements OnInit {

  private article = {
    user: {
      username: "default_name"
    }
  };
  private newRouter = "";
  private id = null;
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private articlesService: ArticlesService,
    public http: HttpClient,
    public configService: ConfigService,
  ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(async params=>{
      this.id=params.get('id');
      this.newRouter = `/article/${this.id}/edit`;
      //发起get请求
      const res = await this.http.get(`${this.configService.path}/api/article/${this.id}`).toPromise();
      if (res["err"] === 0) {
        this.article = res["data"];
      }else {
        this.router.navigateByUrl('/not-found');
      }
    })
  }
}
