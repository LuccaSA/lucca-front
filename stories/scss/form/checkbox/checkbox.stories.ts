import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'checkbox-stories',
	templateUrl: './checkbox.stories.html',
}) class CheckboxStory {
	@Input() state: string = 'unchecked';
	get isMixed(): boolean { return this.state === 'mixed'; }
	get isChecked(): boolean { return this.state === 'checked' || this.state === 'mixed'; }
	get isAriaHidden(): boolean | null {
		return this.isMixed ? true : null;
	}
	toggle(flag: boolean) {
		if (flag) {
			this.state = 'checked';
		} else {
			this.state = 'unchecked';
		}
	}
}

export default {
	title: 'SCSS/Form/Checkboxes',
	component: CheckboxStory,
	argTypes: {
		state: {
			control: {
				type: 'radio',
				options: ['checked', 'unchecked', 'mixed']
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [CheckboxStory],
			imports: [BrowserModule, FormsModule, CommonModule],
		})
	]
} as Meta;

const template: Story<CheckboxStory> = (args: CheckboxStory) => ({
	props: args,
});

export const basic = template.bind({});
