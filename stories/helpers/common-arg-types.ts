export const PaletteArgType = {
	options: ['none', 'product', 'neutral', 'success', 'warning', 'error'],
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
	if: { arg: 'AI', truthy: false },
	description: 'Applique une palette de couleurs au composant.',
} as const;

export const HiddenArgType = {
	table: {
		disable: true,
	},
	control: undefined,
};
