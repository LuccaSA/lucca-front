import { allLegumes } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { DropdownActionComponent, DropdownItemComponent, DropdownMenuComponent, LuDropdownTriggerDirective } from '@lucca-front/ng/dropdown';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent, FilterViewSelectorComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { SegmentedControlComponent, SegmentedControlFilterComponent } from '@lucca-front/ng/segmented-control';
import { SegmentedControlTabsComponent, SegmentedControlTabsPanelComponent } from '@lucca-front/ng/segmented-control-tabs';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular-vite';
import { StoryModelDisplayComponent } from '@/helpers/story-model-display.component';

@Component({
	selector: 'filter-bar-stories',
	templateUrl: './filter-bar.stories.html',
	// Simulates the narrow and touch layouts, which depend on the viewport and the pointer
	styleUrl: './filter-bar.stories.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [
		FilterBarComponent,
		FilterPillComponent,
		FilterViewSelectorComponent,
		CheckboxInputComponent,
		FormsModule,
		DateRangeInputComponent,
		DateInputComponent,
		StoryModelDisplayComponent,
		ButtonComponent,
		LuSimpleSelectInputComponent,
		FilterPillAddonAfterDirective,
		FilterPillAddonBeforeDirective,
		FormFieldComponent,
		TextInputComponent,
		NumericBadgeComponent,
		LuMultiSelectInputComponent,
		SegmentedControlComponent,
		SegmentedControlFilterComponent,
		SegmentedControlTabsComponent,
		SegmentedControlTabsPanelComponent,
		IconComponent,
		DropdownMenuComponent,
		DropdownItemComponent,
		DropdownActionComponent,
		LuDropdownTriggerDirective,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FilterBarStory {
	legumes = allLegumes;
	legumesPluralFn = (count: number) => `${count} légumes`;

	views = [
		{ id: 1, name: 'Potager' },
		{ id: 2, name: 'Verger' },
		{ id: 3, name: 'Serre' },
		{ id: 4, name: 'Massifs' },
		{ id: 5, name: 'Pelouse' },
		{ id: 6, name: 'Haies' },
	];

	// The selector compares views by reference
	selectedView = this.views[0];
}

export default {
	title: 'QA/FilterBar',
	component: FilterBarStory,
	decorators: [applicationConfig({ providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'fr-FR' }] })],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FilterBarStory> = {
	args: {},
	render: template,
};
