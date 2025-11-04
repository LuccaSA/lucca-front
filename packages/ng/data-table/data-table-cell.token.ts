import { InjectionToken } from '@angular/core';
import { DataTableRowCellHeaderComponent } from './data-table-cell-header/data-table-cell-header.component';
import { DataTableRowCellComponent } from './data-table-cell/data-table-cell.component';

export const LU_DATA_TABLE_CELL_INSTANCE = new InjectionToken<DataTableRowCellComponent | DataTableRowCellHeaderComponent>('LU_DATA_TABLE_CELL_INSTANCE');
