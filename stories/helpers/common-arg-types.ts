import { DECORATIVE_PALETTE, PALETTE } from '@lucca/prisme/core';
import { setStoryOptions } from './stories';

export const PaletteArgType = {
	options: setStoryOptions(PALETTE),
	control: {
		type: 'select',
	},
} as const;

export const PaletteAllArgType = {
	options: setStoryOptions([...PALETTE, ...DECORATIVE_PALETTE]),
	control: {
		type: 'select',
	},
	description: 'Applique une palette de couleurs au composant.',
} as const;

export const HiddenArgType = {
	table: {
		disable: true,
	},
	control: undefined,
};

export const stateArgType = {
	options: setStoryOptions(['default', 'success', 'warning', 'error']),
};
