import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'student-add',
  templateUrl: './student-add.component.html',
  styleUrls: ['./student-add.component.less']
})
export class StudentAddComponent implements OnInit, OnDestroy {

  student?: Student;
  loading = true;

  constructor(
    private router: Router,
    private studentSvc: StudentService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
  }

  ngOnDestroy(){
  }

  onSave(eventData: { student: Student }) {
    this.studentSvc.add(eventData.student).subscribe(
      (result) => {
        if (result.status) {
          this.messageService.add({severity:'success', summary: result.message});
          this.router.navigateByUrl('/student');
        } else {
          this.messageService.add({severity:'error', summary: "Oops something went wrong."});
        }
      },
      (errors) => {
        this.messageService.add({severity:'error', summary: "Oops something went wrong."});
      }
    );
  }

}
