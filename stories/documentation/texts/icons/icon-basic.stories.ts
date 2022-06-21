import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import * as icons from '@lucca-front/icons';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'icon-basic-stories',
	templateUrl: './icon-basic.stories.html',
}) class IconStory {
	icons: string[] = icons.default;
	filter = '';

	public updateIcons(filter: string) {
		this.icons = filter ? icons.default.filter((icon: string) => icon.toLowerCase().includes(filter.toLowerCase())) : icons.default;
	}

	public camelize(str): string{
		let arr = str.split('_');
		let capital = arr.map((item, index) => index ? item.charAt(0).toUpperCase() + item.slice(1).toLowerCase() : item.toLowerCase());
		let capitalString = capital.join("");
		return capitalString;
	}

	public copyIcon(icon: string): void {
		navigator.clipboard.writeText(`<span aria-hidden="true" class="lucca-icon icon-${this.camelize(icon)}"></span>`)
	}
}

export default {
	title: 'Documentation/Texts/Icons/List',
	component: IconStory,
	decorators: [
		moduleMetadata({
			imports: [CommonModule, FormsModule],
		})
	]
} as Meta;

const template: Story<IconStory> = (args) => ({ props: args });

export const basic = template.bind({});

const code = `<span aria-hidden="true" class="lucca-icon icon-heart"></span>`;

basic.parameters = {
	docs: {
		source: {
			language: 'html',
			code,
		},
	},
};
