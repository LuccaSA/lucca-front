import { JsonPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, LOCALE_ID, Pipe, PipeTransform } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
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
	imports: [FormFieldComponent, LuSimpleSelectInputComponent, LuDisplayerDirective, LuTooltipTriggerDirective, LuOptionDirective, FilterColorsPipe, FormsModule, JsonPipe],
	templateUrl: './colors.stories.html',
})
class ColorsStory {
	colors: color[] = [
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
		// { name: 'Blanc', id: 12, background: '#FFF', border: true },
		// { name: 'Noir', id: 13, background: '#000' },
	];
}

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

export const Basic = {};
