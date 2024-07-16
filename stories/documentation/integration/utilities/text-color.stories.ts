import { Meta, StoryFn } from '@storybook/angular';

interface TextColorStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextColor',
} as Meta;

function getTemplate(args: TextColorStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="u-textNeutral demo-utility"><code class="code">u-textNeutral</code> Lorem ipsum</div>
	<div class="u-textProduct demo-utility"><code class="code">u-textProduct</code> Lorem ipsum</div>
	<div class="u-textBrand demo-utility"><code class="code">u-textBrand</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-textSuccess demo-utility"><code class="code">u-textSuccess</code> Lorem ipsum</div>
	<div class="u-textWarning demo-utility"><code class="code">u-textWarning</code> Lorem ipsum</div>
	<div class="u-textCritical demo-utility"><code class="code">u-textCritical</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-textKiwi demo-utility"><code class="code">u-textKiwi</code> Lorem ipsum</div>
	<div class="u-textLime demo-utility"><code class="code">u-textLime</code> Lorem ipsum</div>
	<div class="u-textCucumber demo-utility"><code class="code">u-textCucumber</code> Lorem ipsum</div>
	<div class="u-textMint demo-utility"><code class="code">u-textMint</code> Lorem ipsum</div>
	<div class="u-textGlacier demo-utility"><code class="code">u-textGlacier</code> Lorem ipsum</div>
	<div class="u-textLagoon demo-utility"><code class="code">u-textLagoon</code> Lorem ipsum</div>
	<div class="u-textBlueberry demo-utility"><code class="code">u-textBlueberry</code> Lorem ipsum</div>
	<div class="u-textLavender demo-utility"><code class="code">u-textLavender</code> Lorem ipsum</div>
	<div class="u-textGrape demo-utility"><code class="code">u-textGrape</code> Lorem ipsum</div>
	<div class="u-textWatermelon demo-utility"><code class="code">u-textWatermelon</code> Lorem ipsum</div>
	<div class="u-textPumpkin demo-utility"><code class="code">u-textPumpkin</code> Lorem ipsum</div>
	<div class="u-textPineapple demo-utility"><code class="code">u-textPineapple</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-textLight demo-utility"><code class="code">u-textLight</code> Lorem ipsum</div>
	<div class="u-textPlaceholder demo-utility"><code class="code">u-textPlaceholder</code> Lorem ipsum</div>
</div>`;
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
