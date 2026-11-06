import { LuccaIcon } from '@lucca-front/ng/icon';
import { LuKbdTranslations } from './kbd.translate';

export type KbdKey =
	| 'Alt'
	| 'Control'
	| 'Meta'
	| 'Shift'
	| 'Tab'
	| ' '
	| 'Enter'
	| 'Escape'
	| 'Backspace'
	| 'Delete'
	| 'Home'
	| 'End'
	| 'PageUp'
	| 'PageDown'
	| 'ArrowUp'
	| 'ArrowDown'
	| 'ArrowLeft'
	| 'ArrowRight'
	| (string & Record<never, never>);

export type DisplayedKey = { type: 'text'; label: string } | { type: 'icon'; label: string; icon: LuccaIcon };

export const LABELS: Partial<Record<KbdKey, keyof LuKbdTranslations>> = {
	Alt: 'alt',
	Control: 'control',
	Meta: 'meta',
	' ': 'space',
	Escape: 'escape',
	Home: 'home',
	End: 'end',
};

export const ICONS: Partial<Record<KbdKey, [LuccaIcon, keyof LuKbdTranslations]>> = {
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
export const MAC_ICONS: Partial<Record<KbdKey, [LuccaIcon, keyof LuKbdTranslations]>> = {
	...ICONS,
	Alt: ['keyboardOption', 'option'],
	Meta: ['keyboardCommand', 'command'],
};

/**
 * Conventional order of the modifiers, displayed before the other keys whatever their order in `keys`:
 * Control, Option, Shift, Command on Mac (Apple Human Interface Guidelines), Windows key, Ctrl, Alt, Shift elsewhere
 */
export const MAC_MODIFIERS: KbdKey[] = ['Control', 'Alt', 'Shift', 'Meta'];
export const MODIFIERS: KbdKey[] = ['Meta', 'Control', 'Alt', 'Shift'];
