import { Component, OnInit, OnDestroy } from "@angular/core";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { Subject } from "rxjs";
import { TableService } from "./table.service";
import { Router } from "@angular/router";

@Component({
  selector: "app-table",
  templateUrl: "./table.component.html",
  styleUrls: ["./table.component.css"],
})
export class TableComponent implements OnDestroy, OnInit {
  dtOptions: DataTables.Settings = {};
  persons: any = [];
  dtTrigger: Subject<any> = new Subject<any>();
  userForm: FormGroup | any;
  idgen: any;
  save: any;
  userid: any;
  userlist = [];

  constructor(
    private tableService: TableService,
    private formBuilder: FormBuilder,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: "full_numbers",
      pageLength: 2,
    };

    this.getUser();
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

  getUser() {
    this.persons = this.tableService.array;

    setTimeout(() => {
      this.dtTrigger.next('');
    }, 200);
  }

  deleteUser(id: any) {
    var delbtn = confirm("Are you sure you want to delete?");
    if (delbtn == true){
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].ufname === id) {
        console.log(this.persons[i].ulname);
        this.persons.splice(i, 1);
      }
    }}
  }

  editUser(id: any) {
    this.save = true;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].ufname === id) {
        console.log(this.persons[i].ufname);
        this.userid = this.persons[i].ufname;
        this.userForm.patchValue({
          ufname: this.persons[i].ufname,
          ulname: this.persons[i].ulname,
          uemail: this.persons[i].uemail,
          umobile: this.persons[i].umobile,
          udob: this.persons[i].udob,
          ugen: this.persons[i].ugen,
        });
      }
    }
  }

  saveUser(id: any) {
    this.save = false;
    for (let i = 0; i < this.persons.length; i++) {
      if (this.persons[i].ufname === id) {
        console.log(this.persons[i].ufname);
        this.persons[i].ufname = this.userForm.controls["ufname"].value;
        this.persons[i].ulname = this.userForm.controls["ulname"].value;
        this.persons[i].uemail = this.userForm.controls["uemail"].value;
        this.persons[i].umobile = this.userForm.controls["umobile"].value;
        this.persons[i].udob = this.userForm.controls["udob"].value;
        this.persons[i].ugen = this.userForm.controls["ugen"].value;
      }
    }
    this.userForm.reset();
  }
}
