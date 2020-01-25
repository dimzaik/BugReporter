import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Bug, BugService} from '../../../core/bug.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-bug',
  templateUrl: './bug.component.html',
  styleUrls: ['./bug.component.scss']
})
export class BugComponent implements OnInit {

  form: FormGroup;
  reporters = ['QA', 'PO', 'DEV'];
  statuses = ['Ready for Test', 'Done', 'Rejected'];
  priority = [{value: 1, display: 'Minor'}, {value: 2, display: 'Major'}, {value: 3, display: 'Critical'}];
  constructor(private bugService: BugService, private router: Router, private route: ActivatedRoute) { }
  public bug: Bug;
  ngOnInit() {
    this.form = new FormGroup({
      createdAt: new FormControl(new Date(), [Validators.required, Validators.minLength(3)]),
      title: new FormControl(null, [Validators.required, Validators.minLength(3)]),
      description: new FormControl(null, Validators.required),
      priority: new FormControl(null, Validators.required),
      reporter: new FormControl(null, Validators.required),
      status: new FormControl(null, Validators.required)
    });
    const paramId = this.route.snapshot.params.id;
    if (paramId) {
      this.bugService.getBugById(paramId).subscribe(response => {
        this.form = new FormGroup({
          createdAt: new FormControl(response.createdAt, [Validators.required]),
          title: new FormControl(response.title, [Validators.required, Validators.minLength(3)]),
          description: new FormControl(response.description, Validators.required),
          priority: new FormControl(response.priority, Validators.required),
          reporter: new FormControl(response.reporter, Validators.required),
          status: new FormControl(response.status, Validators.required)
        });
      });
    }
  }
  formSubmit(form: FormGroup) {
    this.bug = form.value;
    this.bug.updatedAt = new Date();
    this.bugService.pushBug(this.bug).subscribe(response => {
      this.router.navigate(['']);
    });
  }

}
