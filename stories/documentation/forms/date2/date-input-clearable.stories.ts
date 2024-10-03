import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from '../../../helpers/story-model-display.component';

export default {
	title: 'Documentation/Forms/Date2/DateInput',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormsModule, IconComponent, StoryModelDisplayComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {},
	render: (args) => {
		const { min, max, selected } = args;
		return {
			props: {},
			template: `
			<lu-date-input [clearable]="true" [(ngModel)]="selected" [min]="min" [max]="max"></lu-date-input>
			<pr-story-model-display>{{selected}}</pr-story-model-display>
			`,
		};
	},
} as Meta;

export const Clearable: StoryObj<DateInputComponent> = {};
