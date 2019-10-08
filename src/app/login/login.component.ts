import { Component, OnInit } from '@angular/core';
import { LoginService } from '../sevices/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private username: string;
  private password: string;
  private isSuccess = true;
  private isFail = true;
  constructor(
    private loginService: LoginService,
    private router: Router,
  ) { }

  async ngOnInit() {
  }

  login() {
    const data = {
      username: this.username,
      password: this.password,
    }
    this.loginService.userLogin(data)
      .subscribe(res => {
        console.log("res", res);
        if (res["err"] === 0) {
          //登陆成功
          this.isFail = false;
          this.loginService.isLogin = true;
          this.loginService.userInfo = res["data"];
          window.localStorage.setItem('userId', res["data"]["id"]);
          //跳转到首页
          setTimeout(() => {
            this.router.navigateByUrl('/');
          }, 2000)
        }
      });
  }
}
