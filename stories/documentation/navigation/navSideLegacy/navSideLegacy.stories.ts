import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Meta, moduleMetadata, Story } from '@storybook/angular';


@Component({
	selector: 'navSideLegacy-stories',
	templateUrl: './navSideLegacy.stories.html',
	styles: [
		`.navSide {
			position: relative;
			height: 40rem;
		}`
	]
}) class NavSideLegacyStory {
	@Input() withBanner: boolean = false;
	@Input() compact: boolean = false;
	@Input() mobileMenuOpened: boolean = false;
	@Input() withBottomSection: boolean = false;
	@Input() mobileToggle: boolean = false;
	@Input() firstSubMenuOpened: boolean = false;
	@Input() secondSubMenuOpened: boolean = false;
	@Input() loading: boolean = false;
	@Input() loadingInverted: boolean = false;
}

export default {
	title: 'Documentation/Navigation/NavSideLegacy',
	component: NavSideLegacyStory,
	argTypes: {

	},
	decorators: [
		moduleMetadata({
			entryComponents: [NavSideLegacyStory],
			imports: [BrowserModule, CommonModule],
		})
	]
} as Meta;

const template: Story<NavSideLegacyStory> = (args: NavSideLegacyStory) => ({
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
};
