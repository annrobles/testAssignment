import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { StudentListComponent } from "./components/student-list/student-list.component";
import { StudentAddComponent } from "./components/student-add/student-add.component";
import { StudentEditComponent } from "./components/student-edit/student-edit.component";

const routes: Routes = [
  {
    path: '',
    data: { frameless: true },
    component: StudentListComponent
  },
  {
    path: 'student',
    data: { frameless: true, userRoles: [] },
    component: StudentListComponent,
    canActivate: []
  },
  {
    path: 'student/add',
    data: { frameless: true, userRoles: [] },
    component: StudentAddComponent,
    canActivate: []
  },
  {
    path: 'student/edit/:id',
    data: { frameless: true, userRoles: [] },
    component: StudentEditComponent,
    canActivate: []
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
