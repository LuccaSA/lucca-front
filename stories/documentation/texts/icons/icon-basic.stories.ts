import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { Meta, StoryObj } from '@storybook/angular';
import { IconsList } from '@lucca-front/icons/icons-list';

@Component({
	selector: 'icon-basic-stories',
	standalone: true,
	imports: [CommonModule, FormsModule],
	templateUrl: './icon-basic.stories.html',
})
class IconStory {
	icons: string[] = IconsList;
	filter = '';

	public updateIcons(filter: string) {
		this.icons = filter ? IconsList.filter((icon: string) => icon.toLowerCase().includes(filter.toLowerCase())) : IconsList;
	}

	public copyIcon(icon: string): void {
		navigator.clipboard.writeText(`<span aria-hidden="true" class="lucca-icon icon-${icon}"></span>`);
	}
}

export default {
	title: 'Documentation/Texts/Icons/List',
	component: IconStory,
} as Meta;

const code = `<span aria-hidden="true" class="lucca-icon icon-heart"></span>`;

export const Template: StoryObj<IconStory> = {
	parameters: {
		docs: {
			source: {
				language: 'html',
				code,
			},
		},
	}
};

