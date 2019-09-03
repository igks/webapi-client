import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee.model';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit, AfterViewInit {
  employeeList = new MatTableDataSource<Employee>();
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

  constructor(private service: EmployeeService) {}

  ngOnInit() {}

  ngAfterViewInit(): void {
    this.getAllEmployee();
    this.employeeList.sort = this.sort;
    this.employeeList.paginator = this.paginator;
  }

  getAllEmployee() {
    this.service.getEmployee().subscribe(data => {
      this.employeeList.data = data as Employee[];
    });
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
}
