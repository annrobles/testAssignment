import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { catchError } from 'rxjs/operators';
import { throwError } from 'rxjs';


import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'student-edit',
  templateUrl: './student-edit.component.html',
  styleUrls: ['./student-edit.component.less']
})
export class StudentEditComponent implements OnInit, OnDestroy {

  student?: Student;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private studentSvc: StudentService,
    private messageService: MessageService
  ) {
    let id = this.route.snapshot.paramMap.get('id');

    if (id) {
      this.studentSvc.getById(id).subscribe((result) => {
        this.student = result.student;
      })
    }
  }

  ngOnInit(): void {

  }

  ngOnDestroy(){
  }

  onSave(eventData: { student: Student }) {
    if (eventData.student._id) {
      this.studentSvc.update(eventData.student._id, eventData.student).subscribe(
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

}
