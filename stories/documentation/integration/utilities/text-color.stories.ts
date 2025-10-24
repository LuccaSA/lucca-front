import { Meta, StoryFn } from '@storybook/angular';

interface TextColorStory {}

export default {
	title: 'Documentation/Integration/Utilities/TextColor',
} as Meta;

function getTemplate(args: TextColorStory): string {
	return `<div class="demo-utilityWrapper">
	<div class="pr-u-colorText demo-utility"><code class="code">pr-u-colorText</code> Lorem ipsum</div>
	<div class="pr-u-colorTextHeading demo-utility"><code class="code">pr-u-colorTextHeading</code> Lorem ipsum</div>
	<div class="pr-u-colorTextHighlight demo-utility"><code class="code">pr-u-colorTextHighlight</code> Lorem ipsum</div>
	<div class="pr-u-colorTextSubtle demo-utility"><code class="code">pr-u-colorTextSubtle</code> Lorem ipsum</div>
	<div class="pr-u-colorTextDisabled demo-utility"><code class="code">pr-u-colorTextDisabled</code> Lorem ipsum</div>
	<div class="pr-u-colorTextReverse demo-utility"><code class="code">pr-u-colorTextReverse</code> Lorem ipsum</div>
	<div class="pr-u-colorTextSuccess demo-utility"><code class="code">pr-u-colorTextSuccess</code> Lorem ipsum</div>
	<div class="pr-u-colorTextWarning demo-utility"><code class="code">pr-u-colorTextWarning</code> Lorem ipsum</div>
	<div class="pr-u-colorTextCritical demo-utility"><code class="code">pr-u-colorTextCritical</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="pr-u-textProduct demo-utility"><code class="code">pr-u-textProduct</code> Lorem ipsum</div>
	<div class="pr-u-textBrand demo-utility"><code class="code">pr-u-textBrand</code> Lorem ipsum</div>
	<div class="pr-u-textPlaceholder demo-utility"><code class="code">pr-u-textPlaceholder</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="pr-u-textKiwi demo-utility"><code class="code">pr-u-textKiwi</code> Lorem ipsum</div>
	<div class="pr-u-textLime demo-utility"><code class="code">pr-u-textLime</code> Lorem ipsum</div>
	<div class="pr-u-textCucumber demo-utility"><code class="code">pr-u-textCucumber</code> Lorem ipsum</div>
	<div class="pr-u-textMint demo-utility"><code class="code">pr-u-textMint</code> Lorem ipsum</div>
	<div class="pr-u-textGlacier demo-utility"><code class="code">pr-u-textGlacier</code> Lorem ipsum</div>
	<div class="pr-u-textLagoon demo-utility"><code class="code">pr-u-textLagoon</code> Lorem ipsum</div>
	<div class="pr-u-textBlueberry demo-utility"><code class="code">pr-u-textBlueberry</code> Lorem ipsum</div>
	<div class="pr-u-textLavender demo-utility"><code class="code">pr-u-textLavender</code> Lorem ipsum</div>
	<div class="pr-u-textGrape demo-utility"><code class="code">pr-u-textGrape</code> Lorem ipsum</div>
	<div class="pr-u-textWatermelon demo-utility"><code class="code">pr-u-textWatermelon</code> Lorem ipsum</div>
	<div class="pr-u-textPumpkin demo-utility"><code class="code">pr-u-textPumpkin</code> Lorem ipsum</div>
	<div class="pr-u-textPineapple demo-utility"><code class="code">pr-u-textPineapple</code> Lorem ipsum</div>
</div>
<h2>💀 Deprecated</h2>
<div class="demo-utilityWrapper">
	<div class="pr-u-textNeutral demo-utility"><code class="code">pr-u-textNeutral</code> Lorem ipsum</div>
	<div class="pr-u-textLight demo-utility"><code class="code">pr-u-textLight</code> Lorem ipsum</div>
	<div class="pr-u-textSuccess demo-utility"><code class="code">pr-u-textSuccess</code> Lorem ipsum</div>
	<div class="pr-u-textWarning demo-utility"><code class="code">pr-u-textWarning</code> Lorem ipsum</div>
	<div class="pr-u-textCritical demo-utility"><code class="code">pr-u-textCritical</code> Lorem ipsum</div>
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
