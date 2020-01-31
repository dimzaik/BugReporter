import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { BugListComponent } from './bug-list.component';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MatTableModule, MatSortModule, MatPaginatorModule, MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { HttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


describe('BugListComponent', () => {
  let component: BugListComponent;
  let fixture: ComponentFixture<BugListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [RouterTestingModule, CommonModule,
        RouterModule,
        MatTableModule,
        MatSortModule,
        MatPaginatorModule,
        MatFormFieldModule,
        MatInputModule,
        BrowserAnimationsModule,
        FormsModule,
        HttpClientTestingModule],
      declarations: [BugListComponent],
    }).compileComponents();
  }));



  it('should the component be created', () => {
    const fixture = TestBed.createComponent(BugListComponent);
    const component = fixture.debugElement.componentInstance;
    fixture.detectChanges();
    //const compiled = fixture.debugElement.nativeElement;
    expect(component).toBeTruthy();
  });

  it('should Add button text be equal to Add new bug', () => {
    const fixture = TestBed.createComponent(BugListComponent);
    const component = fixture.debugElement.nativeElement;
    fixture.detectChanges();
    expect(component.querySelector('.mat-button').textContent).toEqual('Add new Bug');
  });
});
