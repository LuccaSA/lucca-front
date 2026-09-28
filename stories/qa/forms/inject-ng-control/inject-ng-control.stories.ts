import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { form, FormField } from '@angular/forms/signals';
import { FormFieldComponent, InputDirective } from '@lucca-front/ng/form-field';
import {
	CheckboxInputComponent,
	ColorInputComponent,
	ColorOption,
	NumberFormatInputComponent,
	NumberInputComponent,
	RadioComponent,
	RadioGroupInputComponent,
	SwitchInputComponent,
	TextareaInputComponent,
	TextInputComponent,
} from '@lucca-front/ng/forms';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

const PALETTE: ColorOption[] = [
	{ index: 0, background: '#E53935', name: 'Crimson' },
	{ index: 1, background: '#FB8C00', name: 'Amber' },
	{ index: 2, background: '#FDD835', name: 'Sunflower' },
	{ index: 3, background: '#43A047', name: 'Fern' },
	{ index: 4, background: '#00ACC1', name: 'Teal' },
	{ index: 5, background: '#1E88E5', name: 'Cobalt' },
	{ index: 6, background: '#8E24AA', name: 'Violet' },
	{ index: 7, background: '#6D4C41', name: 'Mocha' },
];

const SEASONS = [
	{ value: 'spring', label: 'Spring' },
	{ value: 'summer', label: 'Summer' },
	{ value: 'autumn', label: 'Autumn' },
	{ value: 'winter', label: 'Winter' },
];

// ─── formControl story ───────────────────────────────────────────────────────

@Component({
	selector: 'inject-ng-control-form-control-stories',
	templateUrl: './inject-ng-control-form-control.stories.html',
	imports: [
		ReactiveFormsModule,
		FormFieldComponent,
		InputDirective,
		TextInputComponent,
		CheckboxInputComponent,
		SwitchInputComponent,
		RadioGroupInputComponent,
		RadioComponent,
		NumberInputComponent,
		NumberFormatInputComponent,
		TextareaInputComponent,
		ColorInputComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class InjectNgControlFormControlStory {
	readonly textControl = new FormControl<string>('');
	readonly checkboxControl = new FormControl<boolean>(false);
	readonly switchControl = new FormControl<boolean>(false);
	readonly radioControl = new FormControl<string>('summer');
	readonly numberControl = new FormControl<number | null>(null);
	readonly numberFormatControl = new FormControl<number | null>(null);
	readonly textareaControl = new FormControl<string>('');
	readonly colorControl = new FormControl<string | null>(null);
	readonly segmentedControl = new FormControl<string>('summer');

	readonly palette: ColorOption[] = PALETTE;
	readonly seasons = SEASONS;
}

// ─── formField (signal forms) story ─────────────────────────────────────────

interface RecipeFormModel {
	title: string;
	notes: string;
	servings: number | null;
	price: number | null;
	season: string;
	vegetarian: boolean;
	published: boolean;
	color: string | null;
	difficulty: string;
}

@Component({
	selector: 'inject-ng-control-form-field-stories',
	templateUrl: './inject-ng-control-form-field.stories.html',
	imports: [
		FormField,
		FormFieldComponent,
		InputDirective,
		TextInputComponent,
		CheckboxInputComponent,
		SwitchInputComponent,
		RadioGroupInputComponent,
		RadioComponent,
		NumberInputComponent,
		NumberFormatInputComponent,
		TextareaInputComponent,
		ColorInputComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class InjectNgControlFormFieldStory {
	readonly model = signal<RecipeFormModel>({
		title: '',
		notes: '',
		servings: null,
		price: null,
		season: 'summer',
		vegetarian: false,
		published: false,
		color: null,
		difficulty: 'easy',
	});

	readonly recipeForm = form(this.model);

	readonly palette: ColorOption[] = PALETTE;
	readonly seasons = SEASONS;
}

// ─── Meta & exports ───────────────────────────────────────────────────────────

export default {
	title: 'QA/Forms/InjectNgControl',
	decorators: [
		moduleMetadata({
			imports: [InjectNgControlFormControlStory, InjectNgControlFormFieldStory],
		}),
	],
} as Meta;

export const WithFormControl: StoryObj<InjectNgControlFormControlStory> = {
	args: {},
	render: () => ({ template: '<inject-ng-control-form-control-stories />' }),
};

export const WithFormField: StoryObj<InjectNgControlFormFieldStory> = {
	args: {},
	render: () => ({ template: '<inject-ng-control-form-field-stories />' }),
};
