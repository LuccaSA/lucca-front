import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'callout-stories',
	templateUrl: './callout.stories.html',
}) class CalloutStory {
	@Input() label: string;
	mod: string = '';
	@Input('mod') set _mod(mod: string[]) {
		this.mod = mod.join(' ');
	}
	@Input() palette: string = '';

	isModIconActive() {
		return this.mod.includes('mod-icon');
	}
}

export default {
	title: 'SCSS/Callout',
	component: CalloutStory,
	argTypes: {
		mod: {
			options: ['mod-small', 'mod-icon'],
			control: {
				type: 'inline-check',
			}
		},
		palette: {
			options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error'],
			control: {
				type: 'radio',
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [CalloutStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<CalloutStory> = (args: CalloutStory) => ({
	props: args,
});

export const def = template.bind({});
def.args = { label: 'label', mod: [], palette: ''};
