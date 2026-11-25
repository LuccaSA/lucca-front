import { inject } from '@angular/core';
import { ActivatedRoute, ActivatedRouteSnapshot, CanActivateFn, ResolveFn, Router, Routes } from '@angular/router';
import { provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { createDialogRoute, defaultOnClosedFn } from '@lucca-front/ng/dialog';
import { HarvestDetailComponent } from './harvest-detail.component';
import { HarvestFormComponent } from './harvest-form.component';
import { currentGardenerId, varietyNames } from './harvest-planning.data';
import { HarvestPlanningComponent } from './harvest-planning.component';
import { HarvestStore } from './harvest.store';

const harvestId = (route: ActivatedRouteSnapshot): number => Number(route.paramMap.get('id'));

/** An unknown harvest leads back to the planning. */
const harvestExists: CanActivateFn = (route) => !!inject(HarvestStore).get(harvestId(route)) || inject(Router).createUrlTree(['/harvests']);

const harvestTitle: ResolveFn<string> = (route) => varietyNames(inject(HarvestStore).get(harvestId(route))!);

/** Id of the harvest whose edit dialog is open: the dialog route sits under the `:id` route. */
const editedHarvestId = (): number => harvestId(inject(ActivatedRoute).parent!.snapshot);

export const harvestPlanningRoutes: Routes = [
	{
		path: '',
		// Provided at the feature level, as an application does for the pages that need it
		providers: [provideCoreSelectCurrentUserId(() => currentGardenerId)],
		children: [
			{ path: '', title: 'Planning des récoltes', component: HarvestPlanningComponent },
			{
				path: ':id',
				title: harvestTitle,
				canActivate: [harvestExists],
				component: HarvestDetailComponent,
				children: [
					createDialogRoute<HarvestFormComponent>({
						path: 'edit',
						component: HarvestFormComponent,
						dataFactory: () => ({ harvest: inject(HarvestStore).get(editedHarvestId()) ?? null }),
						dialogConfigFactory: () => ({ mode: 'drawer', size: 'M' }),
						// A guard rather than the `canClose` of the dialog: it also runs when the browser history leaves the route
						canDeactivate: [(form: HarvestFormComponent) => form.confirmDismiss()],
						onClosed: (draft) => {
							inject(HarvestStore).update(editedHarvestId(), draft);
							defaultOnClosedFn();
						},
					}),
				],
			},
		],
	},
];
