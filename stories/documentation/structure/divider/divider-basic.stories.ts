import { Meta, StoryFn } from '@storybook/angular';

interface DividerBasicStory {}

export default {
	title: 'Documentation/Structure/Divider/Basic',
} as Meta;

function getTemplate(args: DividerBasicStory): string {
	return `
	Divider
	<hr class="divider" />
	Decorative divider
	<div class="divider"></div>
	Divider with content
	<div class="divider">Ipsum</div>
	Divider with small content
	<div class="divider mod-S">Ipsum</div>
	Divider with button 
	<div class="divider"><button class="divider-button" type="button">Ipsum</button></div>
	Divider with small button 
	<div class="divider mod-S"><button class="divider-button" type="button">Ipsum</button></div>
	Divider with action 
	<div class="divider">
		<button class="divider-actionIcon" type="button" [luTooltip]="'Modifier'">
			<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
			<span class="u-mask">Modifier</span>
		</button>
	</div>
	Divider with small action 
	<div class="divider mod-S">
		<button class="divider-actionIcon" type="button" [luTooltip]="'Modifier'">
			<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
			<span class="u-mask">Modifier</span>
		</button>
	</div>
	`;
}

const Template: StoryFn<DividerBasicStory> = (args: DividerBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
