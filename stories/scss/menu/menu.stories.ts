import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'menu-stories',
	templateUrl: './menu.stories.html',
}) class MenuStory {
	@Input() mod: string = '';
	@Input() palette: string = '';
	@Input() withContainer: boolean = false;
	
	links = [
		{ label: 'link 1', isActive: true },
		{ label: 'link 2', isActive: false },
		{ label: 'link 3', isActive: false },
		{ label: 'link 4', isActive: false },
		{ label: 'link 5', isActive: false },
		{ label: 'link 6', isActive: false },
		{ label: 'link 7', isActive: false },
	];
	toggle(link) {
		this.links.forEach(l => l.isActive = false);
		link.isActive = true;
	}
}

export default {
	title: 'SCSS/Menu',
	component: MenuStory,
	argTypes: {
		mod: {
			control: {
				type: 'radio',
				options: ['', 'mod-header']
			}
		},
		palette: {
			control: {
				type: 'radio',
				options: ['', 'palette-primary', 'palette-secondary', 'palette-grey', 'palette-success', 'palette-warning', 'palette-error']
			}
		},
		withContainer: {
			control: {
				type: 'boolean',
			}
		} 
	},
	decorators: [
		moduleMetadata({
			entryComponents: [MenuStory],
			imports: [BrowserModule, CommonModule],
		})
	]
} as Meta;

const template: Story<MenuStory> = (args: MenuStory) => ({
	props: args,
});

export const basic = template.bind({});

basic.args = {	
	withContainer: false,
};
