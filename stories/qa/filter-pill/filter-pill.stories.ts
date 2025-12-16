import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { Component, LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuCoreSelectDepartmentsDirective } from '@lucca-front/ng/core-select/department'; // v20.2
import { DateInputComponent, DateRangeInputComponent } from '@lucca-front/ng/date2';
import { FancyBoxComponent } from '@lucca-front/ng/fancy-box';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { CheckboxInputComponent } from '@lucca-front/ng/forms';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'filter-pill-stories',
	templateUrl: './filter-pill.stories.html',
	imports: [
		FancyBoxComponent,
		FilterPillComponent,
		CheckboxInputComponent,
		LuSimpleSelectInputComponent,
		LuMultiSelectInputComponent,
		DateInputComponent,
		DateRangeInputComponent,
		LuCoreSelectDepartmentsDirective,
		TreeSelectDirective,
		FormsModule,
		FilterLegumesPipe,
	],
})
class FilterPillStory {
	legumes = allLegumes;
	groupingFn(legume: ILegume) {
		const parent = allLegumes.find((l) => l.color === legume.color);
		if (parent === legume) {
			return null;
		}
		return parent;
	}
}

export default {
	title: 'QA/FilterPill',
	component: FilterPillStory,
	decorators: [applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideAnimations(), provideHttpClient()] })],
} as Meta;

const template: StoryFn<FilterPillStory> = () => ({});

export const basic = template.bind({});
