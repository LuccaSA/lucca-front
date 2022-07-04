import { HttpClientModule } from '@angular/common/http';
import { Component, Input } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuDepartmentModule, LuDepartmentSelectInputComponent } from '@lucca-front/ng/department';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'department-select-stories',
	templateUrl: './department-select.stories.html',
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
			imports: [
				HttpClientModule,
				LuDepartmentModule,
				BrowserAnimationsModule,
			],
			declarations: [DepartmentStory],
		}),
	],
} as Meta;

const template: Story<DepartmentStory> = (args: DepartmentStory) => ({
	props: args,
});

export const Select = template.bind({});

const code = `
/* 1. Importer LuApiSelectInputModule */
import { LuDepartmentModule } from '@lucca-front/ng/department';

@NgModule({
	imports: [LuDepartmentModule]
})
class StoriesModule {}

/* 2. Utiliser lu-department-select */
@Component({
	selector: 'department-select-story',
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
