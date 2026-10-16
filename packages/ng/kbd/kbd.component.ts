import { ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { NgTemplateOutlet } from '@angular/common';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_KBD_TRANSLATIONS, LuKbdTranslations } from './kbd.translate';
import { DisplayedKey, ICONS, KbdKey, LABELS, MAC_ICONS, MAC_MODIFIERS, MODIFIERS } from './kbd.type';
import { isMacPlatform } from './kbd.utils';

@Component({
	selector: 'lu-kbd',
	templateUrl: './kbd.component.html',
	styleUrl: './kbd.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, NgTemplateOutlet],
})
export class KbdComponent {
	readonly #isMac = isMacPlatform();

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
		const modifiers = this.#isMac ? MAC_MODIFIERS : MODIFIERS;
		const given = typeof keys === 'string' ? [keys] : keys;
		return [...modifiers.filter((modifier) => given.includes(modifier)), ...given.filter((key) => !modifiers.includes(key))].map((key) => this.#display(key, intl));
	});

	#display(key: KbdKey, intl: LuKbdTranslations): DisplayedKey {
		const icon = (this.#isMac ? MAC_ICONS : ICONS)[key];
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
