import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Actions/Favorite/HTML&CSS/Favorite',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipTriggerDirective],
		}),
	],
	render: () => ({
		template: `<span class="favorite">
	<button type="button" class="favorite-button button" aria-pressed="true" luTooltip="Remove from favorites" luTooltipOnlyForDisplay>
		<span aria-hidden="true" class="lucca-icon icon-starFilled"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>`,
	}),
} as Meta;

export const Favorite: StoryObj = {};
