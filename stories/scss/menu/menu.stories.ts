import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'menu-stories',
	templateUrl: './menu.stories.html',
}) class MenuStory {
	links = [
		{ label: 'link 1', isActive: true },
		{ label: 'link 2', isActive: false },
		{ label: 'link 3', isActive: false },
		{ label: 'link 4', isActive: false },
	];
	toggle(link) {
		this.links.forEach(l => l.isActive = false);
		link.isActive = true;
	}
}

export default {
	title: 'SCSS/Menu',
	component: MenuStory,
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
