import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, Story } from '@storybook/angular';


@Component({
	selector: 'radio-stories',
	templateUrl: './radio.stories.html',
}) class RadioStory {
	@Input() disabled: boolean = false;
	@Input() checked: boolean = false;
}

export default {
	title: 'Documentation/Forms/Radios',
	component: RadioStory,
	argTypes: {
		palette: {
			options: [
				'',
				'palette-success',
				'palette-warning',
				'palette-error'
			],
			control: {
				type: 'radio',
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [RadioStory],
			imports: [BrowserModule, FormsModule, CommonModule],
		})
	]
} as Meta;

const template: Story<RadioStory> = (args: RadioStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = { checked: false, palette: '', disabled: false };
