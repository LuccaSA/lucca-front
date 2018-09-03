import { Routes, Route } from '@angular/router';
import { DemoSelectFoundationsComponent } from './foundations/select-foundations.component';
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
		// 	{
		// 		path: 'mod',
		// 		label: 'Mods',
		// 		component: DemoModSelectComponent,
		// 	} as Route,
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
		],
	} as Route,
];
