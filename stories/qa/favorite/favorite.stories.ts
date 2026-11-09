import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FavoriteComponent } from '@lucca-front/ng/favorite';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'favorite-stories',
	templateUrl: './favorite.stories.html',
	styles: [
		`
			.demo-QAtable {
				inline-size: 100%;
				table-layout: fixed;
			}
			.demo-QAtable td:first-child {
				inline-size: 12rem;
			}
		`,
	],
	imports: [FavoriteComponent, LuTooltipTriggerDirective],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class FavoriteStory {}

export default {
	title: 'QA/Favorite',
	component: FavoriteStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FavoriteStory> = {
	args: {},
	render: template,
};
