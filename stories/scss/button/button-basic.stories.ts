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
			control: {
				type: 'radio',
				options: ['', ' mod-outline', 'mod-link']
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

