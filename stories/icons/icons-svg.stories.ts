import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import files from '../../packages/icons/svg/selection.json';

@Component({
	selector: 'icons-svg-list-stories',
	templateUrl: './icons-svg.stories.html',
	styleUrls: ['./icons-svg.stories.scss'],
}) class IconsSVGListStory {

	@Input() set filter(query: string){
		this.icons = files.icons.filter(icon => !query || icon.properties.name.includes(query));
	};
	@Input() rounded: boolean;
	@Input() fill: string;
	@Input() background: string;

	files = files;

	icons = [];
}

export default {
	title: 'Icons/SVG',
	component: IconsSVGListStory,
	argTypes: {
		filter: {
			control: {
				type: 'text',
			}
		},
		rounded: {
			control: {
				type: 'boolean',
			}
		},
		fill: {
			control: {
				type: 'color',
			}
		},
		background: {
			control: {
				type: 'color',
			}
		},
	},
	decorators: [
		moduleMetadata({
			entryComponents: [IconsSVGListStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<IconsSVGListStory> = (args: IconsSVGListStory) => ({
	props: args,
});

export const list = template.bind({});
list.args = { rounded: false, filter: '', fill: '#000', background: '#FFF' };
