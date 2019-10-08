import { Component, OnInit } from '@angular/core';
import { LoginService } from '../sevices/login.service';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service'
import { ElMessageService } from 'element-angular'

@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrls: ['./nav-bar.component.css']
})
export class NavBarComponent implements OnInit {

  constructor(
    public loginService: LoginService,
    public http: HttpClient,
    public configService: ConfigService,
    private message: ElMessageService,
  ) { }

  ngOnInit() {
    console.log("lg:", this.loginService.isLogin);
    console.log("lg:", this.loginService.userInfo);

  }

  async signout() {
    window.localStorage.clear();
    const res = await this.http.get(`${this.configService.path}/api/users/signout`, { "withCredentials": true }).toPromise();
    if (res["err"] === 0) {
      this.loginService.isLogin = false;
      this.loginService.userInfo = {};
      console.log(res);
    }
  }
  handle(type: string): void {
    if (!window.localStorage.getItem('userId')) {
      this.message[type]('对不起，您没有这个权限！');
    }
  }
}
