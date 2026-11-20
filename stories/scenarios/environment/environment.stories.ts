import { ChangeDetectionStrategy, Component, inject, NgZone } from '@angular/core';
import { SELECT_RESPONSIVE_DIALOG } from '@lucca-front/ng/core-select';
import { scenarioMeta } from '@/helpers/scenarios';
import { Meta, StoryObj } from '@storybook/angular-vite';

/**
 * Shows the runtime every scenario page gets, so a change in the scenarios setup is caught by its test
 * rather than silently weakening every scenario.
 */
@Component({
	selector: 'sb-scenario-environment',
	template: `
		<dl>
			<dt>Change detection</dt>
			<dd data-testid="change-detection">{{ changeDetection }}</dd>
			<dt>Select responsive dialog</dt>
			<dd data-testid="select-responsive-dialog">{{ selectResponsiveDialog }}</dd>
		</dl>
		<!-- Callout markup without CalloutComponent: unstyled when only the consumer global stylesheet is loaded -->
		<div class="callout" data-testid="component-without-its-style">Callout markup without its component</div>
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class ScenarioEnvironmentComponent {
	readonly changeDetection = NgZone.isInAngularZone() ? 'zone.js' : 'zoneless';
	readonly selectResponsiveDialog = inject(SELECT_RESPONSIVE_DIALOG);
}

export default {
	...scenarioMeta('poplee'),
	title: 'Scenarios/Environment',
	tags: ['scenario', '!autodocs'],
	component: ScenarioEnvironmentComponent,
} as Meta<ScenarioEnvironmentComponent>;

export const Basic: StoryObj<ScenarioEnvironmentComponent> = {};
