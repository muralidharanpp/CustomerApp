import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Customer } from '../domain/models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerApiService {

    private baseUrl = 'https://localhost:7024/api/Customer';

    constructor(private http: HttpClient) { }

    saveCustomer(data: any): Observable<any> {
        return this.http.post(`${this.baseUrl}`, data);
    }

    getAll() {
        return this.http.get<Customer[]>(this.baseUrl);
    }


    getCustomer(id: number, opt: string): Observable<any> {
        return this.http.get(`${this.baseUrl}/${id}`, { params: { opt } });
    }

    deleteCustomer(id: number): Observable<any> {
        return this.http.delete(`${this.baseUrl}/${id}`);
    }

    deleteCustomerDetails(ids: number[]): Observable<any> {
        return this.http.delete<void>(`${this.baseUrl}/details`, {
            body: ids,
            headers: { 'Content-Type': 'application/json' }
        });
    }
}