import { Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import { boolean, color, text, withKnobs } from '@storybook/addon-knobs';
import files from './selection.json';

export default { title: 'Icons/SVG', decorators: [withKnobs] };

@Component({
	selector: 'icons-svg-list-stories',
	templateUrl: './icons-svg.stories.html',
	styleUrls: ['./icons-svg.stories.scss'],
}) class IconsSVGListStory {

	@Input() set filter(query: string) {
		this.icons = files.icons.filter(icon => !query || icon.properties.name.includes(query));
	}
	@Input() rounded = false;
	@Input() fill = '#000';
	@Input() background = '#FFF';

	icons = files.icons;
}

export const IconsSVG = () => ({
	decorators: [],
	template: `
		<icons-svg-list-stories [rounded]="rounded" [fill]="fill" [background]="background" [filter]="filter"></icons-svg-list-stories>
	`,
	moduleMetadata: {
	  declarations: [IconsSVGListStory],
	  // imports: [BrowserModule],
	},
	props: {
		filter: text('Filter',''),
		rounded: boolean('Rounded', false),
		fill: color('Fill','#000'),
		background: color('Background','#FFF'),
	}
  });

IconsSVG.storyName = 'List';

// export default {
// 	title: 'Icons/SVG',
// 	template: '<icons-svg-list-stories></icons-svg-list-stories>',
// 	argTypes: {
// 		filter: {
// 			control: {
// 				type: 'text',
// 			}
// 		},
// 		rounded: {
// 			control: {
// 				type: 'boolean',
// 			}
// 		},
// 		fill: {
// 			control: {
// 				type: 'color',
// 			}
// 		},
// 		background: {
// 			control: {
// 				type: 'color',
// 			}
// 		},
// 	},
// 	moduleMetadata: {
// 		declarations: [IconsSVGListStory],
// 		imports: [BrowserModule],
// 	},
// 	decorators: [
	
// 	]
// } as Meta;

// const template: Story<IconsSVGListStory> = (args: IconsSVGListStory) => ({
// 	props: args,
// });

// export const list = template.bind({});
// list.args = { rounded: false, filter: '', fill: '#000', background: '#FFF' };
