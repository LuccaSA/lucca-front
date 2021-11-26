import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'radioButton-stories',
	templateUrl: './radio-button.stories.html',
}) class RadioButtonStory {
	@Input() isDisabled: boolean;
	@Input() isChecked: boolean;
	// @Input() buttonsCount: number;
	// @Input() indexDisabled: number;
	// @Input() indexChecked: number;
}

export default {
	title: 'SCSS/Form/radioButtons',
	component: RadioButtonStory,
	decorators: [
		moduleMetadata({
			entryComponents: [RadioButtonStory],
			imports: [BrowserModule, FormsModule, CommonModule],
		})
	]
} as Meta;

const template: Story<RadioButtonStory> = (args: RadioButtonStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {
	isDisabled: false,
	isChecked: false,
	// buttonsCount: 3,
	// indexChecked: -1,
	// indexDisabled: -1,
};
