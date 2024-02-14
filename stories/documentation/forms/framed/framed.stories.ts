import { Component, Input } from '@angular/core';
import { Meta, StoryFn } from '@storybook/angular';

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
} as Meta;

const template: StoryFn<FramedStory> = (args) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = { state: '', disabled: false, isRequired: false };
