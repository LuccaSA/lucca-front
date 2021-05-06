import { Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { Story, Meta, moduleMetadata } from '@storybook/angular';


@Component({
	selector: 'utilities-clearfix-stories',
	templateUrl: './clearfix.stories.html',
}) class UClearfixStory {
}

export default {
	title: 'SCSS/Utilities/Clearfix',
	component: UClearfixStory,
	decorators: [
		moduleMetadata({
			entryComponents: [UClearfixStory],
			imports: [BrowserModule],
		})
	]
} as Meta;

const template: Story<UClearfixStory> = (args: UClearfixStory) => ({
	props: args,
});

export const def = template.bind({});
