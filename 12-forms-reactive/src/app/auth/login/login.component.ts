import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators, AbstractControl} from '@angular/forms';
import { of } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

function mustContainQuestionMark(control: AbstractControl) {
  if (control.value && control.value.includes('?')) {
    return null;
  }
  return {doesNotContainQuestionMark: true};
} 

function emailIsUnique(control:AbstractControl) {
  if (control.value !== 'test.example.com') {
    return of(null);
  }
  return of({emailIsNotUnique: true});
}

// Alternatively we could initialize the form control with the saved value directly.  
// This gets run one time when the component is created.
let initialEmailValue = '';
const savedForm = window.localStorage.getItem('saved-login-form');
if (savedForm) {
  const loadedForm = JSON.parse(savedForm);
  initialEmailValue = loadedForm?.email || '';
} 

@Component({
  selector: 'app-login',
  standalone: true,
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
  imports: [ReactiveFormsModule]
})
export class LoginComponent implements OnInit {
  form1 = new FormGroup({
    email: new FormControl('', {
      validators: [Validators.required, Validators.email]
    }),

    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6), mustContainQuestionMark],
      asyncValidators: [emailIsUnique]
      })
    });

  get emailIsInvalid() {
    console.log (this.form1.controls.email);
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

  ngOnInit() {
    const savedForm = window.localStorage.getItem('saved-login-form');
    if (savedForm) {
      const loadedForm = JSON.parse(savedForm);
      const savedEmail = loadedForm?.email;
      this.form1.patchValue({email: savedEmail}); // Update the form with saved value
    }
    const subscription = this.form1.valueChanges.pipe(debounceTime(500)).subscribe({
      next: (value) => {
        window.localStorage.setItem('saved-login-form', JSON.stringify({email: value.email}));  
      }
    })
  }
  onSubmit(formData: FormGroup) {
    // console.log (formData.value);
    const enteredEmail = this.form1.value.email;
    const enteredPassword = this.form1.value.password;
    console.log(enteredEmail, enteredPassword);
    this.form1.reset();
  }
}