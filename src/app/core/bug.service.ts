import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

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
  private readonly getAllUrl = 'https://bug-report-system-server.herokuapp.com/bugs';
  private readonly postUrl = 'https://bug-report-system-server.herokuapp.com/bugs';
  private readonly getBug = 'https://bug-report-system-server.herokuapp.com/bugs/';

  constructor(private http: HttpClient) { }
  getAll(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.getAllUrl);
  }

  pushBug(bug: Bug): Observable<Bug> {
    return this.http.post<Bug>(this.postUrl, bug);
  }

  getBugById(id: string): Observable<Bug> {
    return this.http.get<Bug>(this.getBug + id);
  }

}
