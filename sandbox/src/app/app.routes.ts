import { Routes } from '@angular/router';
import { DataTableComponent } from './pages/data-table/data-table.component';
import { HomeComponent } from './pages/home/home.component';

export const routes: Routes = [
	{
		path: 'data-table',
		component: DataTableComponent,
	},
	{
		path: '',
		component: HomeComponent,
	},
];
