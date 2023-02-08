import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, Validators } from '@angular/forms';

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';

@UntilDestroy()
@Component({
  selector: 'student-detail',
  templateUrl: './student-detail.component.html',
  styleUrls: ['./student-detail.component.less']
})
export class StudentDetailComponent implements OnInit, OnDestroy {

  @Output() save = new EventEmitter<{student: Student}>();
  @Input() student?: Student

  studentForm = this.fb.group({
    _id: [],
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone_number: ['', Validators.required]
  });

  constructor(
    private router: Router,
    private studentSvc: StudentService,
    private fb: FormBuilder
  ) {

  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['student'].currentValue) {
      this.studentForm.patchValue({
        _id: changes['student'].currentValue._id,
        name: changes['student'].currentValue.name,
        email: changes['student'].currentValue.email,
        phone_number: changes['student'].currentValue.phone_number,
      });
    }
  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  onSave() {
    if (this.studentForm.value) {
      this.save.emit({ student: this.studentForm.value as Student });
    }
  }

  viewStudents() {
    this.router.navigateByUrl('/student');
  }

}
