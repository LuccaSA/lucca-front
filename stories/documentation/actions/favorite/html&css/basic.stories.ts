import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

export default {
	title: 'Documentation/Actions/Favorite/HTML&CSS/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuTooltipTriggerDirective],
		}),
	],
	render: () => ({
		template: `<span class="favorite">
	<button type="button" class="favorite-button button" aria-pressed="false" luTooltip="Add to favorites" luTooltipOnlyForDisplay>
		<span aria-hidden="true" class="lucca-icon icon-star"></span>
		<span class="pr-u-mask">Favorite</span>
	</button>
</span>`,
	}),
} as Meta;

export const Basic: StoryObj = {};
