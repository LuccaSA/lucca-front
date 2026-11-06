import { LOCALE_ID } from '@angular/core';
import { KbdComponent, KbdKey, luKbdTranslations } from '@lucca-front/ng/kbd';
import { applicationConfig, ArgTypes, moduleMetadata } from '@storybook/angular-vite';
import { generateInputs, intlArgType } from '@/helpers/stories';

/**
 * Shared by the Angular kbd stories, kept out of a `.stories.ts` file where every named export would be a story
 */

export type KbdModifier = 'Control' | 'Alt' | 'Meta' | 'Shift';

export interface KbdStory {
	modifiers: KbdModifier[];
	key?: KbdKey;
	otherKey: string;
	inDropdown: boolean;
}

const MODIFIERS: KbdModifier[] = ['Control', 'Alt', 'Shift', 'Meta'];

/** The named keys, whose value is not obvious to guess, then any other key typed in a text control */
export const OTHER = 'Other';

const KEYS: KbdKey[] = ['Escape', 'Enter', 'Tab', ' ', 'Delete', 'Home', 'End', 'PageUp', 'PageDown', 'Backspace', 'ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', OTHER];

/**
 * A single key is written as a plain attribute, a combination as a bound array, modifiers first in their conventional order.
 * Keys are escaped, as any value can be typed in the free text control.
 * The key is missing when the empty option of its select control is picked: `null` when there is nothing to display
 */
function keysInput(modifiers: KbdModifier[] = [], key: KbdKey | undefined): string | null {
	const keys = [...MODIFIERS.filter((modifier) => modifiers.includes(modifier)), ...(key === undefined ? [] : [key])];
	const attribute = (value: string) => value.replace(/&/g, '&amp;').replace(/"/g, '&quot;').replace(/</g, '&lt;');
	const string = (value: string) => `'${value.replace(/\\/g, '\\\\').replace(/'/g, "\\'")}'`;
	if (keys.length === 0) {
		return null;
	}
	return keys.length === 1 ? `keys="${attribute(keys[0])}"` : `[keys]="${attribute(`[${keys.map(string).join(', ')}]`)}"`;
}

export const KBD_DECORATORS = [moduleMetadata({ imports: [KbdComponent] }), applicationConfig({ providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }] })];

export const KBD_ARG_TYPES: ArgTypes = {
	modifiers: {
		name: 'keys (modifiers)',
		control: {
			type: 'check',
			labels: { Control: 'Control (Ctrl)', Alt: 'Alt (Mac: ⌥ icon, Windows: Alt)', Meta: 'Meta (Mac: ⌘ icon, Windows: Win)', Shift: 'Shift (icon)' },
		},
		options: MODIFIERS,
		description: 'Modificateurs de la combinaison. Quel que soit leur ordre en code, ils s’affichent en premier, dans l’ordre conventionnel du système.',
		table: { category: 'inputs', type: { summary: 'KbdKey[]' } },
	},
	key: {
		name: 'keys (key)',
		control: {
			type: 'select',
			labels: {
				' ': 'Space',
				Enter: 'Enter (icon)',
				Tab: 'Tab (icon)',
				Delete: 'Delete (icon)',
				Backspace: 'Backspace (icon)',
				PageUp: 'PageUp (icon)',
				PageDown: 'PageDown (icon)',
				ArrowUp: 'ArrowUp (icon)',
				ArrowDown: 'ArrowDown (icon)',
				ArrowLeft: 'ArrowLeft (icon)',
				ArrowRight: 'ArrowRight (icon)',
				[OTHER]: 'Other (type it below)',
			},
		},
		options: KEYS,
		description:
			'Touche, nommée comme `KeyboardEvent.key` : n’importe quelle valeur est acceptée en code. Les touches nommées sont traduites, et certaines s’affichent en icônes avec une alternative traduite (Maj, Tab, Entrée, Retour arrière, Suppr, Page préc / suiv, flèches, et Option / Cmd sur Mac).',
		table: { category: 'inputs', type: { summary: 'KbdKey' } },
	},
	otherKey: {
		name: '↳ keys (other)',
		if: { arg: 'key', eq: OTHER },
		control: 'text',
		description: 'N’importe quelle autre touche : une lettre (`S`), un chiffre, une touche de fonction (`F2`), un symbole (`/`)…',
		table: { category: 'inputs', type: { summary: 'KbdKey' } },
	},
	intl: intlArgType(luKbdTranslations, 'LuKbdTranslations'),
	inDropdown: {
		name: 'In a dropdown (to see the animation on hover)',
		control: 'boolean',
		description: 'Affiche le raccourci dans un menu, pour jouer son animation au survol ou au focus d’une option.',
		table: { category: 'story' },
	},
};

export const renderKbd = ({ modifiers, key, otherKey, inDropdown, ...inputs }: KbdStory, { argTypes }) => {
	const kbdInputs = generateInputs(inputs, argTypes);
	const keys = keysInput(modifiers, key === OTHER ? otherKey || 'S' : key);
	const kbd = keys ? `<lu-kbd ${keys}${kbdInputs} />` : '';
	if (!inDropdown) {
		return { template: kbd };
	}
	const options = modifiers?.length
		? [
				{ label: 'Copy', keys: `[keys]="['Control', 'c']"` },
				{ label: 'Paste', keys: `[keys]="['Control', 'v']"` },
			]
		: [
				{ label: 'Rename', keys: 'keys="F2"' },
				{ label: 'Search', keys: 'keys="/"' },
			];
	return {
		styles: [`.popover { inline-size: fit-content; }`],
		template: `<div class="popover">
	<div class="popover-content">
		<div class="dropdown">
			<ul class="dropdown-list">
				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action">
						Shortcut
						${kbd}
					</button>
				</li>
${options
	.map(
		({ label, keys }) => `				<li class="dropdown-list-option">
					<button type="button" class="dropdown-list-option-action">
						${label}
						<lu-kbd ${keys}${kbdInputs} />
					</button>
				</li>
`,
	)
	.join('')}			</ul>
		</div>
	</div>
</div>`,
	};
};
