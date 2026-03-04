import { ChangeDetectorRef, Component, computed, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { EditableGridComponent } from '../customer-grid/editable-grid.component';
import { CustomerFacade } from '../../../application/customer.facade';
import { HelperUtil } from '../../../../../shared/Utils/helper';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
    selector: 'app-customer-form',
    standalone: true,
    imports: [CommonModule, ReactiveFormsModule, EditableGridComponent],
    templateUrl: './customer-form.component.html',
    styleUrls: ['./customer-form.component.scss']
})
export class CustomerFormComponent {

    form: FormGroup;
    gridApi: any;
    public facade = inject(CustomerFacade);
    private snackBar = inject(MatSnackBar);

    constructor(private fb: FormBuilder) {
        this.form = this.fb.group({
            id: [0],
            name: ['', [Validators.required, Validators.minLength(3)]],
            email: ['', [Validators.required, Validators.email]]
        });
    }

    ngOnInit(): void {
        this.facade.loadCustomers();
    }

    onGridReady(api: any) {
        this.gridApi = api;
    }

    get idControl() { return this.form.get('id'); }
    get nameControl() { return this.form.get('name'); }
    get emailControl() { return this.form.get('email'); }

    gridData = computed(() => {
        const customer = this.facade.selectedCustomer();
        if (!customer) return [];
        return customer.details.map((d: any) => ({
            id: d.id,
            tempId: d.tempId,
            customerId: customer.id,
            name: customer.name,
            email: customer.email,
            code: d.code,
            category: d.category,
            description: d.description
        }));
    });

    onGridDataChange(flattened: any[]) {
        debugger;
        const grouped = flattened.reduce((acc: any, row: any) => {
            let customer = acc.find((c: any) => c.id === row.customerId);
            debugger;
            if (!customer) {
                customer = {
                    id: row.customerId || 0,
                    name: row.name,
                    email: row.email,
                    category: row.category,
                    details: []
                };
                acc.push(customer);
            }
            customer.details.push({
                id: row.id,
                code: row.code,
                category: row.category,
                description: row.description
            });
            return acc;
        }, []);
        const updatedCustomer = grouped[0]; // only one customer edited in the grid

        if (updatedCustomer.id === this.facade.selectedCustomer()?.id) {
            this.facade.updateSelectedCustomerDetails(updatedCustomer.details);
        } else {
            // It's a new customer: add to facade
            this.facade.addRow(updatedCustomer);
            // Optionally select it
            this.facade.selectCustomer(updatedCustomer.id);
        }
    }
    onAddDetail() {
        const selected = this.facade.selectedCustomer();
        if (!selected) return;

        const newDetail = {
            tempId: Date.now(),
            id: 0,
            code: '',
            category: 'HW',
            description: ''
        };

        // Update facade
        this.facade.updateSelectedCustomerDetails([
            ...selected.details,
            newDetail
        ]);
    }

    onDeleteDetail(rows: any[]) {
        const customer = this.facade.selectedCustomer();
        if (!customer) return;

        const dbRows = rows.filter(r => r.id && r.id > 0);
        const newRows = rows.filter(r => !r.id || r.id === 0);

        // Remove new rows directly
        let updatedDetails = customer.details.filter(
            d => !newRows.some(r => r.tempId === d.tempId)
        );

        //  If DB rows exist → call API
        if (dbRows.length > 0) {
            const ids = dbRows.map(r => r.id);

            this.facade.deleteCustomerDetails(ids).subscribe(() => {
                // After successful DB delete, remove from UI
                updatedDetails = updatedDetails.filter(
                    d => !ids.includes(d.id)
                );
                this.showSuccess('Customer Detail Deleted Successfully');

                this.facade.updateSelectedCustomerDetails(updatedDetails);
                this.facade.loadCustomers(); // reload to sync with DB
            });

        } else {
            this.facade.updateSelectedCustomerDetails(updatedDetails);
        }
    }

    // Add a new row
    SaveRow() {
        if (!HelperUtil.isFormValid(this.form)) return;

        const customerId = this.form.value.id || Date.now(); // temporary id
        const newRow = {
            id: customerId,
            name: this.form.value.name,
            email: this.form.value.email,
            details: [
                { id: 0, code: '', category: 'HW', description: '' }
            ]
        };

        this.facade.selectCustomer(newRow);
    }

    deleteSelected() {
        if (!this.gridApi) return;

        const selected = this.gridApi.getSelectedRows();

        selected.forEach((row: any) => {
            const customer = this.facade.rows().find((c: any) => c.id === row.customerId);
            if (customer) {
                customer.details = customer.details.filter((d: any) => d.code !== row.code);
            }
        });

        const remaining = this.facade.rows().filter((c: any) => c.details.length > 0);
    }

    clear() {
        this.form.reset();
        this.facade.clearSelectedCustomer();
    }

    loadForEdit(codeObj: { code: string; id: number }, category: string) {
        console.log(codeObj);
        debugger;
        this.facade.loadCustomerById(codeObj.id, category).subscribe((customer: any) => {
            // Fill form
            this.form.patchValue({
                id: customer.id,
                name: customer.name,
                email: customer.email
            });
            // Update facade
            this.facade.selectCustomer(customer);
        });
    }


    save() {
        debugger;
        if (!HelperUtil.isFormValid(this.form)) return;

        const customer = this.facade.selectedCustomer();
        if (!customer) return;

        // Find invalid rows
        const invalidRows = customer.details.filter(d => !d.code?.trim() || !d.category?.trim());
        if (invalidRows.length > 0) {
            this.showError('All rows must have Code and Category.');
            // Force AG Grid to re-evaluate cellClassRules
            if (this.gridApi) {
                this.gridApi.refreshCells({ force: true });
            }
            return;
        }


        // Prepare payload
        const payload = {
            id: this.form.value.id || 0,
            name: this.form.value.name,
            email: this.form.value.email,
            details: customer.details.map(d => ({
                code: d.code,
                category: d.category,
                description: d.description
            }))
        };

        this.facade.save(payload).subscribe({
            next: (savedCustomer) => {
                this.showSuccess('Saved Successfully');
                // 🔥 THIS IS IMPORTANT
                this.facade.loadCustomers();
                this.clear();
            },
            error: (err) => console.error(err)
        });
    }


    onDeleteCustomer() {
        debugger;
        const customer = this.facade.selectedCustomer();
        if (!customer) return;

        if (confirm('Are you sure you want to delete this customer and their details?')) {
            this.facade.deleteCustomer(customer.id).subscribe(() => {
                this.showSuccess('Deleted Successfully');
                this.form.reset();
                this.facade.loadCustomers()
            });
        }
    }

    print() {
        const columnDefs = this.getColumnDefs();
        HelperUtil.PrintGrid(this.facade.selectedCustomer(), columnDefs);
    }

    getColumnDefs() {
        return [
            { headerName: 'id', field: 'id' },
            { headerName: 'code', field: 'code' },
            { headerName: 'name', field: 'name' },
            { headerName: 'category', field: 'category' },
        ]

    }

    showSuccess(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 3000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-success']
        });
    }

    showError(message: string) {
        this.snackBar.open(message, 'Close', {
            duration: 4000,
            horizontalPosition: 'right',
            verticalPosition: 'top',
            panelClass: ['snackbar-error']
        });
    }
}