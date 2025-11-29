import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value && control.value.includes('?')) {
    return null;
  }
  return {doesNotContainQuestionMark: true};
} 

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent {
  form1 = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark]
    })
  });

  get emailIsInvalid() {
    console.log (this.form1.controls.email.errors);
    return this.form1.controls.email.touched &&
            this.form1.controls.email.dirty &&
            this.form1.controls.email.invalid;
  }
  get passwordIsInvalid() {
    console.log (this.form1.controls.password.errors);
    return this.form1.controls.password.touched &&
            this.form1.controls.password.dirty &&
            this.form1.controls.password.invalid;
  }

  onSubmit(formData: FormGroup) {
    // console.log (formData.value);
    const enteredEmail = this.form1.value.email;
    const enteredPassword = this.form1.value.password;
    console.log(enteredEmail, enteredPassword);


    this.form1.reset();
  }
}