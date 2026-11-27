import { Routes } from '@angular/router';

/** Each scenario page is a lazy loaded feature, as in consuming applications. */
export const routes: Routes = [
	{ path: '', pathMatch: 'full', redirectTo: 'harvests' },
	{ path: 'harvests', loadChildren: () => import('./harvest-planning/harvest-planning.routes').then((m) => m.harvestPlanningRoutes) },
	{ path: '**', redirectTo: 'harvests' },
];
