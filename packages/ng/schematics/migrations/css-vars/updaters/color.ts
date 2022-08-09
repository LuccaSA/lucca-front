import type { Root } from 'postcss';
import type { Node, ValueParser } from 'postcss-value-parser';
import { commentNode, PostCssLib } from '../../../lib/scss-ast.js';
import { ScssValueAst } from '../../../lib/scss-value-ast.js';
import { getVariableFromThemeArg } from './theme.js';

const legacyLevelToLevel: Partial<Record<string, string>> = {
	'see-through': '50',
	darker: '900',
	dark: '800',
	color: '700',
	light: '500',
	lighter: '200',
	lightest: '100',
	default: '700',
};

const textLevelToLevel: Partial<Record<string, string>> = {
	dark: '900',
	default: '800',
	light: '600',
	placeholder: '400',
};

export function getPaletteNodes(firstArg: string, secondArg: string | undefined, postcssValueParser: ValueParser): Node[] {
	const [color, legacyLevel] = firstArg.split('.');

	if (color === 'white') {
		return new ScssValueAst(`--colors-${color}-color`, postcssValueParser).nodes;
	}
	if (color === 'text') {
		if (legacyLevel && !textLevelToLevel[legacyLevel]) {
			const parts = ['colors', getVariableFromThemeArg(firstArg), getVariableFromThemeArg(secondArg)].filter(Boolean).join('-');
			return new ScssValueAst(`--${parts}`, postcssValueParser).nodes;
		} else {
			const level = textLevelToLevel[legacyLevel] ?? textLevelToLevel['default'];
			return new ScssValueAst(`--palettes-grey-${level}`, postcssValueParser).nodes;
		}
	}
	let level = legacyLevel ?? secondArg ?? '700';
	level = legacyLevelToLevel[level] ?? level;
	return new ScssValueAst(`--palettes-${color}-${level}`, postcssValueParser).nodes;
}

export function updateColorMixin(root: Root, postcssValueParser: ValueParser) {
	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value, postcssValueParser);

		valueNode.walkFunction('_color', (funcNode) => {
			funcNode.value = 'var';
			funcNode.nodes = getPaletteNodes(funcNode.nodes[0].value, funcNode.nodes[2]?.value, postcssValueParser);
		});

		decl.value = valueNode.toString();
	});
}

export function commentSassFuncWithVar(root: Root, postCss: PostCssLib) {
	const blackListSassFuncs = [
		'adjust-hue',
		'alpha',
		'opacity',
		'red',
		'green',
		'blue',
		'hue',
		'saturation',
		'lightness',
		'blackness',
		'whiteness',
		'change',
		'adjust',
		'scale',
		'complement',
		'darken',
		'lighten',
		'desaturate',
		'saturate',
		'grayscale',
		'hwb',
		'ie-hex-str',
		'invert',
		'mix',
		'opacity',
		'fade-in',
		'fade-out',
		'transparentize',
	];

	root.walkDecls((decl) => {
		for (const blackListSassFunc of blackListSassFuncs) {
			const isMatching = decl.value.includes(`${blackListSassFunc}(var`);

			if (!isMatching) {
				continue;
			}

			commentNode(decl, 'Fonctions de couleur + variables scss ne sont pas gérées.', postCss);
		}
	});
}
