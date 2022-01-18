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
			control: {
				type: 'radio',
				options: ['', ' mod-outline', 'mod-link', 'mod-link mod-invert']
			}
		},
		palette: {
			control: {
				type: 'radio',
				options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error']
			}
		},
		state: {
			control: {
				type: 'radio',
				options: ['', 'is-loading', 'is-error', 'is-success', 'is-disabled']
			}
		},
		size: {
			control: {
				type: 'radio',
				options: ['', 'mod-smaller', 'mod-small']
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
