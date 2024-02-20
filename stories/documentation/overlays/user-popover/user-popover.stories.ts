import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { OverlayModule } from '@angular/cdk/overlay';
import {
	LuEmployeeCardTriggerDirective
} from '@lucca-front/ng/popup-employee';
import { provideHttpClient } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export default {
	title: 'Documentation/Overlays/user-popover',
	decorators: [
		applicationConfig({
			providers: [provideHttpClient()],
		}),
		moduleMetadata({
			imports: [BrowserAnimationsModule, OverlayModule, LuEmployeeCardTriggerDirective],
		}),
	],
	render: () => {
		return {
			props: {user: {id: 1, firstName: 'David', lastName: 'Hernandez'}},
			template: `<div [luEmployeeCard]="user">Coucou !</div>`,
		};
	},
} as Meta;

export const Template: StoryObj = {};
