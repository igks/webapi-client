import { Component, OnInit } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { NgForm } from "@angular/forms";
import { MatDialogRef, MatToolbarModule } from "@angular/material";
import Swal from "sweetalert2";

@Component({
  selector: "app-employee",
  templateUrl: "./employee.component.html",
  styleUrls: ["./employee.component.css"]
})
export class EmployeeComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeComponent>
  ) {}

  // variable declaration
  dialogTitle: string;
  dialogSubmit: string;
  formData = this.service.formData;

  ngOnInit() {
    // Set title and button text dialog box when initialize the application
    this.dialogTitle = this.service.dialogTitle;
    this.dialogSubmit = this.service.dialogSubmit;
  }

  // Submit the data to database based on condition (register or update)
  onSubmit(form: NgForm) {
    if (form.value.EmployeeID === null) this.insertRecord(form);
    else this.updateRecord(form);
    this.onCloseDialog();
  }

  //  insert new data to database
  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(() => {
      this.service.refreshList();
      Swal.fire({
        type: "success",
        title: "Registered Successfuly",
        text: "New employee has been add to database!."
      });
    });
  }

  // Update existing data in database
  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(() => {
      this.service.refreshList();
      Swal.fire({
        type: "success",
        title: "Modified Successfuly",
        text: "Employee has been updated!."
      });
    });
  }

  // Close the dialog by close button when user cancel the register or update the data
  onCloseDialog() {
    this.dialogRef.close();
  }
}
