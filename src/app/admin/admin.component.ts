import { Component, OnInit, TemplateRef, Input } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service';
import { Router, } from '@angular/router';
import { ArticlesService } from '../sevices/articles.service';
@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {
  constructor(
    public http: HttpClient,
    public configService: ConfigService,
    private router: Router,
    public articlesService : ArticlesService
  ) { }

  ngOnInit(){}
  
}
