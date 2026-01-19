import { Change, InsertChange, NoopChange, RemoveChange } from '@schematics/angular/utility/change';
import { getEOL } from '@schematics/angular/utility/eol';
import { forEachChild, isArrayLiteralExpression, isCallExpression, isDecorator, isIdentifier, isImportDeclaration, isNamedImports, isObjectLiteralExpression, isPropertyAssignment, isStringLiteralLike, NamedImports, SourceFile } from 'typescript';
import { createVisitor } from './angular-template';
import  { TmplAstBoundEvent,TmplAstElement } from '@angular/compiler';
import { currentSchematicContext } from './lf-schematic-context';

export interface ProviderEntry {
	provide: string;
	type: string;
	value: string;
}

export interface InputValue {
	isBinding?: boolean;
	twoWayBinding?: boolean;
	value: string;
}

export function extractProviders(sourceFile: SourceFile): ProviderEntry[] {
	const providerEntries: ProviderEntry[] = [];
	forEachChild(
		sourceFile,
		createVisitor(isDecorator, (decorator) => {
			if (!isCallExpression(decorator.expression)) {
				return;
			}
			if (!isIdentifier(decorator.expression.expression)) {
				return;
			}

			if (decorator.expression.expression.escapedText !== 'Component') {
				return;
			}
			const argument = decorator.expression.arguments[0];
			if (!argument || !isObjectLiteralExpression(argument)) {
				return;
			}
			argument.properties
				.filter(isPropertyAssignment)
				.filter((prop) => isIdentifier(prop.name) && prop.name.text === 'providers')
				.map((prop) => prop.initializer)
				.filter(isArrayLiteralExpression)
				// Here we're inside the providers
				.flatMap((providers) => providers.elements)
				// Here we're iterating on each provider
				.filter(isObjectLiteralExpression)
				.forEach((exp) => {
					const entry: ProviderEntry = {
						provide: '',
						type: '',
						value: ''
					};
					exp.properties.filter(isPropertyAssignment).forEach((prop) => {
						if (isIdentifier(prop.name) && isIdentifier(prop.initializer)) {
							if (prop.name.text === 'provide') {
								entry.provide = prop.initializer.escapedText.toString();
							} else if (['useClass', 'useExisting', 'useValue', 'useFactory'].includes(prop.name.text)) {
								entry.type = prop.name.text;
								entry.value = prop.initializer.escapedText.toString();
							}
						}
					});
					providerEntries.push(entry);
				});
		})
	);
	return providerEntries;
}

export function extractComponentImports(sourceFile: SourceFile): string[] {
	const imports: string[] = [];
	forEachChild(
		sourceFile,
		createVisitor(isDecorator, (decorator) => {
			if (!isCallExpression(decorator.expression)) {
				return;
			}
			if (!isIdentifier(decorator.expression.expression)) {
				return;
			}

			if (decorator.expression.expression.escapedText !== 'Component') {
				return;
			}
			const argument = decorator.expression.arguments[0];
			if (!argument || !isObjectLiteralExpression(argument)) {
				return;
			}
			argument.properties
				.filter(isPropertyAssignment)
				.filter((prop) => isIdentifier(prop.name) && prop.name.text === 'imports')
				.map((prop) => prop.initializer)
				.filter(isArrayLiteralExpression)
				// Here we're inside the imports
				.flatMap((array) => array.elements)
				// Here we're iterating on each import
				.filter(isIdentifier)
				.forEach((identifier) => {
					imports.push(identifier.escapedText.toString());
				});
		})
	);
	return imports;
}

export function inputValueToHTML(name: string, value: InputValue | undefined): string{
	if(!value) {
		return ""
	}
	return `${value.isBinding ? '[' : ''}${value.twoWayBinding ? '(' : ''}${name}${value.twoWayBinding ? ')' : ''}${value.isBinding ? ']' : ''}="${value.value}"`
}

export function getInputValue(node: TmplAstElement, inputName: string): InputValue | undefined {
	const input = node.inputs.find((i) => i.name === inputName);
	if (input) {
		const output: TmplAstBoundEvent = node.outputs.find((o) => o.name === `${inputName}Change`);
		const value = input?.value instanceof currentSchematicContext.angularCompiler.ASTWithSource ? input.value.source	: null
		return {
			isBinding: true,
			value,
			twoWayBinding: output?.handler instanceof currentSchematicContext.angularCompiler.ASTWithSource ? output.handler.source === value : false
		}
	}

	const attr = node.attributes.find((a) => a.name === inputName);
	if (attr) {
		return {
			isBinding: false,
			value: attr.value
		}
	}
	return undefined;
}

// Simplified version of https://github.com/angular/angular-cli/blob/main/packages/schematics/angular/utility/ast-utils.ts#L24 for our use case
export function insertTSImportIfNeeded(sourceFile: SourceFile, fileToEdit: string, symbolName: string, fileName: string): Change {
	const allImports = sourceFile.statements.filter(isImportDeclaration);

	// get nodes that map to import statements from the file fileName
	const relevantImports = allImports.filter((node) => {
		return isStringLiteralLike(node.moduleSpecifier) && node.moduleSpecifier?.text === fileName;
	});

	if (relevantImports.length > 0) {
		const imports = relevantImports.flatMap((node) => {
			return node.importClause?.namedBindings && isNamedImports(node.importClause.namedBindings) ? node.importClause.namedBindings.elements : [];
		});

		// insert import if it's not there
		// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
		if (!imports.some((node) => (node.propertyName || node.name)?.text === symbolName)) {
			// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-call
			const insertPos: number = imports[0].getFullStart() || 0;
			return new InsertChange(fileToEdit, insertPos, `${symbolName}, `);
		}

		return new NoopChange();
	}

	// no such import declaration exists
	const eol = getEOL(sourceFile.getText());
	const insertAtBeginning = allImports.length === 0;
	const separator = insertAtBeginning ? '' : `${eol}`;
	const toInsert = `${separator}import { ${symbolName} }` + ` from '${fileName}'${insertAtBeginning ? `;${eol}` : ';'}`;

	const insertPos = allImports[allImports.length - 1].getEnd() || 0;
	return new InsertChange(fileToEdit, insertPos, toInsert);
}

export function insertAngularImportIfNeeded(sourceFile: SourceFile, fileToEdit: string, symbolName: string): Change {
	if (extractComponentImports(sourceFile).includes(symbolName)) {
		return new NoopChange();
	}
	let insertPos = 0;
	let needsComma = true;
	let insertContent = symbolName;
	forEachChild(
		sourceFile,
		createVisitor(isDecorator, (decorator) => {
			if (!isCallExpression(decorator.expression)) {
				return;
			}
			if (!isIdentifier(decorator.expression.expression)) {
				return;
			}

			if (decorator.expression.expression.escapedText !== 'Component') {
				return;
			}
			const argument = decorator.expression.arguments[0];
			if (!argument || !isObjectLiteralExpression(argument)) {
				return;
			}
			const importsProperties = argument.properties
				.filter(isPropertyAssignment)
				.filter((prop) => isIdentifier(prop.name) && prop.name.text === 'imports')
			const imports = importsProperties
				.map((prop) => prop.initializer)
				.find(isArrayLiteralExpression);
			if (imports?.elements) {
				if (imports.elements.length > 0) {
					insertPos = imports.elements[imports.elements.length - 1].getEnd() || 0;
				} else {
					insertPos = imports.elements.pos;
					needsComma = false;
				}
			} else {
				// There is no imports at all, add them !
				const allParams = argument.properties
					.filter(isPropertyAssignment)
				insertPos = allParams[allParams.length - 1].pos;
				needsComma = false;
				insertContent = `
	imports: [${insertContent}],`;
			}
		})
	);
	if (insertPos > 0) {
		return new InsertChange(fileToEdit, insertPos, needsComma ? `, ${insertContent}` : insertContent);
	}
	return new NoopChange();
}

export function removeAngularImport(sourceFile: SourceFile, fileToEdit: string, symbolName: string): Change {
	if (!extractComponentImports(sourceFile).includes(symbolName)) {
		return new NoopChange();
	}
	let removePos = 0;
	let toRemove = 0;
	forEachChild(
		sourceFile,
		createVisitor(isDecorator, (decorator) => {
			if (!isCallExpression(decorator.expression)) {
				return;
			}
			if (!isIdentifier(decorator.expression.expression)) {
				return;
			}

			if (decorator.expression.expression.escapedText !== 'Component') {
				return;
			}
			const argument = decorator.expression.arguments[0];
			if (!argument || !isObjectLiteralExpression(argument)) {
				return;
			}
			const importExpression = argument.properties
				.filter(isPropertyAssignment)
				.filter((prop) => isIdentifier(prop.name) && prop.name?.text === 'imports')
				.map((prop) => prop.initializer)
				.find(isArrayLiteralExpression);
			const imports = importExpression?.elements;
			if (imports) {
				imports.forEach((exp, index) => {
					if (exp && isIdentifier(exp) && exp.text === symbolName) {
						toRemove = exp.getFullWidth();
						if (index === 0) {
							removePos = importExpression.elements[0].getStart(sourceFile) || 0;
						} else {
							removePos = exp.getFullStart();
						}
						while (['\n', '\t'].includes(sourceFile.text.charAt(removePos - 1))) {
							removePos--;
							toRemove++;
						}
						while ([' ', '\n', '\t', ','].includes(sourceFile.text.charAt(removePos + toRemove))) {
							toRemove++;
						}
					}
				});
			}
		})
	);
	if (removePos > 0) {
		return new RemoveChange(fileToEdit, removePos, ' '.repeat(toRemove));
	}
	return new NoopChange();
}

export function removeTSImport(sourceFile: SourceFile, fileToEdit: string, symbolName: string): Change {
	const importDeclaration = sourceFile.statements.filter(isImportDeclaration).find((declaration) => declaration.importClause?.namedBindings?.getText(sourceFile).includes(symbolName));
	if (!importDeclaration) {
		return new NoopChange();
	}
	const namedImports = importDeclaration.importClause?.namedBindings as NamedImports;
	/// If it's the only import from this entrypoint, bye bye
	if (namedImports.elements.length === 1) {
		return new RemoveChange(fileToEdit, importDeclaration.getFullStart(), importDeclaration?.getText(sourceFile) + getEOL(sourceFile.text));
	} else {
		const specifier = namedImports.elements.find((sp) => sp.name.text === symbolName);
		if (specifier) {
			let size = specifier?.getWidth(sourceFile);
			const start = specifier.getStart(sourceFile);
			while ([' ', '\n', '\t', ','].includes(sourceFile.text.charAt(start + size))) {
				size++;
			}
			return new RemoveChange(fileToEdit, start, ' '.repeat(size));
		}
	}
	return new NoopChange();
}
