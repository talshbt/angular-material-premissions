import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { BasicSnackbarComponent } from './basic-snackbar/basic-snackbar.component';





@NgModule({

  imports: [
    RouterModule.forRoot([
      { path: 'basic', component: BasicSnackbarComponent },
      { path: 'other', component: BasicSnackbarComponent },
      { path: 'position', component: BasicSnackbarComponent }
    ])
  ],
  exports: [
    RouterModule,
  ],
  providers: [],

})
export class AppRoutingModule {}