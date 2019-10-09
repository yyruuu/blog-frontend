import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { ModalModule } from 'ngx-bootstrap/modal';
import { PaginationModule } from 'ngx-bootstrap/pagination';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { RegisterComponent } from './register/register.component';
import { NavBarComponent } from './nav-bar/nav-bar.component';
import { LeftSiderComponent } from './left-sider/left-sider.component';
import { RightSiderComponent } from './right-sider/right-sider.component';
import { ArticlesComponent } from './articles/articles.component';
import { ArticleDetailComponent } from './article-detail/article-detail.component';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
import { ArticleEditorComponent } from './article-editor/article-editor.component';
import { QuillModule } from 'ngx-quill';
import { AdminComponent } from './admin/admin.component';
import { NotFoundComponent } from './not-found/not-found.component'
import { LoginGuardGuard } from './auth/login-guard.guard';
import { ElModule } from 'element-angular'
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AdminArticleComponent } from './admin-article/admin-article.component';
import { AdminTagComponent } from './admin-tag/admin-tag.component';
import { AdminUserComponent } from './admin-user/admin-user.component';
import { AdminPermissionComponent } from './admin-permission/admin-permission.component';
import { AdminNavComponent } from './admin-nav/admin-nav.component';

const appRoutes: Routes = [
  {
    path: '',
    component: HomeComponent,
    children: [
      {
        path: '',
        component: ArticlesComponent
      },
      {
        path: 'add',
        component: ArticleEditorComponent
      },
      {
        path: 'article/:id',
        component: ArticleDetailComponent
        
      },
      {
        path: 'article/:id/edit',
        component: ArticleEditorComponent
      },
      {
        path: 'achieves',
        component: ArticlesComponent
      },
      {
        path: 'tag/:id',
        component: ArticlesComponent
      }
    ]
  },
  {
    path: 'register',
    component: RegisterComponent
  },
  {
    path: 'login',
    component: LoginComponent
  },
  {
    path: 'admin',
    canActivate: [LoginGuardGuard],
    component: AdminComponent,
    children: [
      {
        path: '',
        redirectTo: 'article',
        pathMatch: 'full'
      },
      {
        path: 'article', 
        component: AdminArticleComponent
      },
      {
        path: 'tag',
        component: AdminTagComponent
      },
      {
        path: 'user',
        component: AdminUserComponent
      },
      {
        path: 'peimission',
        component: AdminPermissionComponent
      }
    ]
  },
  {
    path: 'not-fonud',
    component: NotFoundComponent
  }
]

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    NavBarComponent,
    LeftSiderComponent,
    RightSiderComponent,
    ArticlesComponent,
    ArticleDetailComponent,
    HomeComponent,
    LoginComponent,
    ArticleEditorComponent,
    AdminComponent,
    NotFoundComponent,
    AdminArticleComponent,
    AdminTagComponent,
    AdminUserComponent,
    AdminPermissionComponent,
    AdminNavComponent
  ],
  imports: [
    RouterModule.forRoot(
      appRoutes,
      // { enableTracing: true } // <-- debugging purposes only
    ),
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    FormsModule,
    QuillModule.forRoot(),
    TooltipModule.forRoot(),
    ModalModule.forRoot(),
    PaginationModule.forRoot(),
    BsDropdownModule.forRoot(),
    InfiniteScrollModule,
    ElModule.forRoot(),
    BrowserAnimationsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
