export const PaletteArgType = {
	options: ['none', 'product', 'neutral', 'success', 'warning', 'error', 'ia'],
	control: {
		type: 'select',
	},
} as const;

export const PaletteAllArgType = {
	options: [
		'none',
		'product',
		'neutral',
		'success',
		'warning',
		'error',
		'ia',
		'kiwi',
		'lime',
		'cucumber',
		'mint',
		'glacier',
		'lagoon',
		'blueberry',
		'lavender',
		'grape',
		'watermelon',
		'pumpkin',
		'pineapple',
	],
	control: {
		type: 'select',
	},
} as const;

export const HiddenArgType = {
	table: {
		disable: true,
	},
	control: undefined,
};
