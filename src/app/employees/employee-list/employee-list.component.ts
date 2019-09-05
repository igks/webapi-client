import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatDialog, MatDialogConfig, MatDialogRef } from '@angular/material';
import { EmployeeComponent } from '../employee/employee.component';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  constructor(
    private service: EmployeeService,
    private dialog: MatDialog //private dialogRef: MatDialogRef<EmployeeComponent>
  ) {}

  employeeList = new MatTableDataSource<Employee>();
  searchKey: string;
  displayedColumns: string[] = [
    'EMPCode',
    'FullName',
    'Position',
    'Mobile',
    'Edit',
    'Delete'
  ];

  @ViewChild(MatPaginator, { static: true }) paginator: MatPaginator;
  @ViewChild(MatSort, { static: true }) sort: MatSort;

  ngOnInit() {
    this.getAllEmployee();
  }

  ngAfterViewInit(): void {
    this.employeeList.sort = this.sort;
    this.employeeList.paginator = this.paginator;
    this.sort.sortChange.subscribe(() => (this.paginator.pageIndex = 0));
  }

  getAllEmployee() {
    // this.service.getEmployee().subscribe(data => {
    //   this.employeeList.data = data as Employee[];
    // });
    this.service.refreshList();
    this.employeeList = this.service.employeeList;
  }

  applyFilter(filterValue: string) {
    this.employeeList.filter = filterValue.trim().toLowerCase();
    if (this.employeeList.paginator) {
      this.employeeList.paginator.firstPage();
    }
  }

  populateForm(emp: Employee) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: number) {
    if (confirm('Are you sure to delete this record?')) {
      this.service.deleteEmployee(id).subscribe(() => {
        this.getAllEmployee();
      });
    }
  }
  onClear() {
    this.searchKey = '';
    this.applyFilter(this.searchKey);
  }
  onAdd() {
    const dialogRef = this.dialog.open(EmployeeComponent);
    dialogRef.afterClosed().subscribe(() => {
      this.getAllEmployee();
    });
  }
}
