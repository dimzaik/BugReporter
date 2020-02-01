import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {Bug, BugService} from '../../../core/bug.service';
import {MatPaginator, MatSort, MatTableDataSource, PageEvent, Sort} from '@angular/material';
import {Router} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';

@Component({
  selector: 'app-bug-list',
  templateUrl: './bug-list.component.html',
  styleUrls: ['./bug-list.component.scss']
})
export class BugListComponent implements OnInit {
  displayedColumns: string[] = ['title', 'status', 'priority', 'reporter', 'createdAt', 'updatedAt','actions'];

  @Input() dataLength: number; // TODO : issue#12 correct totalFeatures
  @Input() dataPageIndex: number; // Which index is the current for the data paginator
  @Input() dataPageSize: number = 5; // Size of paginator page data
  @Input() pageSizeOptions: number[] = [5, 10, 25, 100]; // Size of paginator page data

  @Output() pageChange: EventEmitter<PageEvent> = new EventEmitter();

  constructor(private bugService: BugService, private router: Router) { }

  @ViewChild(MatSort, {static: true}) sort: MatSort;
  @ViewChild(MatPaginator, {static: true}) paginator: MatPaginator;

  form: FormGroup;
  priority = [{value: 1, display: 'Minor'}, {value: 2, display: 'Major'}, {value: 3, display: 'Critical'}];
  buglist: MatTableDataSource<Bug>;
  headers: string[];
  pageIndex: string;
  pageSize: string;
  tableSort: string;
  filterValues:{
    title: string;
    priority: string;
    reporter: string;
    status: string;
  };

  ngOnInit() {
    this.createFilterForm();
    this.tableSort='';
    this.filterValues =this.form.value;
    this.getAllBugs(this.tableSort,'',this.dataPageSize.toString(),'','','','').subscribe();
  }

  applyFilter(form: FormGroup) {
    this.filterValues = form.value;
    return this.getAllBugs(this.tableSort,'','5',this.filterValues.title,this.filterValues.priority,this.filterValues.reporter,this.filterValues.status).subscribe();
  }

  clearFilter(){
    this.createFilterForm();
    this.filterValues = this.form.value;
    this.getAllBugs(this.tableSort,'',this.dataPageSize.toString(),'','','','').subscribe();
  }

  private createFilterForm() {
    this.form = new FormGroup({
      title: new FormControl('',),
      priority: new FormControl(''),
      reporter: new FormControl(''),
      status: new FormControl('')
    });
  }

  getRecordForEdit(bugId: string) {
    this.router.navigate(['/editBug', bugId]);
  }

  sortData(event: Sort){
    if (event.direction=="") {
      this.tableSort='';
    }else{
      this.tableSort = event.active + ',' + event.direction;
    }
    return this.getAllBugs(this.tableSort, this.pageIndex,this.pageSize,this.filterValues.title,this.filterValues.priority,this.filterValues.reporter,this.filterValues.status).subscribe();
  }

  getServerData(event: PageEvent){
    this.pageIndex =event.pageIndex.toString();
    this.pageSize =event.pageSize.toString();
    return this.getAllBugs(this.tableSort, this.pageIndex,this.pageSize,this.filterValues.title,this.filterValues.priority,this.filterValues.reporter,this.filterValues.status).subscribe();
  }

  deleteBug(bugId: string,event: MouseEvent){
    event.stopPropagation();
    this.bugService.deleteBug(bugId).pipe(
      switchMap(() => this.getAllBugs('','','','','','',''))
    ).subscribe();
  }

  private getAllBugs(sort: string, page: string,size: string,title: string,priority: string,reporter: string,status: string) {
    return this.bugService.getAll(sort,page,size,title,priority,reporter,status).pipe(
      tap((response: any) => {
        const bug: any = response.body;
        this.buglist = new MatTableDataSource(bug);
        const keys = response.headers.keys();
        this.headers = keys.map(key =>
          response.headers.get(key));
        this.dataLength = +this.headers[5];
        //this.buglist.sort = this.sort;
      })
    );
  }

}
