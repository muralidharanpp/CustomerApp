import { CustomerDetail } from "./customer-detail.model";

export interface Customer {
  id: number;
  name: string;
  email: string;
  details: CustomerDetail[];
}