import { Component, OnInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { NgForm } from '@angular/forms';
import { MatDialogRef, MatToolbarModule } from '@angular/material';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {
  constructor(
    private service: EmployeeService,
    private dialogRef: MatDialogRef<EmployeeComponent>
  ) {}

  dialogTitle: string;
  dialogSubmit: string;

  ngOnInit() {
    this.dialogTitle = this.service.dialogTitle;
    this.dialogSubmit = this.service.dialogSubmit;
  }

  onSubmit(form: NgForm) {
    if (form.value.EmployeeID == null) this.insertRecord(form);
    else this.updateRecord(form);
    this.dialogRef.close();
  }

  insertRecord(form: NgForm) {
    this.service.postEmployee(form.value).subscribe(res => {});
  }
  updateRecord(form: NgForm) {
    this.service.putEmployee(form.value).subscribe(res => {});
  }
  onCloseDialog() {
    this.dialogRef.close();
  }
}
