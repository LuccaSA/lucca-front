import { Component, OnInit } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import * as icons from '@lucca-front/icons';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'icon-basic-stories',
	templateUrl: './icon-basic.stories.html',
}) class IconStory {
	icons: string[] = icons.default;
	public camelize(str): string{
		let arr = str.split('_');
		let capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
		let capitalString = capital.join("");
		return capitalString;
	}
}

export default {
  title: 'Documentation/Texts/Icons/List',
  component: IconStory,
	decorators: [
		moduleMetadata({
			entryComponents: [IconStory],
			imports: [CommonModule],
		})
	]
} as Meta;

const template: Story<IconStory> = () => ({});

export const basic = template.bind({});

const code = `<span aria-hidden="true" class="lucca-icon icon-heart"></span>`;

basic.parameters = {
	controls: { include: [] },
	docs: {
		source: {
			language: 'html',
			code,
		},
	},
};
