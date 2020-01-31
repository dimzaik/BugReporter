import {Component, OnInit, ViewChild} from '@angular/core';
import {Bug, BugService} from '../../../core/bug.service';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent} from '@angular/material';
import {Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'priority', 'reporter', 'createdAt', 'updatedAt','actions'];

  constructor(private bugService: BugService, private router: Router) { }

  buglist: MatTableDataSource<Bug>;
  headers: string[];
  pageNumber: number;
  pageEvent: PageEvent;
  datasource: null;
  pageIndex:number;
  pageSize:number;
  length:number;


  applyFilter(filterValue: string) {
    this.buglist.filter = filterValue.trim().toLowerCase();
  }

  getRecordForEdit(bugId: string) {
    this.router.navigate(['/editBug', bugId]);
  }

  getServerData(event: PageEvent){
      return this.bugService.getAll('',event.pageIndex.toString(),event.pageSize.toString(),'','','','').pipe(
        tap((response: any) => {
          // this.buglist = new MatTableDataSource(response);
          const bug: any = response.body;
          debugger;
          const keys = response.headers.keys();
          this.buglist = new MatTableDataSource(bug);
          this.headers = keys.map(key =>
            `${key}: ${response.headers.get(key)}`);
          this.buglist.sort = this.sort;
          this.buglist.paginator = this.paginator;
        })
      );
  }

  deleteBug(bugId: string,event: MouseEvent){
    event.stopPropagation();
    this.bugService.deleteBug(bugId).pipe(
      switchMap(() => this.getAllBugs())
    ).subscribe();
  }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  ngOnInit() {
    this.pageNumber=0;
    this.getAllBugs().subscribe();
  }

  private getAllBugs() {
    /*return this.bugService.getAllWithoutParams().pipe(
      tap((response) => {
        // this.buglist = new MatTableDataSource(response);
        const bug: any = response.body;
        const keys = response.headers.keys();
        this.buglist = new MatTableDataSource(bug);
        this.headers = keys.map(key =>
          `${key}: ${response.headers.get(key)}`);
        this.buglist.sort = this.sort;
        this.buglist.paginator = this.paginator;
      })
    );*/
    return this.bugService.getAll('','','','','','','').pipe(
      tap((response: any) => {
        // this.buglist = new MatTableDataSource(response);
        const bug: any = response.body;
        const keys = response.headers.keys();
        this.buglist = new MatTableDataSource(bug);
        this.headers = keys.map(key =>
          `${key}: ${response.headers.get(key)}`);
        this.buglist.sort = this.sort;
        this.buglist.paginator = this.paginator;
      })
    );
  }

}
