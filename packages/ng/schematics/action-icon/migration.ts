import { updateContent } from '../lib/file-update.js';
import { AngularCompilerLib, HtmlAst } from '../lib/html-ast.js';
import { PostCssScssLib } from '../lib/scss-ast.js';

export function migrateScssFile(content: string, postCssScss: PostCssScssLib): string {
	const root = postCssScss.parse(content);

	root.walkRules((rule) => {
		if (rule.selector.includes('actionIcon')) {
			rule.raws.before =
				(rule.raws.before || '') + '// Schematics Lucca Front 17.4.0 migrer actionIcon ("button mod-onlyIcon mod-text" ou "button mod-onlyIcon mod-outlined" si vous avez mod-outlined déjà présent)\n';
		}
	});

	return root.toResult({ syntax: { stringify: postCssScss.stringify } }).css;
}

export function migrateHTMLFile(content: string, angularCompiler: AngularCompilerLib): string {
	return updateContent(content, (updates) => {
		const htmlAst = new HtmlAst(content, angularCompiler);
		htmlAst.visitElementWithAttribute(/.*/, 'class', (elem, attr) => {
			const classes = attr.value;
			if (classes.includes('actionIcon') && attr.valueSpan) {
				let newClasses: string;
				if (classes.includes('mod-outlined')) {
					newClasses = classes.replace('actionIcon', 'button mod-onlyIcon');
				} else {
					newClasses = classes.replace('actionIcon', 'button mod-onlyIcon mod-text');
				}
				updates.push({
					position: attr.valueSpan.start.offset,
					oldContent: attr.value,
					newContent: newClasses,
				});
			}
		});
	});
}
