import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bug, BugService} from '../../../core/bug.service';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {

  form: FormGroup;
  reporters = ['QA', 'PO', 'R3'];
  statuses = ['Ready for test', 'Done', 'S3'];
  priorities = ['1', '2', '3'];
  constructor(private bugService: BugService) { }
  public bug: Bug;
  ngOnInit() {
    this.form = new FormGroup({
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, Validators.required),
      priorities: new FormControl(null, Validators.required),
      reporter: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required),
    });
  }

  formSubmit(form: FormGroup) {
    this.bug = form.value;
    this.bug.createdAt = new Date();
    this.bugService.pushBug(this.bug).subscribe(response => {
      console.log(response);
    });
  }

}
