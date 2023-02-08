import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { MessageModule } from 'primeng/message';
import { MessagesModule } from 'primeng/messages';
import { TableModule } from 'primeng/table';
import { ToastModule } from 'primeng/toast';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { CardModule } from 'primeng/card';
import { ProgressSpinnerModule } from 'primeng/progressspinner';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { StudentListComponent } from "./components/student-list/student-list.component";
import { StudentDetailComponent } from "./components/student-detail/student-detail.component";
import { StudentAddComponent } from "./components/student-add/student-add.component";
import { StudentEditComponent } from "./components/student-edit/student-edit.component";

import { StudentService } from './services/student.service';

@NgModule({
  declarations: [
    AppComponent,
    StudentListComponent,
    StudentDetailComponent,
    StudentAddComponent,
    StudentEditComponent
  ],
  imports: [
    FormsModule,
    HttpClientModule,
    BrowserAnimationsModule,
    BrowserModule,
    AppRoutingModule,
    MessageModule,
    MessagesModule,
    TableModule,
    ToastModule,
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    CardModule,
    ProgressSpinnerModule
  ],
  providers: [StudentService],
  bootstrap: [AppComponent]
})
export class AppModule { }
