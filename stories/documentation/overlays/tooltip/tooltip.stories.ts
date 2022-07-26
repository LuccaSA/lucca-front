import { Component } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'tooltip-stories',
	template: `<h1>Tooltips</h1>

		<h2>Basics</h2>
		<button type="button" class="button" luTooltip="i am a tooltip">i am natively focusable</button>
		<span class="label" luTooltip="i am a tooltip">i am not</span>

		<h2>With disabled tooltips</h2>
		<button type="button" class="button" luTooltip="i should not appear" luTooltipDisabled="true">i am natively focusable</button>
		<span class="label" luTooltip="i should not appear" luTooltipDisabled="true">i am not</span>

		<h2>With hardcoded tabindexes</h2>
		<button type="button" class="button" luTooltip="i am a tooltip" tabindex="8">i am natively focusable</button>
		<span class="label" luTooltip="i am a tooltip" tabindex="8">i am not</span>

		<h2>With hardcoded tabindexes and tooltipdisabled</h2>
		<button type="button" class="button" luTooltip="i should not appear" tabindex="8" luTooltipDisabled="true">i am natively focusable</button>
		<span class="label" luTooltip="i should not appear" tabindex="8" luTooltipDisabled="true">i am not</span>
		<h2>On a disabled button</h2>
		<button type="button" class="button" luTooltip="i should not appear" disabled="true">i am natively focusable</button>

		<h2>When Ellipsis</h2>
		<button type="button" class="button short-button u-ellipsis" style="width: 150px;" luTooltip="My text is too long" luTooltipWhenEllipsis="true">i am long long long long long long</button>
		<button type="button" class="button short-button u-ellipsis" style="width: 150px;" luTooltip="You can't see me" luTooltipWhenEllipsis="true">i am short</button>`,
})
class TooltipStory {}

export default {
	title: 'Documentation/Overlays/Tooltip',
	component: TooltipStory,
	decorators: [
		moduleMetadata({
			entryComponents: [TooltipStory],
			imports: [LuTooltipModule, BrowserAnimationsModule],
		}),
	],
} as Meta;

const template: Story<TooltipStory> = (args: TooltipStory) => ({
	props: args,
});

export const basic = template.bind({});
basic.args = {};

const code = `
/* 1. Importer LuTooltipModule */
import { LuTooltipModule } from '@lucca-front/ng/tooltip';

@NgModule({
	imports: [LuTooltipModule]
})
class TooltipStoriesModule {}

/* 2. Utiliser lu-tooltip */
@Component({
	selector: 'tooltip-story',
	template: \`
		<h1>Tooltips</h1>

		<h2>Basics</h2>
		<button type="button" class="button" luTooltip="i am a tooltip">i am natively focusable</button>
		<span class="label" luTooltip="i am a tooltip">i am not</span>

		<h2>With disabled tooltips</h2>
		<button type="button" class="button" luTooltip="i should not appear" luTooltipDisabled="true">i am natively focusable</button>
		<span class="label" luTooltip="i should not appear" luTooltipDisabled="true">i am not</span>

		<h2>With hardcoded tabindexes</h2>
		<button type="button" class="button" luTooltip="i am a tooltip" tabindex="8">i am natively focusable</button>
		<span class="label" luTooltip="i am a tooltip" tabindex="8">i am not</span>

		<h2>With hardcoded tabindexes and tooltipdisabled</h2>
		<button type="button" class="button" luTooltip="i should not appear" tabindex="8" luTooltipDisabled="true">i am natively focusable</button>
		<span class="label" luTooltip="i should not appear" tabindex="8" luTooltipDisabled="true">i am not</span>
		<h2>On a disabled button</h2>
		<button type="button" class="button" luTooltip="i should not appear" disabled="true">i am natively focusable</button>

		<h2>When Ellipsis</h2>
		<button type="button" class="button u-ellipsis" style="width: 150px;" luTooltip="My text is too long" luTooltipWhenEllipsis="true">i am long long long long long long</button>
		<button type="button" class="button u-ellipsis" style="width: 150px;" luTooltip="You can't see me" luTooltipWhenEllipsis="true">i am short</button>
	\`
})
class TooltipStory { }`;
basic.parameters = {
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
