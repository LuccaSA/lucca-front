import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent, LuccaIcon } from '@lucca-front/ng/icon';
import { LU_KBD_TRANSLATIONS, LuKbdTranslations } from './kbd.translate';
import { KbdKey } from './kbd.type';

type DisplayedKey = { type: 'text'; label: string } | { type: 'icon'; label: string; icon: LuccaIcon };

const LABELS: Partial<Record<KbdKey, keyof LuKbdTranslations>> = {
	Control: 'control',
	Shift: 'shift',
	Tab: 'tab',
	' ': 'space',
	Enter: 'enter',
	Escape: 'escape',
	Delete: 'delete',
	Home: 'home',
	End: 'end',
	PageUp: 'pageUp',
	PageDown: 'pageDown',
};

const ICONS: Partial<Record<KbdKey, [LuccaIcon, keyof LuKbdTranslations]>> = {
	ArrowUp: ['arrowTop', 'arrowUp'],
	ArrowDown: ['arrowBottom', 'arrowDown'],
	ArrowLeft: ['arrowLeft', 'arrowLeft'],
	ArrowRight: ['arrowRight', 'arrowRight'],
	Backspace: ['arrowBackspace', 'backspace'],
};

/**
 * Mac laptops have no Home, End, Page up and Page down keys: they are typed with Fn and an arrow
 */
const MAC_FN_ARROWS: Partial<Record<KbdKey, KbdKey>> = {
	Home: 'ArrowLeft',
	End: 'ArrowRight',
	PageUp: 'ArrowUp',
	PageDown: 'ArrowDown',
};

/**
 * Conventional order of the modifiers, displayed before the other keys whatever their order in `keys`:
 * Control, Option, Shift, Command on Mac (Apple Human Interface Guidelines), Windows key, Ctrl, Alt, Shift elsewhere
 */
const MAC_MODIFIERS: KbdKey[] = ['Control', 'Alt', 'Shift', 'Meta'];
const MODIFIERS: KbdKey[] = ['Meta', 'Control', 'Alt', 'Shift'];

/**
 * Whether the page runs on Apple platforms, whose keys and shortcuts differ (Option, Cmd, Fn)
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
	 * Keys follow the platform (Option, Cmd and Fn on Mac).
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
		const list = [...modifiers.filter((modifier) => given.includes(modifier)), ...given.filter((key) => !modifiers.includes(key))];
		const fnArrows = list.map((key) => (this.#mac ? MAC_FN_ARROWS[key] : undefined));
		// Fn comes first, as it is pressed before the other modifiers on Mac (Fn + Option + ↑)
		return [...(fnArrows.some(Boolean) ? ['Fn'] : []), ...list.map((key, index) => fnArrows[index] ?? key)].map((key) => this.#display(key, intl));
	});

	#display(key: KbdKey, intl: LuKbdTranslations): DisplayedKey {
		const icon = ICONS[key];
		if (icon) {
			return { type: 'icon', icon: icon[0], label: intl[icon[1]] };
		}
		if (key === 'Alt') {
			return { type: 'text', label: this.#mac ? intl.option : intl.alt };
		}
		if (key === 'Meta') {
			return { type: 'text', label: this.#mac ? intl.command : intl.meta };
		}
		const label = LABELS[key];
		if (label) {
			return { type: 'text', label: intl[label] };
		}
		return { type: 'text', label: key.length === 1 ? key.toUpperCase() : key };
	}
}
