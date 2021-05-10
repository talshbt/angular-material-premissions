import { Component, OnInit, Inject } from "@angular/core";
import {
  MatSnackBarRef,
  MAT_SNACK_BAR_DATA
} from "@angular/material/snack-bar";

@Component({
  selector: "app-basic-snackbar",
  templateUrl: "./basic-snackbar.component.html",
  styleUrls: ["./basic-snackbar.component.css"]
})
export class BasicSnackbarComponent implements OnInit {
  constructor(
    public sbRef: MatSnackBarRef<BasicSnackbarComponent>,
    @Inject(MAT_SNACK_BAR_DATA) public data: any
  ) {}
  ngOnInit() {}
}
