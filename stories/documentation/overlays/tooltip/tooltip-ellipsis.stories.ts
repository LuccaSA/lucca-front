import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'tooltip-stories',
	imports: [LuTooltipModule],
	template: ` <h1>With ellipsis (should be green)</h1>
		<div class="test ellipsis width400 fontSize2" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 paddingRight" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 paddingLeft" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 paddingRight paddingLeft" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 borderRight" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 borderLeft" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 borderLeft borderRight" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>

		<h1 class="pr-u-marginTop300">Without ellipsis (should be black)</h1>
		<div class="test width200" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis resize" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 fontWeight" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 fontWeight" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing.</div>
		<div class="test ellipsis width400 fontSize2" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet.</div>
		<div class="test ellipsis width400 paddingInlineEnd" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 paddingInlineStart" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 paddingInlineEnd paddingInlineStart" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 paddingInlineEnd paddingInlineStart" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur.</div>
		<div class="test ellipsis width400 borderInlineEnd" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 borderInlineStart" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 borderInlineStart borderInlineEnd" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit.</div>
		<div class="test ellipsis width400 borderInlineStart borderInlineEnd" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur.</div>`,
	styles: [
		`
			.ellipsis {
				text-overflow: ellipsis;
				display: block;
				overflow: hidden;
				white-space: nowrap;
			}

			.test {
				padding-block-end: 1rem;
				border: 1px solid;
			}

			.fontWeight {
				font-weight: var(--pr-t-font-fontWeight-bold);
			}

			.fontSize2 {
				font-size: 2rem;
			}

			.width200 {
				inline-size: 200px;
			}

			.width400 {
				inline-size: 400px;
			}

			.paddingInlineEnd {
				padding-inline-end: 50px;
			}

			.paddingInlineStart {
				padding-inline-start: 50px;
			}

			.borderInlineEnd {
				border-inline-end-width: 50px;
			}

			.borderInlineStart {
				border-inline-start-width: 50px;
			}

			.resize {
				resize: inline;
			}

			:host {
				margin: 0.5rem;
				gap: 0.5rem;
				display: flex;
				flex-direction: column;
				justify-content: flex-start;
			}

			[tabindex='0'] {
				color: green;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipStory {}

export default {
	title: 'Documentation/Overlays/Tooltip/Ellipsis tests',
	component: TooltipStory,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template = (args: TooltipStory) => ({
	props: args,
});

export const Basic: StoryObj<TooltipStory> = {
	args: {},
	render: template,
};
