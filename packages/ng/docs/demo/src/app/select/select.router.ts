import { Routes, Route } from '@angular/router';
import { DemoSelectFoundationsComponent } from './foundations/select-foundations.component';
import { DemoOptionPickerComponent } from './option-picker/option-picker.component';
// import { DemoSelectComponent } from './select.component';

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
				label: 'picker',
				component: DemoOptionPickerComponent,
			} as Route,
		// 	{
		// 		path: 'feeder',
		// 		label: 'Feeder',
		// 		component: DemoFeederSelectComponent,
		// 	} as Route,
		// 	{
		// 		path: 'search',
		// 		label: 'Search',
		// 		component: DemoSearcherSelectComponent,
		// 	} as Route,
			// { path: '', component: DemoSelectComponent } as Route,
			{ path: '', redirectTo: 'foundations', pathMatch: 'full' },
		],
	} as Route,
];
