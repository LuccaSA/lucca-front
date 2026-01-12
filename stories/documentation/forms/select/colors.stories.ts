import { ChangeDetectionStrategy, Component, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ColorComponent } from '@lucca-front/ng/color';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { ColorInputComponent, ColorOption } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta } from '@storybook/angular';

@Pipe({ name: 'filterColors', standalone: true })
export class FilterColorsPipe implements PipeTransform {
	transform(colors: ColorOption[], clue: string): ColorOption[] {
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
	decoratives500: ColorOption[] = [
		{ name: 'Myrtille', id: 0, background: 'var(--palettes-blueberry-500)' },
		{ name: 'Concombre', id: 1, background: 'var(--palettes-cucumber-500)' },
		{ name: 'Glacier', id: 2, background: 'var(--palettes-glacier-500)' },
		{ name: 'Raisin', id: 3, background: 'var(--palettes-grape-500)' },
		{ name: 'Kiwi', id: 4, background: 'var(--palettes-kiwi-500)' },
		{ name: 'Lagon', id: 5, background: 'var(--palettes-lagoon-500)' },
		{ name: 'Lavande', id: 6, background: 'var(--palettes-lavender-500)' },
		{ name: 'Citron', id: 7, background: 'var(--palettes-lime-500)' },
		{ name: 'Menthe', id: 8, background: 'var(--palettes-mint-500)' },
		{ name: 'Ananas', id: 9, background: 'var(--palettes-pineapple-500)' },
		{ name: 'Citrouille', id: 10, background: 'var(--palettes-pumpkin-500)' },
		{ name: 'Pastèque', id: 11, background: 'var(--palettes-watermelon-500)' },
	];

	decoratives50: ColorOption[] = [
		{ name: 'Myrtille 50', id: 0, background: 'var(--palettes-blueberry-50)', borderColor: 'var(--palettes-blueberry-500)' },
		{ name: 'Concombre 50', id: 1, background: 'var(--palettes-cucumber-50)', borderColor: 'var(--palettes-cucumber-500)' },
		{ name: 'Glacier 50', id: 2, background: 'var(--palettes-glacier-50)', borderColor: 'var(--palettes-glacier-500)' },
		{ name: 'Raisin 50', id: 3, background: 'var(--palettes-grape-50)', borderColor: 'var(--palettes-grape-500)' },
		{ name: 'Kiwi 50', id: 4, background: 'var(--palettes-kiwi-50)', borderColor: 'var(--palettes-kiwi-500)' },
		{ name: 'Lagon 50', id: 5, background: 'var(--palettes-lagoon-50)', borderColor: 'var(--palettes-lagoon-500)' },
		{ name: 'Lavande 50', id: 6, background: 'var(--palettes-lavender-50)', borderColor: 'var(--palettes-lavender-500)' },
		{ name: 'Citron 50', id: 7, background: 'var(--palettes-lime-50)', borderColor: 'var(--palettes-lime-500)' },
		{ name: 'Menthe 50', id: 8, background: 'var(--palettes-mint-50)', borderColor: 'var(--palettes-mint-500)' },
		{ name: 'Ananas 50', id: 9, background: 'var(--palettes-pineapple-50)', borderColor: 'var(--palettes-pineapple-500)' },
		{ name: 'Citrouille 50', id: 10, background: 'var(--palettes-pumpkin-50)', borderColor: 'var(--palettes-pumpkin-500)' },
		{ name: 'Pastèque 50', id: 11, background: 'var(--palettes-watermelon-50)', borderColor: 'var(--palettes-watermelon-500)' },
	];

	neutral: ColorOption[] = [
		{ name: 'Neutral 1000', id: 0, background: 'black' },
		{ name: 'Neutral 900', id: 1, background: 'var(--palettes-neutral-900)' },
		{ name: 'Neutral 800', id: 2, background: 'var(--palettes-neutral-800)' },
		{ name: 'Neutral 700', id: 3, background: 'var(--palettes-neutral-700)' },
		{ name: 'Neutral 600', id: 4, background: 'var(--palettes-neutral-600)' },
		{ name: 'Neutral 500', id: 5, background: 'var(--palettes-neutral-500)' },
		{ name: 'Neutral 400', id: 6, background: 'var(--palettes-neutral-400)', borderColor: 'var(--palettes-neutral-500)' },
		{ name: 'Neutral 300', id: 7, background: 'var(--palettes-neutral-300)', borderColor: 'var(--palettes-neutral-500)' },
		{ name: 'Neutral 200', id: 8, background: 'var(--palettes-neutral-200)', borderColor: 'var(--palettes-neutral-500)' },
		{ name: 'Neutral 100', id: 9, background: 'var(--palettes-neutral-100)', borderColor: 'var(--palettes-neutral-500)' },
		{ name: 'Neutral 50', id: 10, background: 'var(--palettes-neutral-50)', borderColor: 'var(--palettes-neutral-500)' },
		{ name: 'Neutral 0', id: 11, background: 'var(--palettes-neutral-0)', borderColor: 'var(--palettes-neutral-500)' },
	];

	lucca: ColorOption[] = [
		{ name: 'Temps et activités', id: 0, background: 'var(--palettes-timmi-700)' },
		{ name: 'Dépenses professionnelles', id: 0, background: 'var(--palettes-cleemy-700)' },
		{ name: 'Talent', id: 0, background: 'var(--palettes-poplee-700)' },
		{ name: 'Rémunérations et avantages', id: 0, background: 'var(--palettes-pagga-700)' },
		{ name: 'Gestion administrative', id: 0, background: 'var(--palettes-coreHR-700)' },
	];
}

export default {
	title: 'Documentation/Forms/Colors',
	component: ColorsStory,
	argTypes: {
		size: {
			options: ['', 'S'],
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
		},
	},
	decorators: [
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
} as Meta;

export const Basic = {
	args: { clearable: false, noSearch: false, size: '' },
};
