import type { Root } from 'postcss';

export function addWarnings(root: Root) {
	root.walkAtRules('each', (rule) => {
		rule.raws.before = (rule.raws.before || '') + '// [LF NEXT] Vérifier le contenu de la boucle.\n';
	});
}
