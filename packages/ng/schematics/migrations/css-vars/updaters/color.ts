import { Root } from 'postcss';
import { ValueNode } from '../utils';

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

export function updateColorMixin(root: Root) {
	root.walkDecls((decl) => {
		const valueNode = new ValueNode(decl.value);

		valueNode.walkFunction('_color', (funcNode) => {
			const [color, legacyLevel] = funcNode.nodes[0].value.split('.');
			funcNode.value = 'var';

			if (color === 'white') {
				funcNode.nodes = new ValueNode(`--colors-${color}-color`).nodes;
			} else {
				let level = legacyLevel ?? funcNode.nodes[2]?.value ?? '700';
				level = legacyLevelToLevel[level] ?? level;
				funcNode.nodes = new ValueNode(`--palettes-${color}-${level}`).nodes;
			}
		});

		decl.value = valueNode.toString();
	});
}
