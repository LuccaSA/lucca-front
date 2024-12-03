import { Meta, StoryFn } from '@storybook/angular';

interface DividerBasicStory {}

export default {
	title: 'Documentation/Structure/Divider/Basic',
} as Meta;

function getTemplate(args: DividerBasicStory): string {
	return `Divider
<hr class="divider" />
Decorative divider
<div class="divider"></div>
Divider with content
<div class="divider">Text</div>
Divider with small content
<div class="divider mod-S">Text</div>
Divider with button
<div class="divider"><button class="button" type="button">Button</button></div>
Divider with small button
<div class="divider mod-S"><button class="button" type="button">Button</button></div>
Divider with Icon
<div class="divider"><span aria-hidden="true" class="lucca-icon icon-heart"></span></div>
Divider with small Icon
<div class="divider mod-S"><span aria-hidden="true" class="lucca-icon icon-heart"></span></div>
Vertical divider
<div class="u-displayFlex u-justifyContentSpaceBetween u-alignItemsCenter pr-u-marginTop100 pr-u-gap400">
	<div class="u-displayFlex pr-u-gap100">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
		<div class="divider mod-vertical"></div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	</div>
	<div class="u-displayFlex pr-u-gap100">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
		<hr class="divider mod-vertical" />
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	</div>
</div>
<div class="u-displayFlex u-justifyContentSpaceBetween u-alignItemsCenter pr-u-marginTop400 pr-u-gap400">
	<div class="u-displayFlex pr-u-gap200 u-alignItemsCenter">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
		<div class="divider mod-vertical">Text</div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	</div>
	<div class="u-displayFlex pr-u-gap100 u-alignItemsCenter">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
		<div class="divider mod-vertical mod-S">Text</div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	</div>
</div>
<div class="u-displayFlex u-justifyContentSpaceBetween u-alignItemsCenter pr-u-marginTop400 pr-u-gap400">
	<div class="u-displayFlex pr-u-gap200 u-alignItemsCenter">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
		<div class="divider mod-vertical"><span aria-hidden="true" class="lucca-icon icon-heart"></span></div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	</div>
	
	<div class="u-displayFlex pr-u-gap100 u-alignItemsCenter">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
		<div class="divider mod-vertical mod-S"><span aria-hidden="true" class="lucca-icon icon-heart"></span></div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	</div>
</div>
<div class="u-displayFlex u-justifyContentSpaceBetween u-alignItemsCenter pr-u-marginTop400 pr-u-gap400">
	<div class="u-displayFlex pr-u-gap200 u-alignItemsCenter">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
		<div class="divider mod-vertical"><button class="button" type="button">Button</button></div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	</div>
	<div class="u-displayFlex pr-u-gap100 u-alignItemsCenter">
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
		<div class="divider mod-vertical mod-S"><button class="button" type="button">Button</button></div>
		Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
	</div>
</div>
`;
}

const Template: StoryFn<DividerBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
