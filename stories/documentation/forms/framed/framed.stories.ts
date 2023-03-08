import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'framed-stories',
	standalone: true,
	templateUrl: './framed.stories.html',
})
class FramedStory {
	@Input() state: string = '';
	@Input() disabled: boolean = false;
	@Input() isRequired: boolean = false;
}

export default {
	title: 'Documentation/Forms/FramedStory',
	component: FramedStory,
	argTypes: {
		state: {
			control: {
				type: 'radio',
				options: ['', 'is-error', 'is-warning', 'is-success'],
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BrowserModule],
		}),
	],
} as Meta;

const template: Story<FramedStory> = (args: FramedStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = { state: '', disabled: false, isRequired: false };
