import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'button-group-stories',
	templateUrl: './button-group.stories.html',
	styleUrls: ['./button-group-stories.scss'],
})
class ButtonGroupStory {
	@Input() label: string;
	@Input() mod: string = '';
	@Input() palette: string = '';
	@Input() state: string = '';
	@Input() size: string = '';
	@Input() group: boolean = false;
	@Input() disabled: boolean = false;
	@Input() noFlexWrap: boolean = false;
	@Input() more: boolean = false;
}

export default {
	title: 'SCSS/Button',
	component: ButtonGroupStory,
	argTypes: {
		mod: {
			options: ['', 'mod-outlined', 'mod-link', 'mod-link mod-invert'],
			control: {
				type: 'radio',
			},
		},
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			},
		},
		state: {
			options: ['', 'is-loading', 'is-error', 'is-success', 'is-disabled'],
			control: {
				type: 'radio',
			},
		},
		size: {
			options: ['', 'mod-small', 'mod-smaller'],
			control: {
				type: 'radio',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [BrowserModule],
		}),
	],
} as Meta;

const template: Story<ButtonGroupStory> = (args: ButtonGroupStory) => ({
	props: args,
});

export const Group = template.bind({});
Group.args = { label: 'label', mod: '', size: '', state: '', palette: '', disabled: false, group: true, noFlexWrap: false, more: false };
