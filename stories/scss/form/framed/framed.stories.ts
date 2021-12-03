import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'framed-stories',
	templateUrl: './framed.stories.html',
}) class FramedStory {
	@Input() state: string = '';
	@Input() disabled: boolean = false;
}

export default {
	title: 'SCSS/FramedStory',
	component: FramedStory,
	argTypes: {
		state: {
			control: {
				type: 'radio',
				options: ['', 'is-error', 'is-warning', 'is-success']
			}
		}		
	},
	decorators: [
		moduleMetadata({
			entryComponents: [FramedStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<FramedStory> = (args: FramedStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = { state: '', disabled: false };
