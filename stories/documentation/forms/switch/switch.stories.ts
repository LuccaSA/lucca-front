import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'switch-stories',
	templateUrl: './switch.stories.html',
}) class SwitchStory {
	@Input() isChecked: boolean = false;
	@Input() isDisabled: boolean = false;
	@Input() isSmall: boolean = false;
	@Input() isInline: boolean = false;
}

export default {
	title: 'Documentation/Forms/Switches',
	component: SwitchStory,
	argTypes: {
		isChecked: {
			control: {
				type: 'boolean',
			},
		},
		isDisabled: {
			control: {
				type: 'boolean',
			},
		},
		isSmall: {
			control: {
				type: 'boolean',
			},
		},
		isInline: {
			control: {
				type: 'boolean',
			},
		}
	},
	decorators: [
		moduleMetadata({
			entryComponents: [SwitchStory],
			imports: [BrowserModule, FormsModule, CommonModule],
		})
	]
} as Meta;

const template: Story<SwitchStory> = (args: SwitchStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
	isChecked: false,
	isDisabled: false,
	isSmall: false,
	isInline: false
};
