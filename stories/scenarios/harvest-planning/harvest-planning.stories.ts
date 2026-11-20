import { scenarioHandlers, scenarioMeta } from '@/helpers/scenarios';
import { provideHttpClient } from '@angular/common/http';
import { LOCALE_ID } from '@angular/core';
import { provideCoreSelectCurrentUserId } from '@lucca-front/ng/core-select/user';
import { configureLuDialog } from '@lucca-front/ng/dialog';
import { provideLuModal } from '@lucca-front/ng/modal';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';
import { HarvestPlanningComponent } from './harvest-planning.component';
import { currentGardenerId } from './harvest-planning.data';
import { harvestPlanningHandlers } from './harvest-planning.handlers';

const scenario = scenarioMeta('poplee');

export default {
	...scenario,
	title: 'Scenarios/HarvestPlanning',
	tags: ['scenario', '!autodocs'],
	parameters: {
		...scenario.parameters,
		a11y: {
			...scenario.parameters.a11y,
			config: {
				rules: [
					// axe false positive: `lu-main-layout` is a `role="main"` landmark, so the `<header>` of the page
					// header it contains has no banner role (HTML-AAM, and axe's own role computation), but the rule
					// only skips headers inside a native `<main>` element.
					{ id: 'landmark-banner-is-top-level', enabled: false },
				],
			},
		},
	},
	component: HarvestPlanningComponent,
	loaders: [scenarioHandlers(harvestPlanningHandlers)],
	decorators: [
		...scenario.decorators,
		// What a consuming application provides at its root
		applicationConfig({
			providers: [provideHttpClient(), configureLuDialog(), provideLuModal(), provideCoreSelectCurrentUserId(() => currentGardenerId), { provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta<HarvestPlanningComponent>;

export const Basic: StoryObj<HarvestPlanningComponent> = {};
