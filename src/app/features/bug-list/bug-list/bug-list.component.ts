import {Component, OnInit, ViewChild} from '@angular/core';
import {Bug, BugService} from '../../../core/bug.service';
import {MatSort, MatTableDataSource} from '@angular/material';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'priority', 'reporter', 'createdAt'];
  constructor(private bugService: BugService) { }
  buglist: MatTableDataSource<Bug>;
  @ViewChild(MatSort, {static: true}) sort: MatSort;
  ngOnInit() {
    this.bugService.getAll().subscribe(response => {
      this.buglist = new MatTableDataSource(response);
      this.buglist.sort = this.sort;
    });
  }

}
