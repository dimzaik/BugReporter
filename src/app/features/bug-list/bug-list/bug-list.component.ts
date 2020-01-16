import { Component, OnInit } from '@angular/core';
import {Bug, BugService} from '../../../core/bug.service';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit {

  constructor(private bugService: BugService) { }
  buglist: Bug[];
  ngOnInit() {
    this.bugService.getAll().subscribe(response => {
      this.buglist = response;
    });
  }

}
