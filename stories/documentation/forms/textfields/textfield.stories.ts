import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, Story } from '@storybook/angular';


@Component({
	selector: 'textfield-stories',
	templateUrl: './textfield.stories.html',
}) class TextfieldStory {
	@Input() state: string = '';
	@Input() palette: string = '';
	@Input() disabled: boolean = false;
}

export default {
	title: 'Documentation/Forms/Textfields',
	component: TextfieldStory,
	argTypes: {
		state: {
			options: [
				'',
				'is-success',
				'is-warning',
				'is-error'
			],
			control: {
				type: 'radio',
			}
		},
		palette: {
			options: [
				'',
				'palette-primary',
				'palette-secondary',
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
			entryComponents: [TextfieldStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<TextfieldStory> = (args: TextfieldStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = { state: '', palette: '', disabled: false };
