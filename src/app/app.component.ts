import { Component } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";
import { BasicSnackbarComponent } from "./basic-snackbar/basic-snackbar.component";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  data = "This is an example for passing data";

  constructor(private snackBar: MatSnackBar) {}

  showSnackbar(content) {
    this.snackBar.open(content);
  }
  showSnackbarAction(content, action) {
    let snack = this.snackBar.open(content, action);
    snack.afterDismissed().subscribe(() => {
      console.log("This will be shown after snackbar disappeared");
    });
    snack.onAction().subscribe(() => {
      console.log("This will be called when snackbar button clicked");
    });
  }
  showSnackbarDuration(content, action, duration) {
    this.snackBar.open(content, action, duration);
  }
  showSnackbarTopPosition(content, action, duration) {
    this.snackBar.open(content, action, {
      duration: 2000,
      verticalPosition: "top", // Allowed values are  'top' | 'bottom'
      horizontalPosition: "center" // Allowed values are 'start' | 'center' | 'end' | 'left' | 'right'
    });
  }
  showSnackbarCssStyles(content, action, duration) {
    let sb = this.snackBar.open(content, action, {
      duration: duration,
      panelClass: ["custom-style"]
    });
    sb.onAction().subscribe(() => {
      sb.dismiss();
    });
  }
  showBasicComponent(message: string, panelClass: string) {
    this.snackBar.openFromComponent(BasicSnackbarComponent, {
      data: this.data,
      duration: 10000
    });
  }
}
