import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Actions/Favorite/HTML&CSS/Size',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipTriggerDirective],
		}),
	],
	render: () => ({
		template: `<span class="favorite mod-S">
	<button type="button" class="favorite-button button" aria-pressed="false" luTooltip="Add to favorites" luTooltipOnlyForDisplay>
		<span aria-hidden="true" class="lucca-icon icon-star"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>
<span class="favorite mod-XS">
	<button type="button" class="favorite-button button" aria-pressed="false" luTooltip="Add to favorites" luTooltipOnlyForDisplay>
		<span aria-hidden="true" class="lucca-icon icon-star"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>`,
	}),
} as Meta;

export const Size: StoryObj = {};
