import { Routes, Route } from '@angular/router';
import { DemoSelectComponent } from './select.component';
import { DemoApiSelectComponent } from './api-select/api-select.component';
import { DemoClearerSelectComponent } from './clearer-select/clearer-select.component';
import { DemoModSelectComponent } from './mod-select/mod-select.component';
import { DemoFeederSelectComponent } from './feeder-select/feeder-select.component';
import { DemoSearcherSelectComponent } from './searcher-select/searcher-select.component';

export const selectRoutes: Routes = [
	{ path: 'select', label: 'Select', children: [
		{ path: 'clearer', label: 'Clear', component: DemoClearerSelectComponent } as Route,
		{ path: 'api', label: 'Api', component: DemoApiSelectComponent } as Route,
		{ path: 'mod', label: 'Mods', component: DemoModSelectComponent } as Route,
		{ path: 'feeder', label: 'Feeder', component: DemoFeederSelectComponent } as Route,
		{ path: 'searcher', label: 'Search', component: DemoSearcherSelectComponent } as Route,
		{ path: '', component: DemoSelectComponent } as Route,
	]} as Route,
];
