import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MainService } from "./main.service";

@Injectable()
export class StudentService extends MainService {
  endpoint: string;

  constructor(
    http: HttpClient) {
        super(http);
        this.endpoint = 'api/students';
    }

  add(payload: any) {
    return this.post(`${this.endpoint}`, payload).pipe();
  }

  update(id: string, payload: any) {
    return this.put(`${this.endpoint}/${id}`, payload).pipe();
  }

  getById(id: string) {
    return this.get(`${this.endpoint}/${id}`).pipe();
  }

  getList() {
    return this.get(`${this.endpoint}`).pipe();
  }

  deleteById(id: string) {
    return this.delete(`${this.endpoint}/${id}`).pipe();
  }
}

