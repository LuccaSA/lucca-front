import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, Story } from '@storybook/angular';


@Component({
	selector: 'checkbox-stories',
	templateUrl: './checkbox.stories.html',
}) class CheckboxStory {
	@Input() disabled: boolean = false;
	@Input() checked: string = 'unchecked';
	get isMixed(): boolean { return this.checked === 'mixed'; }
	get isChecked(): boolean { return this.checked === 'checked' || this.checked === 'mixed'; }
	get isAriaHidden(): boolean | null {
		return this.isMixed ? true : null;
	}
	toggle(flag: boolean) {
		if (flag) {
			this.checked = 'checked';
		} else {
			this.checked = 'unchecked';
		}
	}
}

export default {
	title: 'Documentation/Forms/Checkboxes',
	component: CheckboxStory,
	argTypes: {
		checked: {
			options: ['checked', 'unchecked', 'mixed'],
			control: {
				type: 'radio',
			}
		},
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
			entryComponents: [CheckboxStory],
			imports: [BrowserModule, FormsModule, CommonModule],
		})
	]
} as Meta;

const template: Story<CheckboxStory> = (args: CheckboxStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = { checked: 'unchecked', palette: '', disabled: false };
