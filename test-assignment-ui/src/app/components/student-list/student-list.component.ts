import { UntilDestroy, untilDestroyed } from '@ngneat/until-destroy';
import { Component, OnInit, OnDestroy, ViewChild, ElementRef } from '@angular/core';
import { Router } from '@angular/router';

import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import * as XLSX from "xlsx";

import { Student } from '../../models/student.model';
import { StudentService } from '../../services/student.service';
import { MessageService } from 'primeng/api';

@UntilDestroy()
@Component({
  selector: 'student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.less']
})
export class StudentListComponent implements OnInit, OnDestroy {

  students:Student[] = [];
  @ViewChild('studentList', { static: false }) studentList: ElementRef;

  constructor(
    private router: Router,
    private studentSvc: StudentService,
    private messageService: MessageService
  ) {

  }

  ngOnInit(): void {
    this.studentSvc.getList().subscribe((result) => {
      if (result.status) {
        this.students = result.students;
      }
    });
  }

  ngOnDestroy(){
  }

  viewStudent(student: Student) {
    this.router.navigateByUrl('/student/edit/' + student._id);
  }

  addStudent() {
    this.router.navigateByUrl('/student/add');
  }

  deleteStudent(student: Student) {
    if (student._id) {
      this.studentSvc.deleteById(student._id).subscribe((result) => {
        if (result.status) {
          this.students = result.students;
          this.messageService.add({severity:'success', summary: result.message});
        }
      });
    }
  }

  downloadAsPdf() {
    const studentList = document.getElementById('studentList');
    if (studentList) {
      const studentListHeight = studentList.clientHeight;
      const studentListWidth = studentList.clientWidth;
      const options = { background: 'white', width: studentListWidth, height: studentListHeight };

      domtoimage.toPng(studentList, options).then((imgData) => {
           const doc = new jsPDF(studentListWidth > studentListHeight ? 'l' : 'p', 'mm', [studentListWidth, studentListHeight]);
           const imgProps = doc.getImageProperties(imgData);
           const pdfWidth = doc.internal.pageSize.getWidth();
           const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

           doc.addImage(imgData, 'PNG', 0, 0, pdfWidth, pdfHeight);
           doc.save('StudentList.pdf');
      });
    }
  }

  downloadAsExcel() {
    var el: ElementRef;
    el = this.studentList.nativeElement.querySelector('.p-datatable-table');
    const ws: XLSX.WorkSheet = XLSX.utils.table_to_sheet(
      el
    );

    /* new format */
    var fmt = "0.00";
    /* change cell format of range B2:D4 */
    var range = { s: { r: 1, c: 1 }, e: { r: 2, c: 100000 } };
    for (var R = range.s.r; R <= range.e.r; ++R) {
      for (var C = range.s.c; C <= range.e.c; ++C) {
        var cell = ws[XLSX.utils.encode_cell({ r: R, c: C })];
        if (!cell || cell.t != "n") continue; // only format numeric cells
        cell.z = fmt;
      }
    }
    const wb: XLSX.WorkBook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Sheet1");
    var fmt = "@";
    wb.Sheets["Sheet1"]["F"] = fmt;


    XLSX.writeFile(wb, "StudentList.xlsx");
  }

  getSearchInputValue(event: any){
    return (event.target as HTMLInputElement).value;
  }
}
