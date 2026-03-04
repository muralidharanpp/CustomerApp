import { Component, Input, Output, EventEmitter } from '@angular/core';
import { AgGridAngular } from 'ag-grid-angular';
import { ColDef, GridApi } from 'ag-grid-community';
import { CommonModule } from '@angular/common';

@Component({
    selector: 'app-editable-grid',
    standalone: true,
    imports: [CommonModule, AgGridAngular],
    templateUrl: './editable-grid.component.html'
})
export class EditableGridComponent {

    @Input() rowData: any[] = [];
    @Output() rowDataChange = new EventEmitter<any[]>();
    @Output() rowSelected = new EventEmitter<any>();
    @Output() addDetailRequest = new EventEmitter<void>();
    @Output() deleteDetailRequest = new EventEmitter<any[]>();



    gridApi!: GridApi;

    categoryOptions = [
        { label: 'Hardware', value: 'HW' },
        { label: 'Software', value: 'SW' }
    ];

    defaultColDef = {
        resizable: true,
        sortable: true,
        filter: true,
        editable: true,
        flex: 1,
        cellStyle: { 'display': 'flex', 'align-items': 'center' },
        headerClass: 'text-center'
        };

    paginationPageSize = 10;

    columnDefs: ColDef[] = [
        { field: 'id', headerName: 'ID', cellStyle: { 'display': 'flex', 'align-items': 'center'}  , editable: false, cellClass: 'readonly-cell',width: 100,  hide: true },
        {
            field: 'code',
            headerName: 'Code',
            editable: true,
            width:300,
            valueGetter: (params: any) => {
                return params.data.code;
            },
            valueSetter: (params: any) => {
                // Update the row data
                params.data.code = params.newValue;
                return true; // indicate that the value changed
            },
            onCellValueChanged: (params) => this.onCellValueChanged(params),
            cellClassRules: {
                    'invalid-cell': params => !params.value || params.value.trim() === ''
                    },
                    cellStyle: { 'display': 'flex', 'align-items': 'center' } 
        },
        { field: 'name', headerName: 'Name', width: 300, editable: false, cellStyle: { 'display': 'flex', 'align-items': 'center', } , onCellValueChanged: (params) => this.onCellValueChanged(params) },
        {
            field: 'category',
            headerName: 'Category',
            editable: true,
            cellEditor: 'agSelectCellEditor',
            width:210,
            cellEditorParams: { values: this.categoryOptions.map(x => x.value) },
            valueFormatter: (params) => {
                const option = this.categoryOptions.find(x => x.value === params.value);
                return option ? option.label : params.value;
            },
            onCellValueChanged: (params) => this.onCellValueChanged(params),
            cellClassRules: {
                'invalid-cell': params => !params.value || params.value.trim() === ''
                }
                ,cellStyle: { 'display': 'flex', 'align-items': 'center' } 
        },
    ];
   

    onGridReady(params: any) {
        this.gridApi = params.api;
    }

    onCellValueChanged(event: any) {
        debugger;
        this.rowDataChange.emit(this.rowData);
    }

    onSelectionChanged() {
        const selected = this.gridApi.getSelectedRows();
        if (selected.length) {
            this.rowSelected.emit(selected[0]);
        }
    }
    addDetailClicked() {
        this.addDetailRequest.emit(); // let parent handle the actual add
    }
    deleteDetailClicked() {
        if (!this.gridApi) return;

        const selected = this.gridApi.getSelectedRows();
        this.deleteDetailRequest.emit(selected); // let parent handle the actual delete
    }

    deleteSelected() {
        const selected = this.gridApi.getSelectedRows();
        this.rowData = this.rowData.filter(r => !selected.includes(r));
        this.gridApi.applyTransaction({ remove: selected });
    }

}