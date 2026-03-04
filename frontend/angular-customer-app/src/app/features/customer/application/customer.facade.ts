import { Injectable, signal, computed } from '@angular/core';
import { CustomerApiService } from '../infrastructure/customer.service';
import { Observable, tap } from 'rxjs';
import { Customer } from '../domain/models/customer.model';

@Injectable({ providedIn: 'root' })
export class CustomerFacade {

    // ✅ Global dataset (never replace on select)
    private _rows = signal<Customer[]>([]);
    rows = this._rows.asReadonly();

    // ✅ Selected customer
    private _selectedCustomer = signal<Customer | null>(null);
    selectedCustomer = this._selectedCustomer.asReadonly();

    constructor(private api: CustomerApiService) { }

    // -------------------------
    // GLOBAL LOAD
    // -------------------------
    loadCustomers() {
        this.api.getAll().subscribe({
            next: res => this._rows.set(res),
            error: err => console.error(err)
        });
    }

    // -------------------------
    // SELECT ONLY (DO NOT TOUCH _rows)
    // -------------------------
    selectCustomer(customer: Customer) {
        this._selectedCustomer.set(customer);
    }

    loadCustomerById(id: number, opt: string) {
        return this.api.getCustomer(id, opt);
    }

    // -------------------------
    // UPDATE ONLY SELECTED CUSTOMER DETAILS
    // -------------------------
    updateSelectedCustomerDetails(details: any[]) {
        const customer = this._selectedCustomer();
        if (!customer) return;

        this._selectedCustomer.set({
            ...customer,
            details
        });
    }
    // Optional: update selected customer
    setSelectedCustomer(customer: Customer) {
        this._selectedCustomer.set(customer);
    }

    // -------------------------
    // HW/SW FROM ALL CUSTOMERS
    // -------------------------
    private flattenDetails = computed(() =>
        this._rows().flatMap(r =>
            r.details.map(d => ({
                code: d.code,
                category: d.category,
                id: d.id
            }))
        )
    );

    hwCodes = computed(() =>
        this.flattenDetails()
            .filter(d => d.category === 'HW' && d.code)
            .map(d => ({ code: d.code, id: Number(d.id) }))
    );

    swCodes = computed(() =>
        this.flattenDetails()
            .filter(d => d.category === 'SW' && d.code)
            .map(d => ({ code: d.code, id: Number(d.id) }))
    );

    save(customer: any) {
        return this.api.saveCustomer(customer);
    }
    deleteCustomer(id: number) {
        return this.api.deleteCustomer(id).pipe(
            tap(() => {
                this._selectedCustomer.set(null); // auto clear grid
            })
        );
    }

     deleteCustomerDetails(ids: number[]) {
        return this.api.deleteCustomerDetails(ids).pipe(
            tap(() => {
                const current = this._selectedCustomer();
                if (!current) return;
                current.details = current.details.filter(d => !ids.includes(d.id));
                this._selectedCustomer.set({ ...current }); // trigger signal update
            })
        );
  }

    addRow(row: Customer) {
        this._rows.update(r => [...r, row]);
    }
    clearSelectedCustomer() {
        this._selectedCustomer.set(null);
    }
}

