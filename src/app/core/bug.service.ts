import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';

export interface Bug {
  title: string;
  priority: number;
  reporter: string;
  createdAt: any;
  status: string;
}
@Injectable({
  providedIn: 'root'
})
export class BugService {
  private readonly getAllUrl = 'https://bug-report-system-server.herokuapp.com/bugs';

  constructor(private http: HttpClient) { }
  getAll(): Observable<Bug[]> {
    return this.http.get<Bug[]>(this.getAllUrl);
  }
}
