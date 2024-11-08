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
</div>
<div class="demo-utilityWrapper">
	<div class="u-textNeutral0 demo-utility"><code class="code">u-textNeutral0</code> Lorem ipsum</div>
	<div class="u-textNeutral25 demo-utility"><code class="code">u-textNeutral25</code> Lorem ipsum</div>
	<div class="u-textNeutral50 demo-utility"><code class="code">u-textNeutral50</code> Lorem ipsum</div>
	<div class="u-textNeutral100 demo-utility"><code class="code">u-textNeutral100</code> Lorem ipsum</div>
	<div class="u-textNeutral200 demo-utility"><code class="code">u-textNeutral200</code> Lorem ipsum</div>
	<div class="u-textNeutral300 demo-utility"><code class="code">u-textNeutral300</code> Lorem ipsum</div>
	<div class="u-textNeutral400 demo-utility"><code class="code">u-textNeutral400</code> Lorem ipsum</div>
	<div class="u-textNeutral500 demo-utility"><code class="code">u-textNeutral500</code> Lorem ipsum</div>
	<div class="u-textNeutral600 demo-utility"><code class="code">u-textNeutral600</code> Lorem ipsum</div>
	<div class="u-textNeutral700 demo-utility"><code class="code">u-textNeutral700</code> Lorem ipsum</div>
	<div class="u-textNeutral800 demo-utility"><code class="code">u-textNeutral800</code> Lorem ipsum</div>
	<div class="u-textNeutral900 demo-utility"><code class="code">u-textNeutral900</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-textProduct0 demo-utility"><code class="code">u-textProduct0</code> Lorem ipsum</div>
	<div class="u-textProduct25 demo-utility"><code class="code">u-textProduct25</code> Lorem ipsum</div>
	<div class="u-textProduct50 demo-utility"><code class="code">u-textProduct50</code> Lorem ipsum</div>
	<div class="u-textProduct100 demo-utility"><code class="code">u-textProduct100</code> Lorem ipsum</div>
	<div class="u-textProduct200 demo-utility"><code class="code">u-textProduct200</code> Lorem ipsum</div>
	<div class="u-textProduct300 demo-utility"><code class="code">u-textProduct300</code> Lorem ipsum</div>
	<div class="u-textProduct400 demo-utility"><code class="code">u-textProduct400</code> Lorem ipsum</div>
	<div class="u-textProduct500 demo-utility"><code class="code">u-textProduct500</code> Lorem ipsum</div>
	<div class="u-textProduct600 demo-utility"><code class="code">u-textProduct600</code> Lorem ipsum</div>
	<div class="u-textProduct700 demo-utility"><code class="code">u-textProduct700</code> Lorem ipsum</div>
	<div class="u-textProduct800 demo-utility"><code class="code">u-textProduct800</code> Lorem ipsum</div>
	<div class="u-textProduct900 demo-utility"><code class="code">u-textProduct900</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-textSuccess50 demo-utility"><code class="code">u-textSuccess50</code> Lorem ipsum</div>
	<div class="u-textSuccess100 demo-utility"><code class="code">u-textSuccess100</code> Lorem ipsum</div>
	<div class="u-textSuccess200 demo-utility"><code class="code">u-textSuccess200</code> Lorem ipsum</div>
	<div class="u-textSuccess300 demo-utility"><code class="code">u-textSuccess300</code> Lorem ipsum</div>
	<div class="u-textSuccess400 demo-utility"><code class="code">u-textSuccess400</code> Lorem ipsum</div>
	<div class="u-textSuccess500 demo-utility"><code class="code">u-textSuccess500</code> Lorem ipsum</div>
	<div class="u-textSuccess600 demo-utility"><code class="code">u-textSuccess600</code> Lorem ipsum</div>
	<div class="u-textSuccess700 demo-utility"><code class="code">u-textSuccess700</code> Lorem ipsum</div>
	<div class="u-textSuccess800 demo-utility"><code class="code">u-textSuccess800</code> Lorem ipsum</div>
	<div class="u-textSuccess900 demo-utility"><code class="code">u-textSuccess900</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-textWarning50 demo-utility"><code class="code">u-textWarning50</code> Lorem ipsum</div>
	<div class="u-textWarning100 demo-utility"><code class="code">u-textWarning100</code> Lorem ipsum</div>
	<div class="u-textWarning200 demo-utility"><code class="code">u-textWarning200</code> Lorem ipsum</div>
	<div class="u-textWarning300 demo-utility"><code class="code">u-textWarning300</code> Lorem ipsum</div>
	<div class="u-textWarning400 demo-utility"><code class="code">u-textWarning400</code> Lorem ipsum</div>
	<div class="u-textWarning500 demo-utility"><code class="code">u-textWarning500</code> Lorem ipsum</div>
	<div class="u-textWarning600 demo-utility"><code class="code">u-textWarning600</code> Lorem ipsum</div>
	<div class="u-textWarning700 demo-utility"><code class="code">u-textWarning700</code> Lorem ipsum</div>
	<div class="u-textWarning800 demo-utility"><code class="code">u-textWarning800</code> Lorem ipsum</div>
	<div class="u-textWarning900 demo-utility"><code class="code">u-textWarning900</code> Lorem ipsum</div>
</div>
<div class="demo-utilityWrapper">
	<div class="u-textCritical50 demo-utility"><code class="code">u-textCritical50</code> Lorem ipsum</div>
	<div class="u-textCritical100 demo-utility"><code class="code">u-textCritical100</code> Lorem ipsum</div>
	<div class="u-textCritical200 demo-utility"><code class="code">u-textCritical200</code> Lorem ipsum</div>
	<div class="u-textCritical300 demo-utility"><code class="code">u-textCritical300</code> Lorem ipsum</div>
	<div class="u-textCritical400 demo-utility"><code class="code">u-textCritical400</code> Lorem ipsum</div>
	<div class="u-textCritical500 demo-utility"><code class="code">u-textCritical500</code> Lorem ipsum</div>
	<div class="u-textCritical600 demo-utility"><code class="code">u-textCritical600</code> Lorem ipsum</div>
	<div class="u-textCritical700 demo-utility"><code class="code">u-textCritical700</code> Lorem ipsum</div>
	<div class="u-textCritical800 demo-utility"><code class="code">u-textCritical800</code> Lorem ipsum</div>
	<div class="u-textCritical900 demo-utility"><code class="code">u-textCritical900</code> Lorem ipsum</div>
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
