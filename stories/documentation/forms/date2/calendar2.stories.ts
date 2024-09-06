import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { FormsModule } from '@angular/forms';
import { Calendar2Component } from '../../../../packages/ng/date2/calendar2/calendar2.component';
import { LOCALE_ID } from '@angular/core';

export default {
	title: 'Documentation/Forms/Date2/Calendar2',
	component: Calendar2Component,
	decorators: [
		moduleMetadata({
			imports: [Calendar2Component, FormsModule],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
