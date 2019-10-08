import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ArticleEditorComponent } from '../article-editor/article-editor.component';
import { Router, } from '@angular/router';
import { Location } from '@angular/common';
import { ArticlesService } from '../sevices/articles.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  private currId = null;
  private articles = [];
  private pageNation = {
    pageSize: 10
  };
  modalRef: BsModalRef;
  currentPage = 0;
  page = 1;
  sortBy = {
    name: "id",
    type: "desc"
  }
  constructor(
    public http: HttpClient,
    public configService: ConfigService,
    private modalService: BsModalService,
    private router: Router,
    public location: Location,
    public articlesService : ArticlesService
  ) { }

  editModal(template: TemplateRef<any>, id) {
    this.currId = id;
    this.modalRef = this.modalService.show(template);
  }

  deleteModal(template: TemplateRef<any>, id) {
    this.currId = id;
    this.modalRef = this.modalService.show(template);
  }

  async ngOnInit() {
    //这里只能加载10篇，需要添加一个“查看更多按钮”
    await this.getArticles();
    // await this.articlesService.getArticles();
    // this.articles = this.articlesService.articles;
    console.log(this.articles);
  }
  async refresh() {
    this.modalRef.hide();
    await this.getArticles();
  }

  async getArticles() {
    const res = await this.http.get(`${this.configService.path}/api/article?offset=${(this.page-1)*this.pageNation["pageSize"]}&pageSize=${this.pageNation["pageSize"]}&sort=${JSON.stringify([this.sortBy.name, this.sortBy.type])}`).toPromise();
    console.log(res);
    if (res["err"] === 0) {
      this.articles = res["data"];
      this.pageNation = res["pageNation"];
    }
  }

  async deleteArticle() {
    const res = await this.http.delete(`${this.configService.path}/api/article/${this.currId}`).toPromise();
    if (res["err"] === 0) {
      //文章删除成功
      console.log("文章删除成功");
      this.modalRef.hide();
      await this.getArticles();
    }
  }

  
  async pageChanged(event: any) {
    this.page = event.page;
    await this.getArticles();
  }

  async sort(name, $event: any){
    $event.stopPropagation();
    this.sortBy.name = name;
    console.log(this.sortBy);
    await this.getArticles();
  }
}
