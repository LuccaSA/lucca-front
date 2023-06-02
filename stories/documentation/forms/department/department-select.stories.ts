import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
import { Meta, StoryFn, applicationConfig, componentWrapperDecorator, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'department-select-stories',
	standalone: true,
	imports: [LuDepartmentSelectInputComponent],
	template: `
		<label class="textfield mod-inline">
			<lu-department-select
				class="textfield-input"
				[appInstanceId]="appInstanceId"
				[operations]="operations"
				[filters]="filters"
				placeholder="Select a departement"
				data-testid="lu-select"
			></lu-department-select>
			<div class="textfield-label">Departement</div>
		</label>

		<label class="textfield mod-inline">
			<lu-department-select
				class="textfield-input"
				[appInstanceId]="appInstanceId"
				[operations]="operations"
				[filters]="filters"
				placeholder="Select a departement"
				multiple="true"
				data-testid="lu-select"
			></lu-department-select>
			<div class="textfield-label">Departement multiple</div>
		</label>
	`,
})
class DepartmentStory {
	@Input() appInstanceId: number = null;
	@Input() operations: number[] = [];
	@Input() filters: string[] = [];
}

export default {
	title: 'Documentation/Forms/DepartmentSelect',
	component: LuDepartmentSelectInputComponent,
	decorators: [
		componentWrapperDecorator(DepartmentStory),
		moduleMetadata({
			imports: [DepartmentStory, HttpClientModule],
		}),
		applicationConfig({ providers: [provideAnimations()] }),
	],
} as Meta;

const template: StoryFn<DepartmentStory> = (args: DepartmentStory) => ({
	props: args,
});

export const Select = template.bind({});

const code = `
import { LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';

@Component({
	selector: 'department-select-story',
	standalone: true,
	imports: [LuDepartmentSelectInputComponent],
	template: \`
	<label class="textfield">
		<lu-department-select
			class="textfield-input"
			[appInstanceId]="appInstanceId"
			[operations]="operations"
			[filters]="filters"
		></lu-department-select>
	</label>
	\`,
})
class DepartmentStory {
	@Input() appInstanceId: number = null;
	@Input() operations: number[] = [];
	@Input() filters: string[] = [];
}`;
// Select.args = {
// 	appInstanceId: 15,
// 	operations: [1],
// 	filters: ['isactive=false'],
// };
Select.parameters = {
	// controls: { include: ['appInstanceId', 'operations', 'filters'] },
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
