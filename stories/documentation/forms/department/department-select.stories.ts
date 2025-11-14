import { provideHttpClient } from '@angular/common/http';
import { Component, input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
import { applicationConfig, Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'department-select-stories',
	imports: [LuDepartmentSelectInputComponent],
	template: `
		<label class="textfield mod-inline">
			<lu-department-select
				class="textfield-input"
				[appInstanceId]="appInstanceId()"
				[operations]="operations()"
				[filters]="filters()"
				[uniqueOperation]="uniqueOperation()"
				placeholder="Select a departement"
				data-testid="lu-select"
			></lu-department-select>
			<div class="textfield-label">Departement</div>
		</label>

		<label class="textfield mod-inline">
			<lu-department-select
				class="textfield-input"
				[appInstanceId]="appInstanceId()"
				[operations]="operations()"
				[filters]="filters()"
				[uniqueOperation]="uniqueOperation()"
				placeholder="Select a departement"
				multiple="true"
				data-testid="lu-select"
			></lu-department-select>
			<div class="textfield-label">Departement multiple</div>
		</label>
	`,
})
class DepartmentStory {
	appInstanceId = input<number>(null);
	operations = input<number[]>([]);
	filters = input<string[]>([]);
	uniqueOperation = input<number>(null);
}

export default {
	title: 'Documentation/Forms/DepartmentSelect',
	component: DepartmentStory,
	decorators: [applicationConfig({ providers: [provideAnimations(), provideHttpClient()] })],
} as Meta;

const template: StoryFn<DepartmentStory> = (args) => ({
	props: args,
});

export const Select = template.bind({});

const code = `
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';

@Component({
	selector: 'department-select-story',
	imports: [LuDepartmentSelectInputComponent],
	template: \`
	<label class="textfield">
		<lu-department-select
			class="textfield-input"
			[appInstanceId]="appInstanceId()"
			[operations]="operations()"
			[filters]="filters()"
			[uniqueOperation]="uniqueOpration()"
		></lu-department-select>
	</label>
	\`,
})
class DepartmentStory {
	appInstanceId = input<number>(null);
	operations = input<number[]>([]);
	filters = input<string[]>([]);
	uniqueOperation = input<number>(null);
}`;

Select.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
