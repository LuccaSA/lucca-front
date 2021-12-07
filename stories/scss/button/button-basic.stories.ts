import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'button-basic-stories',
	templateUrl: './button-basic.stories.html',
}) class ButtonBasicStory {
	@Input() label: string;
	@Input() mod: string = '';
	@Input() palette: string = '';
	@Input() state: string = '';
	@Input() size: string = '';
}

export default {
	title: 'SCSS/Button/Basic',
	component: ButtonBasicStory,
	argTypes: {
		mod: {
			options: ['', ' mod-outline', 'mod-link'],
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
		
	},
	decorators: [
		moduleMetadata({
			entryComponents: [ButtonBasicStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<ButtonBasicStory> = (args: ButtonBasicStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = { label: 'label', mod: '', size: '', state: '', palette: '' };

export const outline = template.bind({});
outline.args = { label: 'label', mod: 'mod-outline', size: '', state: '', palette: '' };

export const loading = template.bind({});
loading.args = { label: 'label', mod: '', size: '', state: 'is-loading', palette: '' };

