import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DateInputComponent } from '@lucca-front/ng/date2';
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
	argTypes: {
		min: {
			control: 'date',
		},
		max: {
			control: 'date',
		},
		selected: {
			control: 'date',
		},
	},
	render: (args) => {
		const { min, max, selected } = args;
		return {
			props: {
				selected: selected || new Date(),
				min: min ? new Date(min) : null,
				max: max ? new Date(max) : null,
			},
			styles: [
				`
					lu-date-input {
						max-width: 16.25rem;
						display: block;
						margin-bottom: 2rem;
					}
				`,
			],
			template: `
			<lu-date-input [(ngModel)]="selected" [min]="min" [max]="max"></lu-date-input>


			<pr-story-model-display>{{selected}}</pr-story-model-display>
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent> = {};
