import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({providedIn: 'root'})
export class EmployeeService {
    api = 'http://localhost:4000/api';
    http: HttpClient;

    constructor(http: HttpClient){
        this.http = http;
    }

    public getEmployeees() {
        return this.http.get<any>(`${this.api}/employee/all`)
    }

    public updateEmployees(employees: Array<any>) {
        return this.http.post<any>(`${this.api}/employee/add`, {employees})
    }

}