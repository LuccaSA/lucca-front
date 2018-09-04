import { Routes, Route } from '@angular/router';
import { DemoSelectFoundationsComponent } from './foundations/select-foundations.component';
import { DemoOptionPickerComponent } from './option-picker/option-picker.component';
import { DemoSelectMultipleComponent } from './multiple/select-multiple.component';

export const selectRoutes: Routes = [
	{
		path: 'select',
		label: 'Select',
		children: [
			{
				path: 'foundations',
				label: 'Foundations',
				component: DemoSelectFoundationsComponent,
			} as Route,
			{
				path: 'picker',
				label: 'Picker',
				component: DemoOptionPickerComponent,
			} as Route,
			{
				path: 'multiple',
				label: 'Multiple',
				component: DemoSelectMultipleComponent,
			} as Route,
			{ path: '', redirectTo: 'foundations', pathMatch: 'full' },
		],
	} as Route,
];
