import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { interval, map } from 'rxjs';

@Component({
	selector: 'tooltip-stories',
	imports: [LuTooltipModule, AsyncPipe],
	template: `
		<h1>Dynamic content — grows until ellipsis appears</h1>
		<div class="test ellipsis width400 fontSize2" luTooltip luTooltipWhenEllipsis>{{ dynamicGrowContent$ | async }}</div>

		<h1>Dynamic content — shrinks until ellipsis disappears</h1>
		<div class="test ellipsis width400" luTooltip luTooltipWhenEllipsis>{{ dynamicShrinkContent$ | async }}</div>

		<h1>Container resize toggle — click the button to toggle width</h1>
		<button (click)="toggleWidth()">Toggle container width ({{ containerWidth() }}px)</button>
		<div class="test ellipsis" [style.inline-size.px]="containerWidth()" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit. Quisquam voluptatibus.</div>

		<h1>Late-appearing element — appears after 2 seconds</h1>
		@if (showLateElement()) {
			<div class="test ellipsis width400 fontSize2" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit. This should have ellipsis.</div>
		} @else {
			<p><em>Element will appear in a moment…</em></p>
		}

		<h1>With ellipsis (should be green)</h1>
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
		<div class="test ellipsis width400 borderInlineStart borderInlineEnd" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur.</div>

		<h1 class="pr-u-marginTop300">Zoom / resize test (manual)</h1>
		<p>Use Ctrl +/- to zoom the browser, or resize the window. The resizable div below should update its ellipsis state.</p>
		<div class="test ellipsis resize" luTooltip luTooltipWhenEllipsis>Lorem ipsum dolor sit amet consectetur adipisicing elit. Drag the bottom-right corner to resize.</div>
	`,
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

			.paddingRight {
				padding-right: 50px;
			}

			.paddingLeft {
				padding-left: 50px;
			}

			.borderRight {
				border-right-width: 50px;
			}

			.borderLeft {
				border-left-width: 50px;
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
class TooltipStory {
	dynamicGrowContent$ = interval(1000).pipe(map((i) => 'lorem '.repeat(i)));

	dynamicShrinkContent$ = interval(1000).pipe(
		map((i) => {
			const fullText = 'Lorem ipsum dolor sit amet consectetur adipisicing elit quisquam voluptatibus';
			const words = fullText.split(' ');
			return words.slice(0, Math.max(1, words.length - i)).join(' ');
		}),
	);

	containerWidth = signal(200);

	showLateElement = signal(false);

	constructor() {
		setTimeout(() => this.showLateElement.set(true), 2000);
	}

	toggleWidth() {
		this.containerWidth.update((w) => (w === 200 ? 600 : 200));
	}
}

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
