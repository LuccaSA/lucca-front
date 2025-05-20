import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { FormsModule } from '@angular/forms';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { StoryModelDisplayComponent } from '../../../../helpers/story-model-display.component';
import { Component, input } from '@angular/core';
import { LuMultiDisplayerDirective, LuMultiSelectCounterDisplayerComponent } from '@lucca-front/ng/multi-select';
import { LuDisplayerDirective, LuOptionDirective } from '@lucca-front/ng/core-select';

@Component({
	selector: 'demo-child-component',
	imports: [LuMultiSelectInputComponent, LuMultiSelectCounterDisplayerComponent, LuOptionDirective, LuMultiDisplayerDirective, FilterLegumesPipe, LuSimpleSelectInputComponent, LuDisplayerDirective],
	template: `
		@if (multiple()) {
			<lu-multi-select #selectRef data-qa="cost-center-multi-select" [options]="legumes | filterLegumes: clue" clearable (clueChange)="clue = $event">
				<ng-container *luOption="let costCenter; select: selectRef">{{ costCenter.name }}</ng-container>
				<ng-container *luMultiDisplayer="let costCenters; select: selectRef">
					<lu-multi-select-counter-displayer label="Selected" [selected]="costCenters" />
				</ng-container>
			</lu-multi-select>
		} @else {
			<lu-simple-select #selectRef data-qa="cost-center-simple-select" [options]="legumes | filterLegumes: clue" clearable (clueChange)="clue = $event">
				<ng-container *luOption="let costCenter; select: selectRef">{{ costCenter.name }}</ng-container>
				<ng-container *luDisplayer="let costCenter; select: selectRef">{{ costCenter.name }}</ng-container>
			</lu-simple-select>
		}
	`,
})
class MyChildComponent {
	legumes = allLegumes;
	clue: string;
	multiple = input<boolean>(false);
}

export default {
	title: 'Documentation/Forms/FiltersPills/FilterPills/Child Select',
	decorators: [
		moduleMetadata({
			imports: [
				FilterPillComponent,
				CheckboxInputComponent,
				FormsModule,
				DateRangeInputComponent,
				DateInputComponent,
				StoryModelDisplayComponent,
				LuSimpleSelectInputComponent,
				LuMultiSelectInputComponent,
				FilterLegumesPipe,
				FormFieldComponent,
				TextInputComponent,
				MyChildComponent,
			],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			props: {
				simpleSelect: null,
				multiSelect: [],
				date: null,
				dateRange: null,
				legumes: allLegumes,
			},

			template: `<lu-filter-pill label="Test inner select">
	<demo-child-component></demo-child-component>
</lu-filter-pill>`,
		};
	},
} as Meta;

export const Basic: StoryObj<FilterPillComponent> = {
	args: {},
};
