const mappings = {
	breakpoint: {
		xxxs: 'XXXS',
		hard: 'XXS',
		xxs: 'XXS',
		xs: 'XS',
		s: 'S',
		m: 'M',
		l: 'L',
		xl: 'XL',
		xxl: 'XXL',
		xxxl: 'XXXL',
	},
	tshirtName: {
		smallest: 'XXS',
		smaller: 'XS',
		small: 'S',
		standard: 'M',
		medium: 'M',
		default: 'M',
		large: 'L',
		larger: 'XL',
		largest: 'XXL',
	},
	tshirtSize: {
		xxxs: 'XXXS',
		xxs: 'XXS',
		xs: 'XS',
		s: 'S',
		m: 'M',
		lg: 'L',
		xl: 'XL',
		xxl: 'XXL',
		xxxl: 'XXXL',
	},
	size: {
		reset: '0',
		smallest: 'XXS',
		smaller: 'XS',
		small: 'S',
		standard: 'M',
		big: 'L',
		bigger: 'XL',
		biggest: 'XXL',
	},
	gridSize: {
		1: '1',
		2: '2',
		3: '3',
		4: '4',
		5: '5',
		6: '6',
		7: '7',
		8: '8',
		9: '9',
		10: '10',
		11: '11',
		12: '12',
	},
	layoutFixedSize: {
		1: '1',
		2: '2',
		3: '3',
		4: '4',
		5: '5',
		6: '6',
		7: '7',
		8: '8',
		9: '9',
		10: '10',
		11: '11',
		12: '12',
		13: '13',
		14: '14',
		15: '15',
		16: '16',
		17: '17',
		18: '18',
		19: '19',
		20: '20',
	},
};

export const cssVariableMapping = expand({
	'--breakpoints-{breakpoint}-breakAt': '--breakpoints-{breakpoint}-breakAt',
	'--spacings-reset': '--spacings-0',
	'--spacings-{size}': '--spacings-{size}',
	'--sizes-{size}-font-size': '--sizes-{size}-fontSize',
	'--sizes-{size}-line-height': '--sizes-{size}-lineHeight',
	'--sizes-{size}-vertical-padding': '--sizes-{size}-verticalPadding',
	'--sizes-vertical-padding': '--sizes-verticalPadding',
	'--sizes-font-size': '--sizes-fontSize',
	'--sizes-line-height': '--sizes-lineHeight',
	'--sizes-headline-vertical-padding': '--sizes-XXL-verticalPadding',
	'--sizes-headline-font-size': '--sizes-XXL-fontSize',
	'--sizes-headline-line-height': '--sizes-XXL-lineHeight',
	'--commons-border-radius': '--commons-borderRadius-M',
	'--commons-border-radius-{size}': '--commons-borderRadius-{size}',
	'--commons-box-shadow-{breakpoint}': '--commons-boxShadow-{breakpoint}',
	'--components-popup-size-{tshirtName}': '--components-popup-{tshirtName}',
	'--components-sidepanel-size-{tshirtName}': '--components-sidepanel-{tshirtName}',
	'--components-toasts-{size}': '--components-toasts-{size}',
	'--components-button-{size}-padding': '--components-button-{size}-padding',
	'--components-button-{size}-line-height': '--components-button-{size}-lineHeight',
	'--components-button-{size}-font-size': '--components-button-{size}-fontSize',
	'--components-checkbox-input-{size}-top': '--components-checkbox-{size}-input-top',
	'--components-checkbox-label-{size}-padding': '--components-checkbox-{size}-label-padding',
	'--components-radio-label-{size}-padding': '--components-radio-{size}-label-padding',
	'--components-radio-input-{size}-top': '--components-radio-{size}-input-top',
	'--components-switch-{size}-top': '--components-switch-{size}-top',
	'--components-switch-{size}-icon-right': '--components-switch-{size}-icon-right',
	'--components-switch-{size}-icon-left': '--components-switch-{size}-icon-left',
	'--components-user-picture-image-size-{tshirtName}': '--components-userPicture-{tshirtName}-image',
	'--components-user-picture-font-size-{tshirtName}': '--components-userPicture-{tshirtName}-fontSize',
});

export const cssVarsToUpdate = new Set(Object.keys(cssVariableMapping));

export const cssClassMapping = expand({
	// Utilities
	'u-margin{Size}': 'u-margin{size}',
	'u-marginTop{Size}': 'u-marginTop{size}',
	'u-marginRight{Size}': 'u-marginRight{size}',
	'u-marginBottom{Size}': 'u-marginBottom{size}',
	'u-marginLeft{Size}': 'u-marginLeft{size}',
	'u-padding{Size}': 'u-padding{size}',
	'u-paddingTop{Size}': 'u-paddingTop{size}',
	'u-paddingRight{Size}': 'u-paddingRight{size}',
	'u-paddingBottom{Size}': 'u-paddingBottom{size}',
	'u-paddingLeft{Size}': 'u-paddingLeft{size}',
	'u-border{Size}': 'u-border{size}',
	'u-borderTop{Size}': 'u-borderTop{size}',
	'u-borderRight{Size}': 'u-borderRight{size}',
	'u-borderBottom{Size}': 'u-borderBottom{size}',
	'u-borderLeft{Size}': 'u-borderLeft{size}',
	'u-text{Size}': 'u-text{size}',
	'u-borderTopLeftRadius{Size}': 'u-borderTopLeftRadius{size}',
	'u-borderTopRightRadius{Size}': 'u-borderTopRightRadius{size}',
	'u-borderBottomLeftRadius{Size}': 'u-borderBottomLeftRadius{size}',
	'u-borderBottomRightRadius{Size}': 'u-borderBottomRightRadius{size}',
	'u-columnGap{Size}': 'u-columnGap{size}',
	'u-rowGap{Size}': 'u-rowGap{size}',
	'u-gap{Size}': 'u-gap{size}',
	'u-{breakpoint}First': 'u-first@mediaMin{breakpoint}',
	'u-{breakpoint}Last': 'u-last@mediaMin{breakpoint}',

	// Classes
	'mod-{tshirtName}': 'mod-{tshirtName}',
	'mod-{size}': 'mod-{size}',
	'mod-headline': 'mod-XXL',
	'size-{size}': 'mod-{size}',
	'size-{tshirtName}': 'mod-{tshirtName}',
	'grid-{tshirtSize}': 'grid-{tshirtSize}',
	'grid-{tshirtSize}{gridSize}': 'grid-{gridSize}@mediaMin{tshirtSize}',
	'grid-{tshirtSize}Offset{gridSize}': 'grid-offset{gridSize}@mediaMin{tshirtSize}',
	'mod-{tshirtSize}Start': 'mod-start@mediaMin{tshirtSize}',
	'mod-{tshirtSize}Center': 'mod-center@mediaMin{tshirtSize}',
	'mod-{tshirtSize}End': 'mod-end@mediaMin{tshirtSize}',
	'mod-{tshirtSize}Top': 'mod-top@mediaMin{tshirtSize}',
	'mod-{tshirtSize}Middle': 'mod-middle@mediaMin{tshirtSize}',
	'mod-{tshirtSize}Bottom': 'mod-bottom@mediaMin{tshirtSize}',
	'mod-{tshirtSize}Around': 'mod-around@mediaMin{tshirtSize}',
	'mod-{tshirtSize}Between': 'mod-between@mediaMin{tshirtSize}',
	'mod-stickyColumn-{tshirtSize}': 'mod-stickyColumn@mediaMin{tshirtSize}',
	'mod-{tshirtSize}{gridSize}': 'mod-{gridSize}@mediaMin{tshirtSize}',
	'mod-layoutFixed-{tshirtSize}{layoutFixedSize}': 'mod-layoutFixed-{layoutFixedSize}@mediaMin{tshirtSize}',
});

export const cssClassesToUpdate = new Set(Object.keys(cssClassMapping));

export const mixinMapping = expand({
	"media.smallerThan('{breakpoint}')": "media.max('{breakpoint}')",
	'media.smallerThan("{breakpoint}")': 'media.max("{breakpoint}")',
	"media.largerThan('{breakpoint}')": "media.min('{breakpoint}')",
	'media.largerThan("{breakpoint}")': 'media.min("{breakpoint}")',
});

function camelize(str: string): string {
	return str[0].toLowerCase() + str.slice(1);
}
function pascalize(str: string): string {
	return str[0].toUpperCase() + str.slice(1);
}

function expand(rawMapping: Record<string, string>): Record<string, string> {
	function replaceValue(oldValue: string, map: string, newValue: string) {
		return oldValue.replace(`{${map}}`, newValue).replace(`{${pascalize(map)}}`, pascalize(newValue));
	}
	return Object.fromEntries(
		Object.entries(rawMapping).flatMap(([oldTemplate, newTemplate]) => {
			const placeholders = [...oldTemplate.matchAll(/\{(\w*)\}/g)].map(([, template]) => template);
			let values = [[oldTemplate, newTemplate]];

			for (const placeholder of placeholders) {
				const map = camelize(placeholder);

				if (!map || !(map in mappings)) {
					throw new Error(`No mapping for ${map} found`);
				}

				values = values.flatMap(([oldVal, newVal]) => Object.entries(mappings[map as keyof typeof mappings]).map(([key, value]) => [replaceValue(oldVal, map, key), replaceValue(newVal, map, value)]));
			}

			return values;
		}),
	) as Record<string, string>;
}
