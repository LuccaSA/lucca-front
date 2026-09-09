import { allLegumes, ILegume } from '@/stories/forms/select/select.utils';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuMultiSelectInputComponent } from '@lucca-front/ng/multi-select';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { TreeSelectDirective } from '@lucca-front/ng/tree-select';
import { Meta } from '@storybook/angular-vite';

@Component({
	selector: 'tree-select-stories',
	templateUrl: './tree-select.stories.html',
	imports: [LuSimpleSelectInputComponent, LuMultiSelectInputComponent, TreeSelectDirective, FormFieldComponent, FormsModule],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TreeSelectStory {
	allLegumes = allLegumes;
	// Asperge : enfant d'Artichaut (premier légume vert)
	simpleExample = allLegumes[1];
	multiExample = allLegumes.filter((legume) => legume.color === 'green').slice(0, 4);

	groupingFn = (legume: ILegume): ILegume | null => {
		const parent = allLegumes.find((l) => l.color === legume.color);
		return parent === legume ? null : parent;
	};
}

export default {
	title: 'QA/TreeSelect',
	component: TreeSelectStory,
} as Meta;

export const Basic = {};
