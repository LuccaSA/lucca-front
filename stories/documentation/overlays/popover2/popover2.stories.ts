import { ButtonComponent } from '@lucca-front/ng/button';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from '../../../helpers/common-arg-types';
import { cleanupTemplate, createTestStory, generateInputs } from '../../../helpers/stories';
import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { screen, userEvent, within, expect } from '@storybook/test';
import { sleep, waitForAngular } from 'stories/helpers/test';

export default {
	title: 'Documentation/Overlays/Popover2/Angular',
	component: PopoverDirective,
	decorators: [
		applicationConfig({
			providers: [configureLuPopover()],
		}),
		moduleMetadata({
			imports: [ButtonComponent, PopoverDirective],
		}),
	],
	argTypes: {
		luPopover2: HiddenArgType,
		luPopoverTrigger: {
			control: 'select',
			options: ['click', 'click+hover', 'hover+focus'],
			description: '[v18.2] Hover + focus',
		},
		luPopoverNoCloseButton: {
			description: '[v18.2]',
		},
	},
} as Meta;

export const Basic: StoryObj<PopoverDirective> = {
	render: (args, { argTypes }) => {
		const action = args.luPopoverTrigger === 'click' ? 'Cliquez-moi' : 'Cliquez ou survolez-moi';
		let openDelay = '';
		if (args.luPopoverTrigger !== 'click') {
			openDelay = ' ' + args.luPopoverOpenDelay + 'ms';
		}
		return {
			template: cleanupTemplate(`<div class="demo">
	<button luButton type="button" [luPopover2]="contentRef" ${generateInputs(args, argTypes)}>${action}${openDelay} !</button>
	<ng-template #contentRef>
		<div class="popover-contentOptional">
			<div class="verticalNavigation mod-iconless">
				<ul class="verticalNavigation-list u-listReset">
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item A</a></li>
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item B</a></li>
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item C</a></li>
				</ul>
			</div>
		</div>
	</ng-template>
</div>
`),
			styles: [
				`
	.demo {
		display: flex;
		min-block-size: 20rem;
		align-items: center;
		justify-content: center;
	}`,
			],
		};
	},
	args: {
		luPopoverTrigger: 'click',
		luPopoverCloseDelay: 300,
		luPopoverOpenDelay: 300,
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
		luPopoverNoCloseButton: false,
	},
};

export const BasicTEST = createTestStory(Basic, async (context) => {
	const canvas = within(context.canvasElement);
	const action = (context.args as any).luPopoverTrigger === 'click' ? 'Cliquez-moi' : 'Cliquez ou survolez-moi';
	let openDelay = '';
	if ((context.args as any).luPopoverTrigger !== 'click') {
		openDelay = ' ' + (context.args as any).luPopoverOpenDelay + 'ms';
	}
	const trigger = canvas.getByText(`${action}${openDelay} !`);

	// Testing open with keyboard first
	trigger.focus();
	await expect(trigger).toHaveFocus();
	await userEvent.keyboard('{Enter}');
	await waitForAngular();
	// Check aria-expanded
	await expect(trigger.getAttribute('aria-expanded'), 'aria-expanded').toBe('true');
	await expect(screen.getByText('Item B')).toBeVisible();
	await userEvent.keyboard('{Escape}');
	// Query won't fail when it finds nothing, which is what we want to expect here
	await expect(screen.queryByText('Item B')).toBeNull();
	await expect(trigger.getAttribute('aria-expanded'), 'aria-expanded').toBe('false');
	// Then mouse
	await userEvent.click(trigger);
	await waitForAngular();
	await expect(trigger.getAttribute('aria-expanded'), 'aria-expanded').toBe('true');
	await expect(screen.getByText('Item B')).toBeVisible();
	const backdrop = screen.getByText((content, element) => {
		return element.className.includes('cdk-overlay-backdrop');
	});
	await userEvent.click(backdrop);
	// Query won't fail when it finds nothing, which is what we want to expect here
	await expect(screen.queryByText('Item B')).toBeNull();
	await expect(trigger.getAttribute('aria-expanded'), 'aria-expanded').toBe('false');
});

export const CustomPosition: StoryObj<PopoverDirective> = {
	render: (_args, { argTypes }) => {
		const { luPopoverPosition, ...args } = _args;
		const action = args.luPopoverTrigger === 'click' ? 'Cliquez-moi' : 'Cliquez ou survolez-moi';
		let openDelay = '';
		if (args.luPopoverTrigger !== 'click') {
			openDelay = ' ' + args.luPopoverOpenDelay + 'ms';
		}
		return {
			props: {
				examplePosition: [
					new ConnectionPositionPair(
						{ originX: 'start', originY: 'bottom' },
						{
							overlayX: 'start',
							overlayY: 'top',
						},
						-8,
						0,
					),
					new ConnectionPositionPair(
						{ originX: 'start', originY: 'top' },
						{
							overlayX: 'start',
							overlayY: 'bottom',
						},
						-8,
						-32,
					),
				],
			},
			template: cleanupTemplate(`

	examplePosition:
	<pre>
	[
    new ConnectionPositionPair(&#123;originX: 'start', originY: 'bottom' &#125;, &#123; overlayX: 'start', overlayY: 'top' &#125;, -8, 0),
    new ConnectionPositionPair(
        &#123; originX: 'start', originY: 'top' &#125;,
				&#123;
            overlayX: 'start',
            overlayY: 'bottom',
        &#125;,
        -8,
        -32,
    ),
	]
	</pre>

	<a href="https://github.com/angular/components/blob/main/src/cdk/overlay/position/connected-position.ts#L28-L53">Angular CDK model for <code>ConnectedPosition</code></a>
	<br>
	<br>

	<button luButton [luPopover2]="contentRef" [customPositions]="examplePosition" ${generateInputs(args, argTypes)}>${action}${openDelay} !</button>
	<ng-template #contentRef>
		<div class="popover-contentOptional">
			<div class="verticalNavigation mod-iconless">
				<ul class="verticalNavigation-list u-listReset">
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item A</a></li>
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item B</a></li>
					<li class="verticalNavigation-list-item"><a href="#" class="verticalNavigation-list-item-link">Item C</a></li>
				</ul>
			</div>
		</div>
	</ng-template>
`),
			styles: [
				`
	.demo {
		display: flex;
		min-block-size: 20rem;
		align-items: center;
		justify-content: center;
	}`,
			],
		};
	},
	args: {
		luPopoverTrigger: 'click',
		luPopoverCloseDelay: 300,
		luPopoverOpenDelay: 300,
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
		luPopoverNoCloseButton: false,
	},
};
