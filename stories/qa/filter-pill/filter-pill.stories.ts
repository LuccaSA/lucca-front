import { allLegumes, FilterLegumesPipe, ILegume } from '@/stories/forms/select/select.utils';
import { provideHttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, LOCALE_ID } from '@angular/core';
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
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

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
	changeDetection: ChangeDetectionStrategy.OnPush,
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

	selectedDepartment = { id: 14, name: 'Administration' };
	selectedDepartments = [
		{ id: 14, name: 'Administration' },
		{ id: 13, name: 'Direction commerciale' },
	];

	selectedDate = new Date(2024, 0, 15);
	selectedDateRange = { start: new Date(2024, 0, 10), end: new Date(2024, 0, 20) };
}

export default {
	title: 'QA/FilterPill',
	component: FilterPillStory,
	decorators: [applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }, provideAnimations(), provideHttpClient()] })],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FilterPillStory> = {
	args: {},
	render: template,
};
