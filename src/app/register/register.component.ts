import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service'
import { LoginService } from '../sevices/login.service'
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  private username : string;
  private password : string;
  private email : string;
  private isSuccess = true;
  constructor(
    public http: HttpClient,
    public configService: ConfigService,
    public loginService : LoginService,
    private router: Router,

  ) { }

  ngOnInit() {
    
  }

   register(){
    const data = {
      username: this.username,
      password: this.password,
      email: this.email
    }
    this.loginService.userRegister(data)
    .subscribe(res => {
      console.log("res", res);
      if(res.err === 0) {
        //注册成功、弹框、跳转到登陆界面
        this.isSuccess = false;
        setTimeout(()=>{
          this.router.navigateByUrl('/login')
        }, 2000)
      }
    });

  }



}
