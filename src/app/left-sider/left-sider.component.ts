import { Component, OnInit } from '@angular/core';
import { faCamera, faDove, faWifi, faLaptop, faDragon} from '@fortawesome/free-solid-svg-icons';
import { LoginService } from '../sevices/login.service'
@Component({
  selector: 'app-left-sider',
  templateUrl: './left-sider.component.html',
  styleUrls: ['./left-sider.component.css']
})
export class LeftSiderComponent implements OnInit {
  faCamera = faCamera;
  faDove = faDove;
  faWifi = faWifi;
  faLaptop = faLaptop;
  faDragon = faDragon;
  constructor(
    public loginService : LoginService
  ) { }

  ngOnInit() {
  }

}
