import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'box-basic-stories',
	templateUrl: './box-basic.stories.html',
}) class BoxBasicStory {
	@Input() mod: string = '';
	@Input() state: string = '';

	get isSwitchBox(): boolean { return this.mod === 'mod-toggle'; }
	get isKillableBox(): boolean { return this.state === 'killable'; }
}

export default {
	title: 'SCSS/Box/Basic',
	component: BoxBasicStory,
	argTypes: {
		mod: {
			options: ['', 'mod-grey', 'mod-toggle'],
			control: {
				type: 'radio',
			}
		},
		state: {
			options: ['', 'killable'],
			control: {
				type: 'radio',
			}
		}
	},
	decorators: [
		moduleMetadata({
			entryComponents: [BoxBasicStory],
			imports: [BrowserModule, CommonModule],
		})
	]
} as Meta;

const template: Story<BoxBasicStory> = (args: BoxBasicStory) => ({
	props: args,
});

export const basic = template.bind({});
