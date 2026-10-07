import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { configureLuPopover, luPopoverTranslations, PopoverDirective } from '@lucca-front/ng/popover2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

import { HiddenArgType } from '../../../helpers/common-arg-types';
import { cleanupTemplate, generateInputs, intlArgType } from '../../../helpers/stories';

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
		// Property names of aliased inputs: only the aliases are bindable, hide the duplicates.
		luPopoverDisabledInput: HiddenArgType,
		luPopoverNoCloseButtonInput: HiddenArgType,
		customPositionsInput: HiddenArgType,
		luPopoverTrigger: {
			control: 'select',
			options: ['click', 'click+hover', 'hover+focus'],
			description: 'Méthode d’ouverture du popover.',
			table: { category: 'models', defaultValue: { summary: 'click' } },
		},
		luPopoverPosition: {
			control: 'select',
			options: ['above', 'below', 'before', 'after'],
			description: 'Position du popover par rapport à son déclencheur.',
			table: { category: 'inputs', defaultValue: { summary: 'above' } },
		},
		luPopoverDisabled: {
			description: 'Désactive le popover.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		luPopoverOpenDelay: {
			description: 'Délai en millisecondes avant ouverture du popover, lorsque `luPopoverTrigger` inclut `hover` ou `focus`.',
			table: { category: 'inputs', defaultValue: { summary: '300' } },
		},
		luPopoverCloseDelay: {
			description: 'Délai en millisecondes avant fermeture du popover, lorsque `luPopoverTrigger` inclut `hover` ou `focus`.',
			table: { category: 'inputs', defaultValue: { summary: '100' } },
		},
		overlayScrollStrategy: {
			control: 'select',
			options: ['reposition', 'block', 'close'],
			description: '[v21.1] Comportement du popover lors du scroll.',
			table: { category: 'inputs', defaultValue: { summary: 'reposition' } },
		},
		luPopoverNoCloseButton: {
			description: 'Masque le bouton de fermeture du popover visible à la navigation clavier.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		luPopoverMaxBlockSize: {
			control: 'text',
			description: 'Modifie la hauteur max de la popover.',
			table: { category: 'inputs' },
		},
		luPopoverMaxInlineSize: {
			control: 'text',
			description: 'Modifie la largeur max de la popover.',
			table: { category: 'inputs' },
		},
		customPositions: {
			control: false,
			description: 'Positions personnalisées (`ConnectionPositionPair[]` du CDK Angular), prioritaires sur `luPopoverPosition`.',
			table: { category: 'inputs', type: { summary: 'ConnectionPositionPair[]' } },
		},
		luPopoverAnchor: {
			control: false,
			description: 'Élément sur lequel le popover est positionné, à la place de son déclencheur.',
			table: { category: 'inputs', type: { summary: 'FlexibleConnectedPositionStrategyOrigin' } },
		},
		luPopoverIgnoredOutsidePointerTargets: {
			control: false,
			description: 'Élément(s) considéré(s) comme faisant partie du popover : un clic dessus ne le ferme pas.',
			table: { category: 'inputs', type: { summary: 'HTMLElement | HTMLElement[]' } },
		},
		luPopoverOpened: {
			description: 'Événement déclenché à l’ouverture du popover.',
			action: 'luPopoverOpened',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		luPopoverClosed: {
			description: 'Événement déclenché à la fermeture du popover.',
			action: 'luPopoverClosed',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		intl: intlArgType(luPopoverTranslations, 'ILuPopover2Label'),
	},
} as Meta;

// Args must be keyed on the template aliases, not on the `…Input` property names, for `generateInputs` to bind them.
export type PopoverStoryArgs = Omit<PopoverDirective, 'luPopoverDisabledInput' | 'luPopoverNoCloseButtonInput'> & {
	luPopoverDisabled: boolean;
	luPopoverNoCloseButton: boolean;
};

export const Basic: StoryObj<PopoverStoryArgs> = {
	render: (args, { argTypes }) => {
		const action = args.luPopoverTrigger === 'click' ? 'Cliquez-moi' : 'Cliquez ou survolez-moi';
		let openDelay = '';
		if (args.luPopoverTrigger !== 'click') {
			openDelay = ' ' + args.luPopoverOpenDelay + 'ms';
		}
		return {
			props: args,
			template: `<div class="demo">
	<button luButton [luPopover2]="contentRef" ${generateInputs(args, argTypes)} (luPopoverOpened)="luPopoverOpened()" (luPopoverClosed)="luPopoverClosed()">${action}${openDelay} !</button>
	<ng-template #contentRef>
		<div class="popover-contentOptional">
			<h3>Title</h3>
			<lu-divider />
			<lu-listing checklist palette="success">
				<lu-listing-item>item item item item item item item item item item item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
				<lu-listing-item>item</lu-listing-item>
			</lu-listing>
		</div>
	</ng-template>
</div>
`,
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
		luPopoverCloseDelay: 100,
		luPopoverOpenDelay: 300,
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
		luPopoverNoCloseButton: false,
		luPopoverMaxBlockSize: '',
		luPopoverMaxInlineSize: '',
	},
};
export const CustomPosition: StoryObj<PopoverStoryArgs> = {
	render: (_args, { argTypes }) => {
		const { luPopoverPosition, ...args } = _args;
		const action = args.luPopoverTrigger === 'click' ? 'Cliquez-moi' : 'Cliquez ou survolez-moi';
		let openDelay = '';
		if (args.luPopoverTrigger !== 'click') {
			openDelay = ' ' + args.luPopoverOpenDelay + 'ms';
		}
		return {
			props: {
				luPopoverOpened: args.luPopoverOpened,
				luPopoverClosed: args.luPopoverClosed,
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

	<button luButton [luPopover2]="contentRef" [customPositions]="examplePosition" ${generateInputs(args, argTypes)} (luPopoverOpened)="luPopoverOpened()" (luPopoverClosed)="luPopoverClosed()">${action}${openDelay} !</button>
	<ng-template #contentRef>
		<div class="popover-contentOptional">
			<div class="verticalNavigation mod-iconless">
				<ul class="verticalNavigation-list pr-u-listReset">
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
		luPopoverCloseDelay: 100,
		luPopoverOpenDelay: 300,
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
		luPopoverNoCloseButton: false,
		overlayScrollStrategy: 'reposition',
	},
};
