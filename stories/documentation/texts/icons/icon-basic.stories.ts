import { NgFor } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, StoryObj } from '@storybook/angular';
import { IconsList } from '@lucca-front/icons/icons-list';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	selector: 'icon-basic-stories',
	standalone: true,
	imports: [NgFor, FormsModule, IconComponent],
	templateUrl: './icon-basic.stories.html',
})
class IconStory {
	icons = IconsList;
	filter = '';

	public updateIcons(filter: string) {
		this.icons = filter ? IconsList.filter(({ icon }) => icon.toLowerCase().includes(filter.toLowerCase())) : IconsList;
	}

	public copyIcon(icon: string): void {
		navigator.clipboard.writeText(`<lu-icon icon="${icon}"></lu-icon>`);
	}
}

export default {
	title: 'Documentation/Texts/Icons/List',
	component: IconStory,
} as Meta;

const code = `<lu-icon icon="heart"></lu-icon>`;

export const Template: StoryObj<IconStory> = {
	parameters: {
		docs: {
			source: {
				language: 'html',
				code,
			},
		},
	},
};
