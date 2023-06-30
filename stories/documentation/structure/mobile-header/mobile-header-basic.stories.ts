import { Meta, Story } from '@storybook/angular';

interface MobileHeaderBasicStory {

}

export default {
	title: 'Documentation/Structure/MobileHeader/Basic',

} as Meta;

function getTemplate(args: MobileHeaderBasicStory): string {
	return `
	<div class="mobileHeader">
		<a href="#" class="link">Text link</a>
		<div class="mobileHeader-title">
			<h1 class="mobileHeader-title-main">Title</h1>
			<div class="mobileHeader-title-sub">Subtitle</div>
		</div>
		<div class="mobileHeader-actions">
			<button type="button" class="actionIcon palette-primary" luTooltip="Modifier">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				<span class="u-mask">Modifier</span>
			</button>
			<button type="button" class="actionIcon palette-primary" luTooltip="Modifier">
			  <span aria-hidden="true" class="lucca-icon icon-heart"></span>
			  <span class="u-mask">Modifier</span>
			</button>
		</div>
	</div>

	<div class="mobileHeader mod-largeTitle">
		<a href="#" class="link">Text link</a>
		<div class="mobileHeader-title">
			<h1 class="mobileHeader-title-main">Title</h1>
			<div class="mobileHeader-title-sub">Subtitle</div>
		</div>
		<div class="mobileHeader-actions">
			<button type="button" class="actionIcon palette-primary" luTooltip="Modifier">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				<span class="u-mask">Modifier</span>
			</button>
			<button type="button" class="actionIcon palette-primary" luTooltip="Modifier">
				<span aria-hidden="true" class="lucca-icon icon-heart"></span>
				<span class="u-mask">Modifier</span>
			</button>
		</div>
	</div>
	`;
}

const Template: Story<MobileHeaderBasicStory> = (args: MobileHeaderBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {  };
