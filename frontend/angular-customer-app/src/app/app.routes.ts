import { Routes } from '@angular/router';
import { CUSTOMER_ROUTES } from './features/customer/customer.routes';

export const routes: Routes = [
  {
    path: '',
    children: CUSTOMER_ROUTES
  }
];