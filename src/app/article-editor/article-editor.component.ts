import { Component, OnInit, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

@Component({
  selector: 'app-article-editor',
  templateUrl: './article-editor.component.html',
  styleUrls: ['./article-editor.component.css']
})
export class ArticleEditorComponent implements OnInit {
  @Input() articleId: number;
  private title: string;
  private target: string;
  private content: string;
  private isFail = true;
  private isSuccess = true;
  private id = null;
  constructor(
    private http: HttpClient,
    private configService: ConfigService,
    private route: ActivatedRoute,
    private router: Router

  ) { }

  async ngOnInit() {
    // this.id = this.route.snapshot.paramMap.get('id');
    this.id = this.articleId;
    console.log("edit id:", this.id);
    if (this.id) {
      //id存在，当前为修改文章。
      //获取文章
      const res = await this.http.get(`${this.configService.path}/api/article/${this.id}`, { withCredentials: true }).toPromise();
      console.log("edit:", res);
      if (res["err"] === 0) {
        let data = res["data"];
        this.title = data.title;
        this.target = data.tags.map(i => i.name).join(",");
        this.content = data.content;
      }
    }
  }
  async postArticle() {
    const data = {
      title: this.title,
      target: this.target,
      content: this.content
    }
    if (this.id) {
      //修改文章
      const res = await this.http.put(`${this.configService.path}/api/article/${this.id}`, { ...data }, { withCredentials: true }).toPromise();
      console.log("put article:", res);
      if (res["err"] === 0){
        //修改成功，跳转到文章详情页面。
        this.isFail = false;
      }else{
        this.isSuccess = false;
      }
    } else {
      //发表文章
      const res = await this.http.post(`${this.configService.path}/api/article`, { ...data }, { withCredentials: true }).toPromise();
      if (res["err"] === 0) {
        this.isFail = false;
        this.title = "";
        this.target = "";
        this.content = "";
      } else {
        this.isSuccess = false;
      }
    }
  }
}
