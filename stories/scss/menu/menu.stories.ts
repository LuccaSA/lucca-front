import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'menu-stories',
	templateUrl: './menu.stories.html',
}) class MenuStory {
	@Input() mod: string = '';
	@Input() isNumber: boolean = false;
	@Input() border: boolean = false;
	@Input() palette: string = '';
	@Input() withContainer: boolean = false;
	
	links = [
		{ label: 'link 1', isActive: true },
		{ label: 'link 2', isActive: false },
		{ label: 'link 3', isActive: false },
		{ label: 'link 4', isActive: false, isDisabled: true },
		{ label: 'link 5', isActive: false },
		{ label: 'link 6', isActive: false },
		{ label: 'link 7', isActive: false },
	];
	toggle(link, event) {
		event.preventDefault();
		this.links.forEach(l => l.isActive = false);
		link.isActive = true;
	}
}

export default {
	title: 'SCSS/Menu',
	component: MenuStory,
	argTypes: {
		mod: {
			options: ['', 'mod-header'],
			control: {
				type: 'radio',
				options: ['', 'mod-header', 'mod-small']
			},
		},
		isNumber: {
			control: {
				type: 'radio',
			}
		},
		withContainer: {
			control: {
				type: 'boolean',
			}
		},
		border: {
			control: {
				type: 'boolean',
				option: ['menuWithoutBorder']
			},
		},
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
basic.args = { mod: '', isNumber: false, border: true, withContainer: false };
