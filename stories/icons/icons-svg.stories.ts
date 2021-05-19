import { Component, Input, OnInit } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import files from './files.json';

@Component({
	selector: 'icons-svg-list-stories',
	templateUrl: './icons-svg.stories.html',
	styleUrls: ['./icons-svg.stories.scss'],
}) class IconsSVGListStory  implements OnInit {

	@Input() set filter(query:string){
		this.files = files.filter(file => !query || query.split(' ').filter(q => !!q).some(q => file.includes(q)));
	};
	@Input() rounded = false;
	

	cols = 15;
	files = files;

	// chargement asynchrone du json
	ngOnInit(){
		if(files) {
			setTimeout(()=> this.files = files);
		}
	}
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
list.args = { rounded: false, filter: '' };
