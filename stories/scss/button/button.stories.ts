import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'button-stories',
	templateUrl: './button.stories.html',
	styleUrls: ['./button-stories.scss'],
}) class ButtonStory {
	@Input() label: string;
	@Input() mod: string = '';
	@Input() palette: string = '';
	@Input() state: string = '';
	@Input() size: string = '';
	@Input() group: string = '';
	@Input() disabled: boolean = false;
	// @Input() more: boolean = false; // lucca-icons needed
}

export default {
	title: 'SCSS/Button',
	component: ButtonStory,
	argTypes: {
		mod: {
			options: ['', ' mod-outline', 'mod-link', 'mod-link mod-invert'],
			control: {
				type: 'radio',
			}
		},
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			}
		},
		state: {
			options: ['', 'is-loading', 'is-error', 'is-success', 'is-disabled'],
			control: {
				type: 'radio',
			}
		},
		size: {
			options: ['', 'mod-smaller', 'mod-small'],
			control: {
				type: 'radio',
			}
		},
		group: {
			control: {
				type: 'radio',
				options: ['', 'button-group']
			}
		},
		
	},
	decorators: [
		moduleMetadata({
			entryComponents: [ButtonStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<ButtonStory> = (args: ButtonStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = { label: 'label', mod: '', size: '', state: '', palette: '', group: '', disabled: false };
