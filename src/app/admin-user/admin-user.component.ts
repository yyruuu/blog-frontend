import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-user',
  templateUrl: './admin-user.component.html',
  styleUrls: ['./admin-user.component.css']
})
export class AdminUserComponent implements OnInit {
  public users = [];
  public user = {
    id: null,
    username: "",
    email: ""
  }
  modalRef: BsModalRef;

  constructor(
    public http: HttpClient,
    public configService: ConfigService,
    private modalService: BsModalService,

  ) { }

  async ngOnInit() {
    await this.getUsers();
  }
  async getUsers() {
    const res = await this.http.get(`${this.configService.path}/api/users`).toPromise();
    if (res["err"] === 0) {
      this.users = res["data"];
    }
  }

  async editModal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    await this.getUser(id);
  }

  async deleteModal(template: TemplateRef<any>, id) {
    await this.getUser(id);
    this.modalRef = this.modalService.show(template);
  }

  async deleteUser() {
    const res = await this.http.delete(`${this.configService.path}/api/users/${this.user.id}`, { "withCredentials": true }).toPromise();
    console.log(res);
    if (res["err"] === 0) {
      await this.getUsers();
      this.modalRef.hide();
    }
  }

  async getUser(id) {
    const res = await this.http.get(`${this.configService.path}/api/users/${id}`, { "withCredentials": true }).toPromise();
    if (res["err"] === 0) {
      this.user = res["data"];
    }
  }

  async saveUserInfo() {
    const data = {
      username: this.user.username,
      email: this.user.email
    }
    const res = await this.http.put(`${this.configService.path}/api/users/${this.user.id}`, data, { "withCredentials": true }).toPromise();
    console.log(res);
    if (res["err"] === 0) {
      //用户信息保存成功
      await this.getUsers();
      this.modalRef.hide();
    }
  }

}
