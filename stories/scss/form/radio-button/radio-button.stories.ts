import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'radioButton-stories',
	templateUrl: './radio-button.stories.html',
}) class RadioButtonStory {
	@Input() buttonsCount: number;
	@Input() indexDisabled: number;
	@Input() indexChecked: number;
	@Input() palette: string = '';
	@Input() isModSmall: boolean;
	get buttonsArray () {
		return Array(this.buttonsCount).keys();
	}
}

export default {
	title: 'SCSS/Form/radioButtons',
	component: RadioButtonStory,
	argTypes: {
		palette: {
			control: {
				type: 'radio',
				options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error']
			}
		}
	},
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
	buttonsCount: 3,
	indexChecked: 0,
	indexDisabled: 0,
	palette: '',
	isModSmall: false
};
