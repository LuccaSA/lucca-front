import { Component, OnInit } from '@angular/core';
import { Story, Meta, moduleMetadata } from '@storybook/angular';
import * as icons from '@lucca-front/icons';
import { CommonModule } from '@angular/common';

@Component({
	selector: 'icon-stories',
	templateUrl: './icon.stories.html',
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
  title: 'QA/Icon',
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
