import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { EmployeeService } from './shared/services/employee.service';
import { Employeee } from './shared/models/employee';


@Component({ selector: 'app-root', templateUrl: 'app.component.html' })
export class AppComponent implements OnInit {
  id?: string;
  title!: string;
  submitted = false;
  employees: Array<Employeee> = [];
  employee: any;
  salutations: any = ['Dr.', 'Mr.', 'Ms.', 'Mrs.', 'Mx.'];

    constructor(private employeeService: EmployeeService, private formBuilder: FormBuilder) {
    }

    ngOnInit(): void {
      this.reset();
    }

    reset() {
      this.employeeService.getEmployeees().subscribe((employees: any) => {
        this.employees = employees;   //[{ firstNames: 'John', lastName: 'Doe', salutation: 'Mr.', gender: 'male', employeeNumber: 1235555, grossSalary: 8000000, colour: 'green'}]//employees;
        this.setLocalStore()
        
      });
    }

    form: FormGroup = this.formBuilder.group({
      firstNames: ['', Validators.required],
      lastName: ['', Validators.required],
      fullName: new FormControl({value: '', disabled: true}, Validators.required),
      salutation: ['', Validators.required],
      gender: ['', Validators.required],
      employeeNumber: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      grossSalary: ['', [Validators.required, Validators.pattern("^[0-9]*$")]],
      colour: ['default', Validators.required]
    });

    setLocalStore() {
      localStorage.setItem('employees', JSON.stringify(this.employees));
    }

    onSelection(employee: any) {

      this.lastName?.setValue(employee.lastName, {onlySelf: true});
      this.fullName?.setValue(`${employee.firstNames} ${employee.lastName}`, { onlySelf: true});
      this.salutation?.setValue(employee.salutation, {onlySelf: true});
      this.gender?.setValue(employee.gender, {onlySelf: true});
      this.employeeNumber?.setValue(employee.employeeNumber, {onlySelf: true});
      this.grossSalary?.setValue(employee.grossSalary, {onlySelf: true});
      this.colour?.setValue(employee.colour, {onlySelf: true});
      this.firstNames?.setValue(employee.firstNames, {onlySelf: true});
    }

    cancel() {
      this.submitted = false;
      this.form.reset();
      this.colour?.setValue('default', {onlySelf: true});
    }

    onSubmit() {

      this.submitted = true;
      console.log({val:this.colour && this.colour.value})
      if(!this.colour || this.colour.value == '') {
        this.colour?.setValue('default',  {onlySelf: true});
      }
      if (this.form.invalid) {
        console.log('invalid');
        return;
      }

      let employeeIndex = this.employees.reduce((prev: any, e: any, index: number) => {
        if( e.employeeNumber && e.employeeNumber == this.form.value.employeeNumber) {
          return index;
        }
        return prev;
      }, undefined);

      if (!employeeIndex && employeeIndex != 0) {
        this.form.value.salutation =  this.form.value.salutation.split(':')[1].trim();
        this.employees.push(this.form.value);
      } 
      else {
        this.employees[employeeIndex] = {...this.form.value, ...{_id:  this.employees[employeeIndex]._id, fullName: `${this.employees[employeeIndex].firstNames} ${this.employees[employeeIndex].lastName}`}};
      }
      this.setLocalStore();
      this.submitted = false;
      this.form.reset();
      this.colour?.setValue('default', {onlySelf: true});

    }

    changeSalutation(e: any) {
      this.salutation?.setValue(e.target.value, {onlySelf: true});
      let title = e.target.value.split(':')[1].trim();
      console.log(title);
      if (title == 'Mr.'){
        this.gender?.setValue('male', {onlySelf: true})
      } else if (title == 'Mrs.' || title == 'Ms.') {
        this.gender?.setValue('female', {onlySelf: true})
      } else {
        this.gender?.setValue('unspecified', {onlySelf: true})
      }
    }

    add() {
      let employees = localStorage.getItem('employees');

      if (employees) {
        this.employeeService.updateEmployees(JSON.parse(employees)).subscribe(() => {
          this.reset();
        })
      }
    }

    get firstNames() {
      return this.form && this.form.get('firstNames');
    }
    get lastName() {
      return this.form && this.form.get('lastName');
    }
    get fullName() {
      return this.form && this.form.get('fullName');
    }
    get salutation() {
      return this.form && this.form.get('salutation');
    }
    get gender() {
      return this.form && this.form.get('gender');
    }
    get employeeNumber() {
      return this.form && this.form.get('employeeNumber');
    }
    get grossSalary() {
      return this.form && this.form.get('grossSalary');
    }
    get colour() {
      return this.form && this.form.get('colour');
    }
}