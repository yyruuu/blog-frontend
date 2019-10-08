import { Component } from '@angular/core';
import { LoginService } from '../app/sevices/login.service'
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'blog-frontend';
  constructor(
    public loginService : LoginService
  ){}
  async ngOnInit() {
    await this.loginService.checkLogin();
  }
}
