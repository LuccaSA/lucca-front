import { Routes, Route } from '@angular/router';
import { DemoTooltipComponent } from './tooltip.component';

export const tooltipRoutes: Routes = [
	{
		path: 'tooltip',
		label: 'Tooltip',
		component: DemoTooltipComponent,
	} as Route,
];
