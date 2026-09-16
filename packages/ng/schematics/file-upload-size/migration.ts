import { addAttributeUpdate, currentSchematicContext, HtmlAst, removeAttributeUpdate, updateAngularTemplate, updateContent } from '../lib';

/**
 * Components whose `size` input has been flipped: `S` became the default value and `L` was introduced
 * to keep the rendering that used to apply when no size was set.
 */
const componentsToMigrate = ['lu-single-file-upload', 'lu-multi-file-upload', 'lu-file-entry'];

export function migrateTemplate(path: string, content: string): string {
	return updateAngularTemplate(path, content, (template) =>
		updateContent(template, (updates) => {
			const htmlAst = new HtmlAst(template);

			componentsToMigrate.forEach((component) => {
				htmlAst.visitElements(component, (element) => {
					const boundSize = element.inputs.find((input) => input.name === 'size');

					if (boundSize) {
						const source = boundSize.value instanceof currentSchematicContext.angularCompiler.ASTWithSource ? boundSize.value.source ?? '' : '';

						switch (source.trim()) {
							case `'S'`:
							case `"S"`:
								updates.push(removeAttributeUpdate(template, boundSize));
								currentSchematicContext.logSuccess(`Removing redundant [size] on <${component}> in ${path}`);
								break;
							case 'null':
								updates.push({
									position: boundSize.value.sourceSpan.start,
									oldContent: source,
									newContent: source.replace('null', `'L'`)
								});
								currentSchematicContext.logSuccess(`Setting [size] to 'L' on <${component}> in ${path}`);
								break;
							default:
								currentSchematicContext.warn(`${path}: [size] of <${component}> is bound to an expression, migrate it manually ('S' is now the default value, 'L' is the previous one).`);
						}

						return;
					}

					const size = element.attributes.find((attribute) => attribute.name === 'size');

					if (!size) {
						updates.push(addAttributeUpdate(element, 'size', 'L'));
						currentSchematicContext.logSuccess(`Adding size="L" on <${component}> in ${path}`);
						return;
					}

					if (size.value === 'S') {
						updates.push(removeAttributeUpdate(template, size));
						currentSchematicContext.logSuccess(`Removing redundant size="S" on <${component}> in ${path}`);
						return;
					}

					currentSchematicContext.warn(`${path}: size="${size.value}" of <${component}> is not a known value, migrate it manually ('S' is now the default value, 'L' is the previous one).`);
				});
			});
		})
	);
}
