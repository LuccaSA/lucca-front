import { provideAnimations } from '@angular/platform-browser/animations';
import { LuPopoverAlignment, LuPopoverPanelComponent, LuPopoverPosition, LuPopoverScrollStrategy, LuPopoverTriggerDirective, LuPopoverTriggerEvent } from '@lucca-front/ng/popover';
import { applicationConfig, ArgTypes, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { cleanupTemplate } from '@/helpers/stories';

interface PopoverBasicStory {
	content: string;
	luPopoverTrigger: LuPopoverTriggerEvent;
	luPopoverPosition: LuPopoverPosition;
	luPopoverAlignment: LuPopoverAlignment;
	luPopoverEnterDelay: number;
	luPopoverLeaveDelay: number;
	luPopoverDisabled: boolean;
	luPopoverOverlap: boolean;
	luPopoverOffsetX: number;
	luPopoverOffsetY: number;
	'close-on-click': boolean;
	'trap-focus': boolean;
	'scroll-strategy': LuPopoverScrollStrategy;
	'panel-classes': string;
	'content-classes': string;
	luPopoverOnOpen?: () => void;
	luPopoverOnClose?: () => void;
	open?: () => void;
	close?: () => void;
	hovered?: (hovered: boolean) => void;
}

const panelInputs = ['close-on-click', 'trap-focus', 'scroll-strategy', 'panel-classes', 'content-classes'] as const;

// These inputs have no `booleanAttribute` / `numberAttribute` transform: non-string values are bound as properties.
function bindInputs(args: Partial<PopoverBasicStory>, argTypes: ArgTypes): string {
	return Object.entries(args).reduce((acc, [name, value]) => {
		const defaultValue: unknown = argTypes[name]?.table?.defaultValue?.summary;
		if (value === null || value === undefined || value === '' || String(value) === defaultValue) {
			return acc;
		}
		return typeof value === 'string' ? `${acc} ${name}="${value}"` : `${acc} [${name}]="${String(value)}"`;
	}, '');
}

export default {
	title: 'Documentation/Overlays/Popover/Angular',
	decorators: [
		applicationConfig({ providers: [provideAnimations()] }),
		moduleMetadata({
			imports: [LuPopoverTriggerDirective, LuPopoverPanelComponent],
		}),
	],
	argTypes: {
		content: {
			description: 'Contenu du popover.',
			table: { category: 'story' },
		},
		luPopoverTrigger: {
			options: ['click', 'hover', 'focus', 'none'],
			control: { type: 'select' },
			description: 'Événement déclenchant l’ouverture du popover.',
			table: { category: 'inputs', defaultValue: { summary: 'click' } },
		},
		luPopoverPosition: {
			options: ['above', 'below', 'before', 'after'],
			control: { type: 'select' },
			description: 'Position du popover par rapport à son déclencheur.',
			table: { category: 'inputs', defaultValue: { summary: 'below' } },
		},
		luPopoverAlignment: {
			options: ['top', 'bottom', 'left', 'right', 'center'],
			control: { type: 'select' },
			description: 'Alignement du popover par rapport à son déclencheur.',
			table: { category: 'inputs', defaultValue: { summary: 'center' } },
		},
		luPopoverEnterDelay: {
			control: { type: 'number' },
			description: 'Délai en millisecondes avant l’ouverture du popover, lorsque `luPopoverTrigger` vaut `hover`.',
			table: { category: 'inputs', defaultValue: { summary: '50' } },
		},
		luPopoverLeaveDelay: {
			control: { type: 'number' },
			description: 'Délai en millisecondes avant la fermeture du popover, lorsque `luPopoverTrigger` vaut `hover`.',
			table: { category: 'inputs', defaultValue: { summary: '50' } },
		},
		luPopoverDisabled: {
			description: 'Empêche l’ouverture du popover.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		luPopoverOverlap: {
			description: 'Affiche le popover par-dessus son déclencheur.',
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		luPopoverOffsetX: {
			control: { type: 'number' },
			description: 'Décalage horizontal du popover, en pixels.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
		},
		luPopoverOffsetY: {
			control: { type: 'number' },
			description: 'Décalage vertical du popover, en pixels.',
			table: { category: 'inputs', defaultValue: { summary: '0' } },
		},
		luPopoverOnOpen: {
			description: 'Événement déclenché à l’ouverture du popover.',
			action: 'luPopoverOnOpen',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		luPopoverOnClose: {
			description: 'Événement déclenché à la fermeture du popover.',
			action: 'luPopoverOnClose',
			control: false,
			table: { category: 'outputs', type: { summary: 'void' } },
		},
		'close-on-click': {
			description: 'Ferme le popover au clic sur son contenu.',
			table: { category: 'inputs (popover)', defaultValue: { summary: 'false' } },
		},
		'trap-focus': {
			description: 'Piège le focus clavier dans le popover.',
			table: { category: 'inputs (popover)', defaultValue: { summary: 'false' } },
		},
		'scroll-strategy': {
			options: ['reposition', 'block', 'close'],
			control: { type: 'select' },
			description: 'Comportement du popover lors du scroll.',
			table: { category: 'inputs (popover)', defaultValue: { summary: 'reposition' } },
		},
		'panel-classes': {
			control: { type: 'text' },
			description: 'Classes CSS appliquées au panneau du popover.',
			table: { category: 'inputs (popover)' },
		},
		'content-classes': {
			control: { type: 'text' },
			description: 'Classes CSS appliquées au contenu du popover.',
			table: { category: 'inputs (popover)' },
		},
		open: {
			description: 'Événement déclenché à l’ouverture du popover.',
			action: 'open',
			control: false,
			table: { category: 'outputs (popover)', type: { summary: 'void' } },
		},
		close: {
			description: 'Événement déclenché à la fermeture du popover.',
			action: 'close',
			control: false,
			table: { category: 'outputs (popover)', type: { summary: 'void' } },
		},
		hovered: {
			description: 'Événement déclenché au survol du popover (`true`) et lorsque le pointeur le quitte (`false`).',
			action: 'hovered',
			control: false,
			table: { category: 'outputs (popover)', type: { summary: 'boolean' } },
		},
	},
	render: (args: PopoverBasicStory, { argTypes }) => {
		const { content, luPopoverOnOpen, luPopoverOnClose, open, close, hovered, ...inputs } = args;
		const panelArgs = Object.fromEntries(Object.entries(inputs).filter(([name]) => (panelInputs as readonly string[]).includes(name)));
		const triggerArgs = Object.fromEntries(Object.entries(inputs).filter(([name]) => !(panelInputs as readonly string[]).includes(name)));
		return {
			props: { luPopoverOnOpen, luPopoverOnClose, open, close, hovered },
			template:
				cleanupTemplate(`<button type="button" class="button" [luPopover]="popover"${bindInputs(triggerArgs, argTypes)} (luPopoverOnOpen)="luPopoverOnOpen()" (luPopoverOnClose)="luPopoverOnClose()">${args.luPopoverTrigger} me</button>
<lu-popover #popover${bindInputs(panelArgs, argTypes)} (open)="open()" (close)="close()" (hovered)="hovered($event)">${content}</lu-popover>`),
		};
	},
} as Meta<PopoverBasicStory>;

export const Basic: StoryObj<PopoverBasicStory> = {
	args: {
		content: '🎉 popover content 🏖️',
		luPopoverTrigger: 'click',
		luPopoverPosition: 'below',
		luPopoverAlignment: 'center',
		luPopoverEnterDelay: 50,
		luPopoverLeaveDelay: 50,
		luPopoverDisabled: false,
		luPopoverOverlap: false,
		luPopoverOffsetX: 0,
		luPopoverOffsetY: 0,
		'close-on-click': false,
		'trap-focus': false,
		'scroll-strategy': 'reposition',
		'panel-classes': '',
		'content-classes': '',
	},
};
