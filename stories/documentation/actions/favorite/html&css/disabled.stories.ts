import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Actions/Favorite/HTML&CSS/Disabled',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipTriggerDirective],
		}),
	],
	render: () => ({
		template: `<span class="favorite">
	<button type="button" class="favorite-button button" aria-pressed="false" aria-disabled="true" luTooltip="Add to Favorites" luTooltipOnlyForDisplay>
		<span aria-hidden="true" class="lucca-icon icon-star"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>
<span class="favorite">
	<button type="button" class="favorite-button button" aria-pressed="true" aria-disabled="true" luTooltip="Remove from Favorites" luTooltipOnlyForDisplay>
		<span aria-hidden="true" class="lucca-icon icon-starFilled"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>`,
	}),
} as Meta;

export const Disabled: StoryObj = {};
