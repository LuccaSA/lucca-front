import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { HiddenArgType } from '../../../helpers/common-arg-types';
import { cleanupTemplate, generateInputs } from '../../../helpers/stories';

export default {
	title: 'Documentation/Overlays/Popover2/Angular',
	component: PopoverDirective,
	decorators: [
		applicationConfig({
			providers: [configureLuPopover()],
		}),
		moduleMetadata({
			imports: [ButtonComponent, PopoverDirective, DividerComponent, ListingComponent, ListingItemComponent, IconComponent],
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
	<button luButton [luPopover2]="contentRef" ${generateInputs(args, argTypes)}>${action}${openDelay} !</button>
	<ng-template #contentRef>
		<div class="popover-contentOptional">
			<h3>Titre</h3>
			<lu-divider />
			<lu-listing checklist palette="success">
				<lu-listing-item>Élement de liste</lu-listing-item>
				<lu-listing-item>Élement de liste</lu-listing-item>
				<lu-listing-item>Élement de liste</lu-listing-item>
			</lu-listing>
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
