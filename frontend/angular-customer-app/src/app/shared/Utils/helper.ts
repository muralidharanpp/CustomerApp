import { FormGroup } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CustomerDetail } from '../../features/customer/domain/models/customer-detail.model';

export class HelperUtil {

    constructor(private snackBar: MatSnackBar) { }

    public static markFormGroupTouched(formGroup: FormGroup): void {
        formGroup.markAllAsTouched();
    }
    public static markFormGroupPristine(formGroup: FormGroup): void {
        formGroup.markAsPristine();
    }
    public static markFormGroupUntouched(formGroup: FormGroup): void {
        formGroup.markAsUntouched();
    }
    public static resetFormGroup(formGroup: FormGroup): void {
        formGroup.reset();
    }
    public static isFormValid(formGroup: FormGroup): boolean {
        if (formGroup.invalid) {
            this.markFormGroupTouched(formGroup);
            return false;
        }
        return true;
    }

    public static PrintGrid(customer: any, columnDefs: any[]) {

  if (!customer) return;

  // Optional: Add some styles for printing
  const styles = `
    <style>
      body { font-family: Arial, sans-serif; margin: 20px; }
      h2 { text-align: center; }
      table { border-collapse: collapse; width: 100%; margin-top: 20px; }
      th, td { border: 1px solid black; padding: 8px; text-align: center; }
      th { background-color: #f2f2f2; }
    </style>
  `;

  // Main HTML content
  let html = `<h2>Customer Details</h2>`;
  html += `<p><strong>ID:</strong> ${customer.id ?? ''}</p>`;
  html += `<p><strong>Name:</strong> ${customer.name ?? ''}</p>`;
  html += `<p><strong>Email:</strong> ${customer.email ?? ''}</p>`;

  // Table for details
  html += `<table><thead><tr>
    <th>ID</th>
    <th>Code</th>
    <th>Category</th>
  </tr></thead><tbody>`;

  customer.details?.forEach((d: any) => {
    html += `<tr>
      <td>${d.id ?? ''}</td>
      <td>${d.code ?? ''}</td>
      <td>${d.category ?? ''}</td>
    </tr>`;
  });

  html += `</tbody></table>`;

  // Open print window
  const printWindow = window.open('', '', 'width=800,height=600');
  if (printWindow) {
    printWindow.document.write(`<html><head><title>Print Customer</title>${styles}</head><body>`);
    printWindow.document.write(html);
    printWindow.document.write('</body></html>');
    printWindow.document.close();

    // Wait for content to render before printing
    printWindow.onload = () => {
      printWindow.focus();
      printWindow.print();
      printWindow.close();
    };
  }
}
}

    