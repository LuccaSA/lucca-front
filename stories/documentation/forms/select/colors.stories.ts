import { ChangeDetectionStrategy, Component, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from '@lucca-front/ng/color';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta } from '@storybook/angular';

type color = {
	name: string;
	id: number;
	background: string;
	border?: boolean;
};

@Pipe({ name: 'filterColors', standalone: true })
export class FilterColorsPipe implements PipeTransform {
	transform(colors: color[], clue: string): color[] {
		return clue ? colors?.filter((color) => color.name.toLowerCase().includes(clue.toLowerCase())) : colors;
	}
}

@Component({
	changeDetection: ChangeDetectionStrategy.OnPush,
	selector: 'colors-story',
	imports: [FormFieldComponent, LuSimpleSelectInputComponent, LuTooltipTriggerDirective, LuDisplayerDirective, LuOptionDirective, FilterColorsPipe, FormsModule, ColorInputComponent, ColorComponent],
	templateUrl: './colors.stories.html',
})
class ColorsStory {
	decoratives300: color[] = [
		{ name: 'Myrtille', id: 0, background: 'var(--palettes-blueberry-300)' },
		{ name: 'Concombre', id: 1, background: 'var(--palettes-cucumber-300)' },
		{ name: 'Glacier', id: 2, background: 'var(--palettes-glacier-300)' },
		{ name: 'Raisin', id: 3, background: 'var(--palettes-grape-300)' },
		{ name: 'Kiwi', id: 4, background: 'var(--palettes-kiwi-300)' },
		{ name: 'Lagon', id: 5, background: 'var(--palettes-lagoon-300)' },
		{ name: 'Lavande', id: 6, background: 'var(--palettes-lavender-300)' },
		{ name: 'Citron', id: 7, background: 'var(--palettes-lime-300)' },
		{ name: 'Menthe', id: 8, background: 'var(--palettes-mint-300)' },
		{ name: 'Ananas', id: 9, background: 'var(--palettes-pineapple-300)' },
		{ name: 'Citrouille', id: 10, background: 'var(--palettes-pumpkin-300)' },
		{ name: 'Pastèque', id: 11, background: 'var(--palettes-watermelon-300)' },
	];

	neutral: color[] = [
		{ name: 'Neutral 1000', id: 0, background: 'black' },
		{ name: 'Neutral 900', id: 1, background: 'var(--palettes-neutral-900)' },
		{ name: 'Neutral 800', id: 2, background: 'var(--palettes-neutral-800)' },
		{ name: 'Neutral 700', id: 3, background: 'var(--palettes-neutral-700)' },
		{ name: 'Neutral 600', id: 4, background: 'var(--palettes-neutral-600)' },
		{ name: 'Neutral 500', id: 5, background: 'var(--palettes-neutral-500)' },
		{ name: 'Neutral 400', id: 6, background: 'var(--palettes-neutral-400)' },
		{ name: 'Neutral 300', id: 7, background: 'var(--palettes-neutral-300)' },
		{ name: 'Neutral 200', id: 8, background: 'var(--palettes-neutral-200)' },
		{ name: 'Neutral 100', id: 9, background: 'var(--palettes-neutral-100)' },
		{ name: 'Neutral 50', id: 10, background: 'var(--palettes-neutral-50)' },
		{ name: 'Neutral 0', id: 11, background: 'var(--palettes-neutral-0)', border: true },
	];

	lucca: color[] = [
		{ name: 'Temps et activités', id: 0, background: 'var(--palettes-timmi-700)' },
		{ name: 'Dépenses professionnelles', id: 0, background: 'var(--palettes-cleemy-700)' },
		{ name: 'Talent', id: 0, background: 'var(--palettes-poplee-700)' },
		{ name: 'Rémunérations et avantages', id: 0, background: 'var(--palettes-pagga-700)' },
		{ name: 'Gestion administrative', id: 0, background: 'var(--palettes-coreHR-700)' },
	];
}

/*
'brand': $brand,
	'cleemy': $cleemy,
	'timmi': $timmi,
	'poplee': $poplee,
	'coreHR': $coreHR,
	'pagga': $pagga,
	'cc': $cc,
*/

export default {
	title: 'Documentation/Forms/SimpleSelect/Colors',
	component: ColorsStory,
	argTypes: {},
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

export const Basic = {
	args: { clearable: false, searchable: false, small: false },
};
