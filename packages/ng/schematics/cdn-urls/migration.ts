import { updateContent } from '../lib/file-update.js';
import { HtmlAst } from '../lib/html-ast.js';
import { currentSchematicContext } from '../lib/lf-schematic-context';

const REPLACE_MAP: Record<string, string> = {
	'https://cdn.lucca.fr/development': 'https://cdn.lucca.fr/archives/development',
	'https://cdn.lucca.fr/errors': 'https://cdn.lucca.fr/archives/errors',
	'https://cdn.lucca.fr/inapp/figgo': 'https://cdn.lucca.fr/archives/inapp/figgo',
	'https://cdn.lucca.fr/lucca-beamer': 'https://cdn.lucca.fr/archives/lucca-beamer',
	'https://cdn.lucca.fr/lucca-emails': 'https://cdn.lucca.fr/archives/lucca-emails',
	'https://cdn.lucca.fr/lucca-front/illu/softs': 'https://cdn.lucca.fr/archives/lucca-front/illu/softs',
	'https://cdn.lucca.fr/lucca-front/img': 'https://cdn.lucca.fr/archives/lucca-front/img',
	'https://cdn.lucca.fr/lucca-icons': 'https://cdn.lucca.fr/archives/lucca-icons',
	'https://cdn.lucca.fr/lucca-ui': 'https://cdn.lucca.fr/archives/lucca-ui',
	'https://cdn.lucca.fr/mails': 'https://cdn.lucca.fr/archives/mails',
	'https://cdn.lucca.fr/tourism': 'https://cdn.lucca.fr/archives/tourism',
	'https://cdn.lucca.fr/assets/lucca/errors': 'https://cdn.lucca.fr/transverse/visuals/errors',
	'https://cdn.lucca.fr/lucca-front/assets': 'https://cdn.lucca.fr/transverse/prisme/visuals',
	'https://cdn.lucca.fr/lucca-front/avatars': 'https://cdn.lucca.fr/transverse/prisme/visuals/avatars',
	'https://cdn.lucca.fr/lucca-front/icons/softs': 'https://cdn.lucca.fr/transverse/visuals/icons/softs',
	'https://cdn.lucca.fr/lucca-front/icons/next': 'https://cdn.lucca.fr/archives/lucca-front/icons/next',
	'https://cdn.lucca.fr/lucca-front/icons/latest': 'https://cdn.lucca.fr/archives/lucca-front/icons/latest',
	'https://cdn.lucca.fr/lucca-front/icons/font': 'https://cdn.lucca.fr/transverse/prisme/icons/font',
	'https://cdn.lucca.fr/lucca-front/v15.4.3.css': 'https://cdn.lucca.fr/transverse/prisme/dist/v15.4.3.css',
	'https://cdn.lucca.fr/lucca-front/last.css': 'https://cdn.lucca.fr/transverse/prisme/dist/last.css',
	'https://cdn.lucca.fr/lucca-front/v10.2.1.css': 'https://cdn.lucca.fr/transverse/prisme/dist/v10.2.1.css',
	'https://cdn.lucca.fr/lucca-front/lucca-front.min.cssvars.css': 'https://cdn.lucca.fr/transverse/prisme/dist/lucca-front.min.cssvars.css',
	'https://cdn.lucca.fr/lucca-front/lucca-front.css': 'https://cdn.lucca.fr/transverse/prisme/dist/lucca-front.css',
	'https://cdn.lucca.fr/favicon': 'https://cdn.lucca.fr/transverse/visuals/favicons',
	'https://cdn.lucca.fr/fonts': 'https://cdn.lucca.fr/transverse/fonts',
	'https://cdn.lucca.fr/assets/appstore': 'https://cdn.lucca.fr/business/appstore',
	'https://cdn.lucca.fr/assets/cleemy': 'https://cdn.lucca.fr/finance',
	'https://cdn.lucca.fr/assets/client-center': 'https://cdn.lucca.fr/business/client-center',
	'https://cdn.lucca.fr/assets/pagga': 'https://cdn.lucca.fr/payroll',
	'https://cdn.lucca.fr/assets/cloud-control': 'https://cdn.lucca.fr/business/cloud-control',
	'https://cdn.lucca.fr/assets/home': 'https://cdn.lucca.fr/business/home',
	'https://cdn.lucca.fr/assets/talent': 'https://cdn.lucca.fr/talent/performance',
	'https://cdn.lucca.fr/inapp/poplee-engagement': 'https://cdn.lucca.fr/talent/engagement/bloomy',
	'https://cdn.lucca.fr/notifications': 'https://cdn.lucca.fr/transverse/visuals/notifications',
	'https://cdn.lucca.fr/providers': 'https://cdn.lucca.fr/transverse/visuals/logos/providers',
	'https://cdn.lucca.fr/store': 'https://cdn.lucca.fr/business/appstore',
	'https://cdn.lucca.fr/figgo-slack-status.png': 'https://cdn.lucca.fr/archives/figgo-slack-status.png'
};

export function migrateHTMLFile(content: string): string {
	return updateContent(content, (updates) => {
		const htmlAst = new HtmlAst(content);
		htmlAst.visitNodes((node) => {
			if (node instanceof currentSchematicContext.angularCompiler.TmplAstElement) {
				node.attributes.forEach((attr) => {
					const match = findURLMatch(attr.value);
					console.log('match :', match);
					if (match && attr.valueSpan) {
						currentSchematicContext.logSuccess(`Replacing ${match} with ${attr.value.replace(match, REPLACE_MAP[match])}`);
						updates.push({
							position: attr.valueSpan?.start.offset,
							oldContent: attr.value,
							newContent: attr.value.replace(match, REPLACE_MAP[match])
						});
					}
				});
				node.inputs.forEach((input) => {
					if (input.value instanceof currentSchematicContext.angularCompiler.ASTWithSource) {
						const match = findURLMatch(input.value?.source?.replace('\'', '') || '');
						if (input.value?.source && match) {
							currentSchematicContext.logSuccess(`Replacing ${input.value.source} with ${input.value.source.replace(match, REPLACE_MAP[match])}`);
							updates.push({
								position: input.value?.sourceSpan.start,
								oldContent: input.value.source,
								newContent: input.value.source.replace(match, REPLACE_MAP[match])
							});

						}
					}
				});
			}
		});
	});
}

function findURLMatch(value: string): string | undefined {
	return Object.keys(REPLACE_MAP).find((key) => value.startsWith(key));
}
