import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import {
	LuDropdownModule,
	LuDropdownPanelComponent,
	LuDropdownTriggerDirective,
} from '../../../../packages/ng/dropdown/src';

@Component({
	selector: 'dropdown-stories',
	templateUrl: './dropdown.stories.html',
}) class DropdownComponent {
	constructor() { }
}

export default {
	title: 'Documentation/Overlays/Dropdown',
	component: LuDropdownPanelComponent,
	decorators: [
		componentWrapperDecorator(DropdownComponent),
		moduleMetadata({
			declarations: [DropdownComponent],
			imports: [
				BrowserAnimationsModule,
				LuDropdownModule,
			]
		})
	],
} as Meta;

const Template: Story<DropdownComponent> = (args: DropdownComponent) => ({
	props: args,
});

export const Basic = Template.bind({});
Basic.args = {}
Basic.parameters = {
	controls: [],
	docs: {},
};
