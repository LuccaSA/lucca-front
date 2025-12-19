import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconsList } from '@/stories/icons-list';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'icon-basic-stories',
	imports: [FormsModule, IconComponent],
	templateUrl: './icon-basic.stories.html',
})
class IconStory {
	icons = IconsList;
	filter = '';

	public updateIcons(filter: string) {
		this.icons = filter ? IconsList.filter(({ icon }) => icon.toLowerCase().includes(filter.toLowerCase())) : IconsList;
	}

	public copyIcon(icon: string): void {
		navigator.clipboard.writeText(`<lu-icon icon="${icon}" />`);
	}
}

export default {
	title: 'Documentation/Texts/Icons/List',
	component: IconStory,
} as Meta;

const code = `<lu-icon icon="heart" />`;

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
