import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app.routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BasicSnackbarComponent } from './basic-snackbar/basic-snackbar.component';
import { MatButton, MatButtonModule } from '@angular/material/button';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MaterialModule } from './material.module';


@NgModule({
  imports:      [ AppRoutingModule,BrowserModule,BrowserAnimationsModule, MaterialModule],
  declarations: [ AppComponent,BasicSnackbarComponent],
  bootstrap:    [ AppComponent ],
  providers:[],
  exports:[BasicSnackbarComponent]
})
export class AppModule { }
