import { allLegumes } from '@/stories/forms/select/select.utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiDisplayerDirective, LuMultiSelectCounterDisplayerComponent, LuMultiSelectDisplayerInputDirective, LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { Meta } from '@storybook/angular';

@Component({
	selector: 'select-stories',
	templateUrl: './select.stories.html',
	imports: [
		LuSimpleSelectInputComponent,
		LuMultiSelectInputComponent,
		LuMultiSelectCounterDisplayerComponent,
		LuMultiSelectDisplayerInputDirective,
		LuMultiDisplayerDirective,
		FormFieldComponent,
		FormsModule,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SelectStory {
	allLegumes = allLegumes;
	simpleExample = allLegumes[0];
	multiExample = allLegumes;
}

export default {
	title: 'QA/Select',
	component: SelectStory,
} as Meta;

export const Basic = {};
