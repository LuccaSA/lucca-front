import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { LuDropdownModule, LuDropdownTriggerDirective } from '../../../../packages/ng/dropdown/src';

@Component({
	selector: 'dropdown-stories',
	templateUrl: './dropdown.stories.html',
}) class DropdownDirective {
	constructor() { }
}

export default {
	title: 'Documentation/Overlays/Dropdown',
	component: LuDropdownTriggerDirective,
	decorators: [
		componentWrapperDecorator(DropdownDirective),
		moduleMetadata({
			declarations: [DropdownDirective],
			imports: [
				BrowserAnimationsModule,
				LuDropdownModule,
			]
		})
	],
} as Meta;

const Template: Story<DropdownDirective> = (args: DropdownDirective) => ({
	props: args,
});

export const Basic = Template.bind({});
Basic.args = {}
Basic.parameters = {
	docs: {}
};
