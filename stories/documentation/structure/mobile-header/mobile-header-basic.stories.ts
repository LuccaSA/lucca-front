import { Meta, StoryFn } from '@storybook/angular';

interface MobileHeaderBasicStory {
	largeTitle: boolean;
}

export default {
	title: 'Documentation/Structure/MobileHeader/Basic',
	largeTitle: {
		control: {
			type: 'boolean',
		},
	},
} as Meta;

function getTemplate(args: MobileHeaderBasicStory): string {
	const largeTitle = args.largeTitle ? `mod-largeTitle` : '';
	return `<div class="mobileHeader ${largeTitle}">
		<a href="#" class="link mod-decorationHover">Text link</a>
		<div class="mobileHeader-title">
			<h1 class="mobileHeader-title-main">Title</h1>
			<div class="mobileHeader-title-sub">Subtitle</div>
		</div>
		<div class="mobileHeader-actions">
			<button type="button" class="actionIcon palette-primary" luTooltip="Action">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				<span class="u-mask">Action</span>
			</button>
			<button type="button" class="actionIcon palette-primary" luTooltip="Action">
			  <span aria-hidden="true" class="lucca-icon icon-heart"></span>
			  <span class="u-mask">Action</span>
			</button>
		</div>
	</div>`;
}

const Template: StoryFn<MobileHeaderBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { largeTitle: false };
