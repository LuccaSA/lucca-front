import { IconsList } from '@/stories/icons-list';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'icon-stories',
	templateUrl: './icon.stories.html',
	imports: [IconComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			.demo-QAtable-list-row {
				display: flex;
				align-items: center;
				gap: var(--pr-t-spacings-100);
			}
		`,
	],
})
class IconStory {
	icons = IconsList;
}

export default {
	title: 'QA/Icon',
	component: IconStory,
	decorators: [
		moduleMetadata({
			entryComponents: [IconStory],
		}),
	],
} as Meta;

export const Template: StoryObj<IconStory> = {};
