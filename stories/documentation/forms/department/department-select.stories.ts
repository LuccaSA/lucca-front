import { Component, Input } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { LuDepartmentModule } from "@lucca-front/ng/department";
import { Meta, moduleMetadata, Story } from "@storybook/angular";

@Component({
	selector: 'department-select-stories',
	templateUrl: './department-select.stories.html',
}) class DepartmentStory {
	@Input() appInstanceId: number = null;
	@Input() operations: number[] = [];
	@Input() filters: string[] = [];
}

export default {
	title: 'Documentation/Forms/Department/Select',
	component: DepartmentStory,
	decorators: [
		moduleMetadata({
			imports: [
				LuDepartmentModule,
				BrowserAnimationsModule,
			],
		})
	]
} as Meta;

const template: Story<DepartmentStory> = (args: DepartmentStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {}

export const scoped = template.bind({});
scoped.args = {
	appInstanceId: 15,
	operations: [1],
	filters: ['isactive=false']
}
