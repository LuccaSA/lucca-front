import { LOCALE_ID } from '@angular/core';
import { FormLabelComponent } from '@lucca-front/ng/form-label';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface FormLabelBasicStory {
	for: string;
	required: boolean;
	label: string;
	tooltip: string;
	tag: string;
	tagPalette: string;
	size: string;
	counterMax: number;
	counterStatus: number;
	counterId: string;
	labelId: string;
	error: boolean;
}

export default {
	title: 'Documentation/Forms/Form Label/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [FormLabelComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {
		size: {
			options: ['', 'S', 'XS'],
			control: {
				type: 'select',
			},
		},
		tagPalette: {
			options: [
				'none',
				'product',
				'neutral',
				'success',
				'warning',
				'error',
				'kiwi',
				'lime',
				'cucumber',
				'mint',
				'glacier',
				'lagoon',
				'blueberry',
				'lavender',
				'grape',
				'watermelon',
				'pumpkin',
				'pineapple',
			],
			control: {
				type: 'select',
			},
			if: { arg: 'tag', truthy: true },
		},
		counterStatus: {
			if: { arg: 'counterMax', truthy: true },
			control: {
				min: 0,
				step: 1,
			},
		},
		counterId: {
			if: { arg: 'counterMax', truthy: true },
		},
		labelId: {
			if: { arg: 'counterMax', truthy: true },
		},
		counterMax: {
			control: {
				min: 0,
				step: 1,
			},
		},
	},
} as Meta;

function getTemplate(args: FormLabelBasicStory): string {
	const requiredAttr = args.required ? ` required` : ``;
	const tooltipAttr = args.tooltip ? ` tooltip="${args.tooltip}"` : ``;
	const tagAttr = args.tag ? ` tag="${args.tag}"` : ``;
	const tagPaletteAttr = args.tag && args.tagPalette !== 'none' ? ` tagPalette="${args.tagPalette}"` : ``;
	const sizeAttr = args.size ? ` size="${args.size}"` : ``;
	const counterMaxAttr = args.counterMax > 0 ? ` counterMax="${args.counterMax}"` : ``;
	const counterStatusAttr = args.counterMax > 0 ? ` counterStatus="${args.counterStatus}"` : ``;
	const counterIdAttr = args.counterMax > 0 ? ` counterId="${args.counterId}"` : ``;
	const labelIdAttr = args.counterMax > 0 ? ` labelId="${args.labelId}"` : ``;
	const errorAttr = args.error ? ` error` : ``;

	return `<lu-form-label for="${args.for}"${tooltipAttr}${tagAttr}${tagPaletteAttr}${sizeAttr}${counterMaxAttr}${counterStatusAttr}${counterIdAttr}${labelIdAttr}${requiredAttr}${errorAttr}>${args.label}</lu-form-label>`;
}

const Template = (args: FormLabelBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<FormLabelBasicStory> = {
	args: {
		for: 'inputID',
		label: 'Label',
		tooltip: '',
		tag: '',
		tagPalette: 'none',
		required: false,
		size: '',
		counterMax: 0,
		counterStatus: 0,
		counterId: 'counterID',
		labelId: 'labelID',
		error: false,
	},
	render: Template,
};
