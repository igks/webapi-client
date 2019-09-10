import { Injectable } from '@angular/core';
import { Employee } from './employee.model';
import { HttpClient } from '@angular/common/http';
import { MatTableDataSource } from '@angular/material/table';

@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  // variable declaration
  employeeList = new MatTableDataSource<Employee>();
  formData: Employee;
  dialogTitle: string;
  dialogSubmit: string;

  // define the api url
  readonly rootURL = 'http://webapiservice.somee.com/api/';

  constructor(private http: HttpClient) {}

  // update the data to display in UI
  refreshList() {
    this.getEmployee().subscribe(data => {
      this.employeeList.data = data as Employee[];
    });
  }

  // request data to server
  getEmployee() {
    return this.http.get(this.rootURL + 'Employee');
  }

  // post data to server
  postEmployee(formData: Employee) {
    return this.http.post(this.rootURL + 'Employee', formData);
  }

  // update data to server
  putEmployee(formData: Employee) {
    return this.http.put(
      this.rootURL + 'Employee/' + formData.EmployeeID,
      formData
    );
  }

  // delete data on server
  deleteEmployee(id: number) {
    return this.http.delete(this.rootURL + 'Employee/' + id);
  }

  // reset form value
  resetForm() {
    this.formData = {
      EmployeeID: null,
      FullName: '',
      Position: '',
      EMPCode: '',
      Mobile: ''
    };
  }
}
