import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  employeeList = new MatTableDataSource<Employee>();
  formData: Employee;

  readonly rootURL = 'http://localhost:49823/api/';

  constructor(private http: HttpClient) {}

  refreshList() {
    // this.http
    //   .get(this.rootURL + 'Employee')
    //   .toPromise()
    //   .then(res => (this.list = res as Employee[]));

    this.getEmployee().subscribe(data => {
      this.employeeList.data = data as Employee[];
    });
  }

  getEmployee() {
    return this.http.get(this.rootURL + 'Employee');
  }

  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL + 'Employee', formData);
  }

  putEmployee(formData: Employee) {
    return this.http.put(
      this.rootURL + 'Employee/' + formData.EmployeeID,
      formData
    );
  }

  deleteEmployee(id: number) {
    return this.http.delete(this.rootURL + 'Employee/' + id);
  }
}
