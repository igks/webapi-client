import { Component, OnInit, ViewChild } from "@angular/core";
import { EmployeeService } from "src/app/shared/employee.service";
import { Employee } from "src/app/shared/employee.model";

import { MatPaginator } from "@angular/material/paginator";
import { MatSort } from "@angular/material/sort";
import { MatTableDataSource } from "@angular/material/table";
import { MatDialog, MatDialogConfig, MatDialogRef } from "@angular/material";
import { EmployeeComponent } from "../employee/employee.component";
import Swal from "sweetalert2";

@Component({
  selector: "app-employee-list",
  templateUrl: "./employee-list.component.html",
  styleUrls: ["./employee-list.component.css"]
})
export class EmployeeListComponent implements OnInit {
  constructor(private service: EmployeeService, private dialog: MatDialog) {}

  // variable declaration
  employeeList = new MatTableDataSource<Employee>();
  searchKey: string;
  displayedColumns: string[] = [
    "EMPCode",
    "FullName",
    "Position",
    "Mobile",
    "Edit",
    "Delete"
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    // update data then implement the sort and pagination when initialize the application
    this.getAllEmployee();
    this.employeeList.sort = this.sort;
    this.employeeList.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  // request the data from api service
  getAllEmployee() {
    this.service.refreshList();
    this.employeeList = this.service.employeeList;
  }

  // implement filter for search feature
  applyFilter(filterValue: string) {
    this.employeeList.filter = filterValue.trim().toLowerCase();
    if (this.employeeList.paginator) {
      this.employeeList.paginator.firstPage();
    }
  }

  // populate the data to the form when user modified the data
  populateForm(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  // do confirm when delete then delete the data
  onDelete(id: number) {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      type: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!"
    }).then(result => {
      if (result.value) {
        this.service.deleteEmployee(id).subscribe(() => {
          this.getAllEmployee();
          Swal.fire({
            type: "success",
            title: "Deleted!",
            text: "Employee data has been deleted."
          });
        });
      }
    });
  }

  // clear the search text with clear button
  onClear() {
    this.searchKey = "";
    this.applyFilter(this.searchKey);
  }

  // add the data to database
  onAdd() {
    this.service.dialogTitle = "Add New Employee";
    this.service.dialogSubmit = "SUBMIT";
    this.service.resetForm();
    this.raisedDialog();
  }

  // edit the existing data in database
  onEdit(emp) {
    this.service.dialogTitle = "Modify Existing Employee";
    this.service.dialogSubmit = "UPDATE";
    this.populateForm(emp);
    this.raisedDialog();
  }

  // raise the dialog box for add or update data accordingly
  raisedDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.disableClose = true;
    const dialogRef = this.dialog.open(EmployeeComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllEmployee();
    });
  }
}
