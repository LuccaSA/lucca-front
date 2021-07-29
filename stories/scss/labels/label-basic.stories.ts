import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'label-basic-stories',
	templateUrl: './label-basic.stories.html',
}) class LabelBasicStory {
	@Input() label: string;
	@Input() palette: string = '';
	@Input() isNumber: boolean = false;
}

export default {
	title: 'SCSS/Label',
	component: LabelBasicStory,
	argTypes: {
		isNumber: {
			control: {
				type: 'boolean',
			},
		},
		palette: {
			control: {
				type: 'radio',
				options: ['palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error']
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [LabelBasicStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<LabelBasicStory> = (args: LabelBasicStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = { label: 'label', isNumber: false, palette: 'palette-primary' };
