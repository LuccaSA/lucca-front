import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'scrollbox-stories',
	templateUrl: './scrollbox.stories.html',
	styles: ['p { white-space: nowrap}'],
}) class ScrollBoxStory {
	@Input() backgroundColor: string;
	@Input() shadowColor: string;
	@Input() shadowSize: string;
}

export default {
	title: 'SCSS/Scrollbox',
	component: ScrollBoxStory,
	argTypes: {
		backgroundColor: {
			control: {
				type: 'color',
			}
		},
		shadowColor: {
			control: {
				type: 'color',
			}
		},
		shadowSize: {
			control: {
				type: 'radio',
				options: ['0.25rem', '0.5rem', '1rem']
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [ScrollBoxStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<ScrollBoxStory> = (args: ScrollBoxStory) => ({
	props: args,
});

export const def = template.bind({});

def.args = {
	content: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Pellentesque dapibus commodo ornare. Proin eget iaculis lacus, a varius erat. Nulla facilisi. Sed eget scelerisque urna. Etiam eget sem accumsan, venenatis purus nec, dignissim ex.',
	backgroundColor: '#f5f5f5',
};



