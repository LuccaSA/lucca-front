import { allLegumes, FilterLegumesPipe } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuCoreSelectApiV4Directive } from '@lucca-front/ng/core-select/api';
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FilterBarComponent, FilterPillAddonAfterDirective, FilterPillAddonBeforeDirective, FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { NumericBadgeComponent } from '@lucca-front/ng/numeric-badge';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

@Component({
	selector: 'filter-bar-stories',
	templateUrl: './filter-bar.stories.html',
	imports: [
		FilterBarComponent,
		FilterPillComponent,
		CheckboxInputComponent,
		FormsModule,
		DateRangeInputComponent,
		DateInputComponent,
		StoryModelDisplayComponent,
		ButtonComponent,
		LuSimpleSelectInputComponent,
		FilterLegumesPipe,
		FilterPillAddonAfterDirective,
		FilterPillAddonBeforeDirective,
		FormFieldComponent,
		TextInputComponent,
		NumericBadgeComponent,
		LuCoreSelectApiV4Directive,
		LuMultiSelectInputComponent,
	],
})
class FilterBarStory {
	legumes = allLegumes;
}

export default {
	title: 'QA/FilterBar',
	component: FilterBarStory,
	decorators: [applicationConfig({ providers: [provideHttpClient(), { provide: LOCALE_ID, useValue: 'fr-FR' }] })],
} as Meta;

const template = () => ({});

export const basic: StoryObj<FilterBarStory> = {
	args: {},
	render: template,
};
