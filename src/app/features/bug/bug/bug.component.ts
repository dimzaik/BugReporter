import { Component, OnInit } from '@angular/core';
import {FormArray, FormControl, FormGroup, Validators} from '@angular/forms';
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
      status: new FormControl(null, Validators.required),
      comments: new FormArray([])
    });

    const paramId = this.route.snapshot.params.id;
    if (paramId) {
      this.bugService.getBugById(paramId).subscribe(response => {
        this.form.patchValue({...response, comments: []});

        if (response.comments) {
          response.comments.forEach(comment => {
            const commentFormGroup = this.createCommentFormGroup(comment);
            this.commentArray.push((commentFormGroup));
          })
        }
      });
    }
  }

  get commentArray(): FormArray {
    return this.form.get('comments') as FormArray
  }

  private createCommentFormGroup(comment?) {
    return new FormGroup({
      reporter: new FormControl(comment && comment.reporter,[Validators.required, Validators.minLength(3)]),
      description: new FormControl(comment && comment.description,[Validators.required, Validators.minLength(3)])
    })
  }

  addComment(event: MouseEvent){
    event.stopPropagation();
    this.commentArray.push(this.createCommentFormGroup());
  }

  formSubmit(form: FormGroup) {
    this.bug = form.value;
    //TODO remove empty comments on create or update
    const bugId = this.route.snapshot.params.id;
    const actionToInvoke = bugId ? this.bugService.updateBug(bugId, this.bug) : this.bugService.pushBug(this.bug);
    actionToInvoke.subscribe(response => {
        this.router.navigate(['']);
      });
  }

}
