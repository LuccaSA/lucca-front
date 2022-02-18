import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'progress-stories',
	templateUrl: './progress.stories.html',
}) class ProgressStory {
	@Input() mod: string = '';
	@Input() state: string = '';
}

export default {
	title: 'SCSS/Progress',
	component: ProgressStory,
	argTypes: {
		mod: {
			options: ['', ' mod-indeterminate'],
			control: {
				type: 'radio',
			}
		},
		state: {
			options: ['', 'is-error', 'is-success'],
			control: {
				type: 'radio',
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [ProgressStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<ProgressStory> = (args: ProgressStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = {mod: '', state: ''};
