import { Component } from '@angular/core';
import { CustomerFormComponent } from '../components/customer-form/customer-form.component';

@Component({
  selector: 'app-customer-page',
  standalone: true,
  imports: [CustomerFormComponent],
  template: `<app-customer-form></app-customer-form>`
})
export class CustomerPageComponent {}