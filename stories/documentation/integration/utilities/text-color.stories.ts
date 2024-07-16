import { Meta, StoryFn } from '@storybook/angular';

interface TextColorStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextColor',
} as Meta;

function getTemplate(args: TextColorStory): string {
	return `
<div>
	<div class="u-textNeutral"><code class="code">u-textNeutral</code> Lorem ipsum</div>
	<div class="u-textProduct"><code class="code">u-textProduct</code> Lorem ipsum</div>
	<div class="u-textBrand"><code class="code">u-textBrand</code> Lorem ipsum</div>
</div>
<div>
	<div class="u-textSuccess"><code class="code">u-textSuccess</code> Lorem ipsum</div>
	<div class="u-textWarning"><code class="code">u-textWarning</code> Lorem ipsum</div>
	<div class="u-textCritical"><code class="code">u-textCritical</code> Lorem ipsum</div>
</div>
<div>
	<div class="u-textKiwi"><code class="code">u-textKiwi</code> Lorem ipsum</div>
	<div class="u-textLime"><code class="code">u-textLime</code> Lorem ipsum</div>
	<div class="u-textCucumber"><code class="code">u-textCucumber</code> Lorem ipsum</div>
	<div class="u-textMint"><code class="code">u-textMint</code> Lorem ipsum</div>
	<div class="u-textGlacier"><code class="code">u-textGlacier</code> Lorem ipsum</div>
	<div class="u-textLagoon"><code class="code">u-textLagoon</code> Lorem ipsum</div>
	<div class="u-textBlueberry"><code class="code">u-textBlueberry</code> Lorem ipsum</div>
	<div class="u-textLavender"><code class="code">u-textLavender</code> Lorem ipsum</div>
	<div class="u-textGrape"><code class="code">u-textGrape</code> Lorem ipsum</div>
	<div class="u-textWatermelon"><code class="code">u-textWatermelon</code> Lorem ipsum</div>
	<div class="u-textPumpkin"><code class="code">u-textPumpkin</code> Lorem ipsum</div>
	<div class="u-textPineapple"><code class="code">u-textPineapple</code> Lorem ipsum</div>
</div>
<div>
	<div class="u-textLight"><code class="code">u-textLight</code> Lorem ipsum</div>
	<div class="u-textPlaceholder"><code class="code">u-textPlaceholder</code> Lorem ipsum</div>
</div>
`;
}

const Template: StoryFn<TextColorStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			gap: var(--pr-t-spacings-500);
			display: flex;
			flex-direction: column;

			> div {
				display: flex;
				gap: var(--pr-t-spacings-100);
				flex-wrap: wrap; 
				align-items: flex-start;

				> div { 	
					border: 1px solid var(--palettes-neutral-600);
					padding: var(--pr-t-spacings-100);
				}
			} 
		}
		`,
	],
});

export const TextColor = Template.bind({});
TextColor.args = {};
