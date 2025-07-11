import { LOCALE_ID } from '@angular/core';
import { Calendar2Component } from '@lucca-front/ng/date2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { allLegumes, ILegume } from '@/stories/forms/select/select.utils';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { TreeSelectDirective } from '@lucca-front/ng/core-select/tree';

export default {
	title: 'Documentation/Forms/TreeSelect',
	decorators: [
		moduleMetadata({
			imports: [LuMultiSelectInputComponent, TreeSelectDirective],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {},
	render: (args, { argTypes }) => {
		return {
			props: {
				allLegumes: allLegumes,
				groupingFn: (legume: ILegume) => {
					const parent = allLegumes.find((l) => l.color === legume.color);
					if (parent === legume) {
						return null;
					}
					return parent;
				},
			},
			template: `<lu-multi-select [treeSelect]="groupingFn" [options]="allLegumes"></lu-multi-select>`,
		};
	},
} as Meta;

export const Basic: StoryObj<Calendar2Component> = {};
