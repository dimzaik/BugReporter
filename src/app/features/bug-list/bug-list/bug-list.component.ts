import {Component, OnInit, ViewChild} from '@angular/core';
import {Bug, BugService} from '../../../core/bug.service';
import {MatPaginator, MatSort, MatTableDataSource} from '@angular/material';
import {Router} from '@angular/router';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'priority', 'reporter', 'createdAt', 'updatedAt'];
  constructor(private bugService: BugService, private router: Router) { }
  buglist: MatTableDataSource<Bug>;
  applyFilter(filterValue: string) {
    this.buglist.filter = filterValue.trim().toLowerCase();
  }
  getRecordForEdit(bugId: string) {
    this.router.navigate(['/editBug', bugId]);
  }
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;
  ngOnInit() {
    this.bugService.getAll().subscribe(response => {
      this.buglist = new MatTableDataSource(response);
      this.buglist.sort = this.sort;
      this.buglist.paginator = this.paginator;
    });
  }

}
