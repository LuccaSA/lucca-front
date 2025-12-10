import { JsonPipe, registerLocaleData } from '@angular/common';
import localesFr from '@angular/common/locales/fr';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { LuCoreSelectTotalCountDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, LuMultiSelection } from '@lucca-front/ng/multi-select';
import { Meta, StoryObj } from '@storybook/angular';
import { ILegume, allLegumes } from '../../documentation/forms/select/select.utils';

registerLocaleData(localesFr);

@Component({
	selector: 'multi-select-stories',
	standalone: true,
	imports: [JsonPipe, FormsModule, LuMultiSelectInputComponent, LuMultiSelectWithSelectAllDirective, FormFieldComponent, LuCoreSelectTotalCountDirective],
	template: `
		<lu-form-field>
			<lu-multi-select
				withSelectAll
				[totalCount]="legumes.length"
				withSelectAllDisplayerLabel="légumes"
				class="multiSelect"
				placeholder="placeholder"
				[clearable]="clearable"
				[(ngModel)]="legumeSelection"
				[options]="legumes"
			/>
		</lu-form-field>

		<pre>{{ legumeSelection | json }}</pre>
	`,
})
class MultiSelectWithSelectAllStory {
	legumes = allLegumes;
	legumeSelection: LuMultiSelection<ILegume> = { mode: 'include', values: allLegumes.slice(0, 2) };
}

export default {
	title: 'QA/MultiSelect/SelectAll',
	component: MultiSelectWithSelectAllStory,
} as Meta;

const template = (args: MultiSelectWithSelectAllStory) => ({
	props: args,
});

export const SelectAll: StoryObj<MultiSelectWithSelectAllStory> = {
	args: {},
	render: template,
};
SelectAll.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
};
