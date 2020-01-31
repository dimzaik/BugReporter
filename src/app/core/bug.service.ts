import { Injectable } from '@angular/core';
import {HttpClient, HttpResponse} from '@angular/common/http';
import {Observable} from 'rxjs';
import { Config } from 'protractor';

export interface Bug {
  id: string;
  title: string;
  description: string;
  priority: number;
  reporter: string;
  updatedAt: Date;
  createdAt: Date;
  status: string;
  comments: any[];
}
@Injectable({
  providedIn: 'root'
})
export class BugService {
  private readonly endpoint = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }
  getAll() {
    return this.http.get(
      this.endpoint, { observe: 'response' });
  }

  pushBug(bug: Bug): Observable<Bug> {
    return this.http.post<Bug>(this.endpoint, bug);
  }

  updateBug(id: string, bug: Bug): Observable<Bug> {
    return this.http.put<Bug>(`${this.endpoint}/${id}`, bug);
  }

  getBugById(id: string): Observable<Bug> {
    return this.http.get<Bug>(`${this.endpoint}/${id}`);
  }

  deleteBug(id: string){
    return this.http.delete(`${this.endpoint}/${id}`);
  }
}
