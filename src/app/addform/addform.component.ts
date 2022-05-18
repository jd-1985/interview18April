import {Component, OnInit} from '@angular/core';
import {DbserviceService} from "../dbservice.service";
import {FormArray, FormBuilder, FormGroup} from "@angular/forms";

@Component({
  selector: 'app-addform',
  templateUrl: './addform.component.html',
  styleUrls: ['./addform.component.css']
})
export class AddformComponent implements OnInit {

  constructor(
    private dbService: DbserviceService,
    private formbuilder: FormBuilder
  ) {
  }

  employees: any[] = [];

  employeesX(): FormArray {
    return this.addEmployeefrom.get("employeesX") as FormArray
  }

  addEmployeefrom = this.formbuilder.group({name: '', employeesX: this.formbuilder.array([])})


  ngOnInit(): void {
    this.dbService.sendSearchRequest().subscribe((data: any[]) => {
      console.log(data);
      this.employees = data;
      //this.employees = data;
    })

    this.dbService.sendSearchRequest().subscribe((data: any[]) => {
      console.log(data);
      this.employees = data;
      //this.employees = data;
    })
    this.initEmployeeInputTable();
  }

  addEmployee(): void {
    this.dbService.addEmployee(this.addEmployeefrom.value).subscribe((data: any[]) => {
      console.log(data);
      this.employees = data;
      //this.employees = data;
    })
    this.dbService.addEmployee(this.addEmployeefrom.value);
  }

  edit(): void {
    //alert(JSON.stringify(this.addEmployeefrom.value))
    this.dbService.addEmployee(this.addEmployeefrom.value);
  }

  delete(id: any): void {
    //alert(id)
    this.dbService.deleteEmployee(id).subscribe((data: any[]) => {
      console.log(data);
      this.employees = data;
      //this.employees = data;
    })
    this.dbService.deleteEmployee(id);
    this.dbService.sendSearchRequest().subscribe((data: any[]) => {
      console.log(data);
      this.employees = data;
      //this.employees = data;
    })
  }

  newEmployee(): FormGroup {
    return this.formbuilder.group({firstname: '', lastname: '', email: '', mobile: ''})
  }

  addNewEmployee() {
    this.employeesX().push(this.newEmployee())
  }

  save() {
    //alert(JSON.stringify(this.employeesX().value));
    this.dbService.addEmployee(this.employeesX().value).subscribe((data: any[]) => {
      console.log(data);
      this.employees = data;
      //this.employees = data;
    })
    this.dbService.addEmployee(this.employeesX().value);

    this.initEmployeeInputTable()
    this.dbService.sendSearchRequest().subscribe((data: any[]) => {
      console.log(data);
      this.employees = data;
      //this.employees = data;
    })
    //this.employeesX().push(this.newEmployee())
  }

  removeRow(index: number){
    this.employeesX().removeAt(index);
  }

  initEmployeeInputTable() {
    this.employeesX().clear();
    this.addNewEmployee();
  }


}
