import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent, LuccaIcon } from '@lucca-front/ng/icon';
import { LU_KBD_TRANSLATIONS, LuKbdTranslations } from './kbd.translate';
import { KbdKey } from './kbd.type';

type DisplayedKey = { type: 'text'; label: string } | { type: 'icon'; label: string; icon: LuccaIcon };

const LABELS: Partial<Record<KbdKey, keyof LuKbdTranslations>> = {
	Alt: 'alt',
	Control: 'control',
	Meta: 'meta',
	' ': 'space',
	Escape: 'escape',
	Home: 'home',
	End: 'end',
};

const ICONS: Partial<Record<KbdKey, [LuccaIcon, keyof LuKbdTranslations]>> = {
	Shift: ['arrowShift', 'shift'],
	Tab: ['arrowLineRight', 'tab'],
	Enter: ['arrowEnter', 'enter'],
	Backspace: ['arrowBackspace', 'backspace'],
	Delete: ['arrowDelete', 'delete'],
	PageUp: ['arrowPageUp', 'pageUp'],
	PageDown: ['arrowPageDown', 'pageDown'],
	ArrowUp: ['arrowTop', 'arrowUp'],
	ArrowDown: ['arrowBottom', 'arrowDown'],
	ArrowLeft: ['arrowLeft', 'arrowLeft'],
	ArrowRight: ['arrowRight', 'arrowRight'],
};

/**
 * Apple displays its modifiers as symbols: ⌥ Option and ⌘ Command
 */
const MAC_ICONS: Partial<Record<KbdKey, [LuccaIcon, keyof LuKbdTranslations]>> = {
	...ICONS,
	Alt: ['keyboardOption', 'option'],
	Meta: ['keyboardCommand', 'command'],
};

/**
 * Conventional order of the modifiers, displayed before the other keys whatever their order in `keys`:
 * Control, Option, Shift, Command on Mac (Apple Human Interface Guidelines), Windows key, Ctrl, Alt, Shift elsewhere
 */
const MAC_MODIFIERS: KbdKey[] = ['Control', 'Alt', 'Shift', 'Meta'];
const MODIFIERS: KbdKey[] = ['Meta', 'Control', 'Alt', 'Shift'];

/**
 * Whether the page runs on Apple platforms, whose modifiers differ (Option, Command)
 */
function isMacPlatform(): boolean {
	return typeof navigator !== 'undefined' && /Mac|iPhone|iPad/.test(navigator.userAgent);
}

@Component({
	selector: 'lu-kbd',
	templateUrl: './kbd.component.html',
	styleUrl: './kbd.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, NgTemplateOutlet],
})
export class KbdComponent {
	readonly #mac = isMacPlatform();

	/**
	 * Key, or combination of keys, to display, as named by `KeyboardEvent.key` (`'Escape'`, `['Control', 'n']`…).
	 * Keys follow the platform (Option and Command on Mac).
	 * Modifiers are displayed first, in the conventional order of the platform.
	 */
	readonly keys = input.required<KbdKey | readonly KbdKey[]>();

	/**
	 * Overrides the default labels of the keys
	 */
	readonly intl = input(...intlInputOptions(LU_KBD_TRANSLATIONS));

	readonly displayedKeys = computed<DisplayedKey[]>(() => {
		const keys = this.keys();
		const intl = this.intl();
		const modifiers = this.#mac ? MAC_MODIFIERS : MODIFIERS;
		const given = typeof keys === 'string' ? [keys] : keys;
		return [...modifiers.filter((modifier) => given.includes(modifier)), ...given.filter((key) => !modifiers.includes(key))].map((key) => this.#display(key, intl));
	});

	#display(key: KbdKey, intl: LuKbdTranslations): DisplayedKey {
		const icon = (this.#mac ? MAC_ICONS : ICONS)[key];
		if (icon) {
			return { type: 'icon', icon: icon[0], label: intl[icon[1]] };
		}
		const label = LABELS[key];
		if (label) {
			return { type: 'text', label: intl[label] };
		}
		return { type: 'text', label: key.length === 1 ? key.toUpperCase() : key };
	}
}
