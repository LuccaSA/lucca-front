import type { Root } from 'postcss';
import type { ValueParser } from 'postcss-value-parser';
import { commentNode, PostCssLib } from '../../../lib/scss-ast';
import { ScssValueAst } from '../../../lib/scss-value-ast';

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

export function updateColorMixin(root: Root, postcssValueParser: ValueParser) {
	root.walkDecls((decl) => {
		const valueNode = new ScssValueAst(decl.value, postcssValueParser);

		valueNode.walkFunction('_color', (funcNode) => {
			const [color, legacyLevel] = funcNode.nodes[0].value.split('.');
			funcNode.value = 'var';

			if (color === 'white') {
				funcNode.nodes = new ScssValueAst(`--colors-${color}-color`, postcssValueParser).nodes;
			} else {
				let level = legacyLevel ?? funcNode.nodes[2]?.value ?? '700';
				level = legacyLevelToLevel[level] ?? level;
				funcNode.nodes = new ScssValueAst(`--palettes-${color}-${level}`, postcssValueParser).nodes;
			}
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
