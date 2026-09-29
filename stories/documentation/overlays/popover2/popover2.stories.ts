import { ConnectionPositionPair } from '@angular/cdk/overlay';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { IconComponent } from '@lucca-front/ng/icon';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { configureLuPopover, PopoverDirective } from '@lucca-front/ng/popover2';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { waitForAngular } from '@/helpers/test';
import { expect, screen, userEvent, within } from 'storybook/test';
import { HiddenArgType } from '../../../helpers/common-arg-types';
import { cleanupTemplate, createTestStory, generateInputs } from '../../../helpers/stories';

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
		luPopoverTrigger: {
			control: 'select',
			options: ['click', 'click+hover', 'hover+focus'],
			description: 'Méthode d’ouverture du popover.',
			table: { category: 'models' },
		},
		luPopoverPosition: {
			control: 'select',
			options: ['above', 'below', 'before', 'after'],
			description: 'Position du popover par rapport à son déclencheur.',
			table: { category: 'inputs' },
		},
		luPopoverDisabled: {
			description: 'Désactive le popover.',
			table: { category: 'inputs' },
		},
		luPopoverOpenDelay: {
			description: 'Délai en millisecondes avant ouverture du popover.',
			table: { category: 'inputs' },
		},
		luPopoverCloseDelay: {
			description: 'Délai en millisecondes avant fermeture du popover.',
			table: { category: 'inputs' },
		},
		overlayScrollStrategy: {
			control: 'select',
			options: ['reposition', 'block', 'close'],
			description: '[v21.1] Comportement du popover lors du scroll.',
			table: { category: 'inputs' },
		},
		luPopoverNoCloseButton: {
			description: 'Masque le bouton de fermeture du popover visible à la navigation clavier.',
			table: { category: 'inputs' },
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
	},
} as Meta;

// Args must be keyed on the template aliases, not on the `…Input` property names, for `generateInputs` to bind them.
type PopoverStoryArgs = Omit<PopoverDirective, 'luPopoverDisabledInput' | 'luPopoverNoCloseButtonInput'> & {
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
			template: `<div class="demo">
	<button luButton [luPopover2]="contentRef" ${generateInputs(args, argTypes)}>${action}${openDelay} !</button>
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
		luPopoverCloseDelay: 300,
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
		luPopoverCloseDelay: 300,
		luPopoverOpenDelay: 300,
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
		luPopoverNoCloseButton: false,
		overlayScrollStrategy: 'reposition',
	},
};

export const BasicTEST = createTestStory(Basic, async ({ canvasElement, step }) => {
	const canvas = within(canvasElement);
	const button = await canvas.findByRole('button');

	await step('Mouse interaction', async () => {
		await userEvent.click(button);
		await waitForAngular();
		await expect(screen.getByRole('list')).toBeVisible();
		await userEvent.click(button);
		await expect(screen.queryByText('list')).toBeNull();
		await waitForAngular();
	});

	await step('Keyboard interactions', async () => {
		button.focus();
		await expect(button).toHaveFocus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(screen.getByRole('list')).toBeVisible();
		await userEvent.keyboard('{Escape}');
		await expect(screen.queryByText('list')).toBeNull();
	});
});

// Regression guard for #5396: since Angular 22.1.4, a dynamically created host inherits the namespace of its view container,
// so a popover opened from an SVG trigger was created as an invisible SVG element.
const SvgTrigger: StoryObj<PopoverStoryArgs> = {
	name: 'SVG trigger',
	render: (args, { argTypes }) => ({
		template: `<div class="demo">
	<svg class="gauge" width="80" height="80" viewBox="0 0 80 80" style="--components-gauge-value: 33; --components-gauge-circleR: 36px">
		<circle class="gauge-circleBackground" cx="40" cy="40" r="36" />
		<circle class="gauge-circleBar" cx="40" cy="40" r="36" tabindex="0" role="button" aria-label="SVG trigger" [luPopover2]="contentRef" ${generateInputs(args, argTypes)} />
	</svg>
	<ng-template #contentRef>
		<div class="popover-contentOptional">Opened from an SVG element</div>
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
	}),
	args: {
		luPopoverTrigger: 'click',
		luPopoverDisabled: false,
		luPopoverPosition: 'above',
	},
};

export const SvgTriggerTEST = createTestStory(SvgTrigger, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);
	const trigger = await canvas.findByRole('button', { name: 'SVG trigger' });

	await step('Mouse interaction opens a visible popover', async () => {
		await userEvent.click(trigger);
		await waitForAngular();

		const content = screen.getByText('Opened from an SVG element');
		await expect(content).toBeVisible();
		// toBeVisible() doesn't catch an element without layout: the regression rendered the popover as a 0×0 box
		const { width, height } = content.getBoundingClientRect();
		await expect(width).toBeGreaterThan(0);
		await expect(height).toBeGreaterThan(0);

		const popoverContent = content.closest('lu-popover-content');
		await expect(popoverContent?.namespaceURI).toBe('http://www.w3.org/1999/xhtml');
		await expect(trigger).toHaveAttribute('aria-expanded', 'true');
	});

	await step('Keyboard interaction closes the popover', async () => {
		await userEvent.keyboard('{Escape}');
		await waitForAngular();
		await expect(screen.queryByText('Opened from an SVG element')).toBeNull();
		await expect(trigger).toHaveAttribute('aria-expanded', 'false');
		await expect(trigger).toHaveFocus();
	});
});
