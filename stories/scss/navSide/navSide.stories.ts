import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'navSide-stories',
	templateUrl: './navSide.stories.html',
}) class NavSideStory {
	@Input() withBanner: boolean = false;
	@Input() compact: boolean = false;
	@Input() mobileMenuOpened: boolean = false;
	@Input() withBottomSection: boolean = false;
	@Input() mobileToggle: boolean = false;
	@Input() firstSubMenuOpened = false;
	@Input() secondSubMenuOpened = false;
	@Input() loading: boolean = false;
	@Input() loadingInverted: boolean = false;
	@Input() titleNav: string = '';
}

export default {
	title: 'SCSS/NavSide',
	component: NavSideStory,
	argTypes: {
		
	},
	decorators: [
		moduleMetadata({
			entryComponents: [NavSideStory],
			imports: [BrowserModule, CommonModule],
		})
	]
} as Meta;

const template: Story<NavSideStory> = (args: NavSideStory) => ({
	props: args,
});

export const basic = template.bind({});

basic.args = {
	firstSubMenuOpened: false,
	secondSubMenuOpened: true,
	withBanner: false,
	compact: false,
	withBottomSection: true,
	mobileMenuOpened: true,
	mobileToggle: true,
	loading: false,
	loadingInverted: false,
	titleNav: 'Cleemy Achats',
};
