import { Component, OnInit, ElementRef, ViewChild } from "@angular/core";
import {
  FormControl,
  FormGroup,
  FormBuilder,
  Validators,
  FormArray,
  ValidatorFn,
  AbstractControl,
  ValidationErrors,
} from "@angular/forms";
import { Router } from "@angular/router";
import { ConfirmPasswordValidator } from "../must-match/validate-password";
import { TableService } from "../table/table.service";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"],
})
export class AddUserComponent implements OnInit {
  registerForm: FormGroup;
  submitted = false;
  othersList: any = ["Height", "Weight", "Disease"];
  usersList: Array<any> = [];

  constructor(
    private formBuilder: FormBuilder,
    private tableService: TableService,
    private router: Router
  ) {
    this.registerForm = new FormGroup({
      firstName: new FormControl("", [Validators.required]),
      lastName: new FormControl("", [Validators.required]),
      dob: new FormControl("", [
        Validators.required,
        Validators.pattern(
          /^\d{4}\-(0[1-9]|1[012])\-(0[1-9]|[12][0-9]|3[01])$/
        ),
      ]),
      email: new FormControl("", [
        Validators.required,
        Validators.pattern(/^[a-z0-9._%+-]+@[a-z0-9.-]+\.[a-z]{2,4}$/),
      ]),
      gender: new FormControl("true", [Validators.required]),
      others: new FormControl("", Validators.required),
      password: new FormControl("", [
        Validators.required,
        Validators.minLength(6),
      ]),
      confirmPassword: new FormControl("", Validators.required),
      acceptTerms: new FormControl(false, [Validators.requiredTrue]),
      phoneNumber: new FormControl("", [
        Validators.required,
        Validators.pattern("^((\\+91-?)|0)?[0-9]{10}$"),
      ]),
    });
  }

  ngOnInit() {}

  get f() {
    return this.registerForm.controls;
  }

  numberOnly(event: any): boolean {
    const charCode = event.which ? event.which : event.keyCode;
    if (charCode > 31 && (charCode < 48 || charCode > 57)) {
      return false;
    }
    return true;
  }

  onSubmit() {
    this.submitted = true;

    if (this.registerForm.valid) {
      this.tableService.array.push(this.registerForm.value);

      this.router.navigate(["/table"]);
    }
  }

  onReset() {
    this.submitted = false;
    this.registerForm.reset();
  }
}
