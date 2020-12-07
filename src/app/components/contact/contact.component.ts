import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, AbstractControl, ValidationErrors } from '@angular/forms';
import { Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  contactForm = this.fb.group({
    name: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    subject: ['', Validators.required],
    body: ['', Validators.required]
  }) ;

  constructor(public toastr: ToastrService, public fb: FormBuilder) { }

  ngOnInit() {
  }

  onSubmit() {

    let req: boolean = false;
    let email: boolean = false;
    let invalid: boolean = false;

    let errorMsg = '';
    let invalidErrorMsg = '';
    let requiredValues = [];
    let invalidValues = [];
    console.log(this.contactForm.controls);

    if (this.contactForm.valid) {
      this.toastr.info('OK!', 'Contact Form submitted successfuly.');
    } else {
      Object.keys(this.contactForm.controls).forEach(control => {
        const ctrl: AbstractControl = this.contactForm.controls[control];
        if (!ctrl.valid) {
          //  set Error
          const ctrlError: ValidationErrors = ctrl.errors;

          //  check required errors
          if (ctrlError != null && ctrlError.required) {
            if (!req) {
              req = true;
            }
            requiredValues.push(this.capitalize(control));
          }

          //  Check invalid errors
          if (ctrlError != null && ctrlError.invalid) {
            if (!invalid) {
              invalid = true;
            }
            invalidValues.push(this.capitalize(control));
          }

          //  Check email errors
          if (ctrlError != null && ctrlError.email) {
            if (!invalid) {
              invalid = true;
            }
            invalidValues.push(this.capitalize(control));
          }

        }
      });
      if (req) {
        errorMsg = requiredValues.join(', ');
        this.toastr.error(errorMsg, 'Missing required fields');
      }

      if (invalid) {
        invalidErrorMsg = invalidValues.join(', ');
        this.toastr.error(errorMsg, 'Invalid fields');
      }
    }
  }

  capitalize(s: string) {
    if (typeof s !== 'string') return ''
    return s.charAt(0).toUpperCase() + s.slice(1);
  }

}
