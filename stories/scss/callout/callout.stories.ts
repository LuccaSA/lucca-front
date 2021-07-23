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
			control: {
				type: 'inline-check',
				options: ['mod-small', 'mod-icon']
			}
		},
		palette: {
			control: {
				type: 'radio',
				options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error']
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

// export const outline = template.bind({});
// outline.args = { label: 'label', mod: 'mod-outline', palette: '' };

// export const loading = template.bind({});
// loading.args = { label: 'label', mod: '', palette: '' };

