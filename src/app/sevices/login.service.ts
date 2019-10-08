import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service'
import { Observable } from 'rxjs';

interface UserRegisterInfo {
  err?: number,
  username?: string,
  password?: string,
  email?: string
}

@Injectable({
  providedIn: 'root'
})

export class LoginService {
  public isLogin = false;
  public userInfo = {};
  constructor(
    public http: HttpClient,
    public configService: ConfigService
  ) { }

  userRegister(data): Observable<UserRegisterInfo> {
    const res: any = this.http.post(`${this.configService.path}/api/users/register`, { ...data }, { withCredentials: true });
    return res;
  }

  userLogin(data): Observable<{ username: string, password: string }> {
    const res: any = this.http.post(`${this.configService.path}/api/users/login`, { ...data }, { withCredentials: true });
    return res;
  }

  async checkLogin() {
    let res = await this.http.get(`${this.configService.path}/api/users/login`, { withCredentials: true }).toPromise();
    if (res["err"] === 0) {
      this.isLogin = true;
      this.userInfo = res["data"];
      window.localStorage.setItem('userId', this.userInfo["id"]);
    } else {
      this.isLogin = false;
    }
  }
}
