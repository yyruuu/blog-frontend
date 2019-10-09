import { Component, OnInit, TemplateRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ConfigService } from '../sevices/config.service';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';

@Component({
  selector: 'app-admin-tag',
  templateUrl: './admin-tag.component.html',
  styleUrls: ['./admin-tag.component.css']
})
export class AdminTagComponent implements OnInit {
  public tags = [];
  private tag = {
    id: null,
    name: "",
    desc: ""
  };
  modalRef: BsModalRef;
  constructor(
    public http: HttpClient,
    public configService: ConfigService,
    private modalService: BsModalService,

  ) { }

  async ngOnInit() {
    await this.getTags();
  }

  async getTags() {
    const tagsRes = await this.http.get(`${this.configService.path}/api/tag`, { "withCredentials": true }).toPromise();
    if (tagsRes["err"] === 0) {
      this.tags = tagsRes["data"];
    }
  }
  async editModal(template: TemplateRef<any>, id) {
    this.modalRef = this.modalService.show(template);
    if (id) {
      await this.getTag(id);
    } else {
      this.tag = {
        id: null,
        name: "",
        desc: ""
      }
    }
    console.log(this.tag);
  }

  async deleteModal(template: TemplateRef<any>, id) {
    await this.getTag(id);
    this.modalRef = this.modalService.show(template);
  }

  async deleteTag() {
    console.log(this.tag);
    const res = await this.http.delete(`${this.configService.path}/api/tag/${this.tag.id}`, { "withCredentials": true }).toPromise();
    console.log(res);
    if (res["err"] === 0) {
      await this.getTags();
      this.modalRef.hide();
    }
  }

  async getTag(id) {
    const res = await this.http.get(`${this.configService.path}/api/tag/${id}`, { "withCredentials": true }).toPromise();
    if (res["err"] === 0) {
      this.tag = res["data"];
    }
  }

  async saveTag() {
    console.log("tag", this.tag);
    const data = {
      name: this.tag.name,
      desc: this.tag.desc
    }
    if (this.tag.id) {
      const res = await this.http.put(`${this.configService.path}/api/tag/${this.tag.id}`, data, { "withCredentials": true }).toPromise();
      console.log(res);
      if (res["err"] === 0) {
        //标签保存成功
        await this.getTags();
        this.modalRef.hide();
      }
    } else {
      const res = await this.http.post(`${this.configService.path}/api/tag`, data, { "withCredentials": true }).toPromise();
      console.log(res);
      if (res["err"] === 0) {
        //标签保存成功
        await this.getTags();
        this.modalRef.hide();
      }
    }
  }

  async addTag(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
}
