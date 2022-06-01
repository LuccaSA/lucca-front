import { Root } from 'postcss';
import { ValueNode } from '../utils';

// TODO: confirmation @jbiron
const legacyLevelToLevel: Partial<Record<string, string>> = {
	'see-through': '50',
	darker: '900',
	dark: '800',
	color: '700',
	light: '600',
	lighter: '500',
	lightest: '200',
	default: '700',
};

export function updateColorMixin(root: Root) {
	root.walkDecls((decl) => {
		const valueNode = new ValueNode(decl.value);

		valueNode.walkFunction('_color', (funcNode) => {
			const [color, legacyLevel] = funcNode.nodes[0].value.split('.');
			funcNode.value = 'var';

			if (color === 'white') {
				funcNode.nodes = [
					{
						type: 'word',
						value: `--colors-${color}-color`,
						sourceEndIndex: 0,
						sourceIndex: 0,
					},
				];
			} else {
				let level = legacyLevel ?? funcNode.nodes[2]?.value ?? '700';
				level = legacyLevelToLevel[level] ?? level;

				funcNode.nodes = [
					{
						type: 'word',
						value: `--palettes-${color}-${level}`,
						sourceEndIndex: 0,
						sourceIndex: 0,
					},
				];
			}
		});

		decl.value = valueNode.toString();
	});
}
