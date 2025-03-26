import { Change, InsertChange, NoopChange, RemoveChange } from '@schematics/angular/utility/change';
import { getEOL } from '@schematics/angular/utility/eol';
import { forEachChild, isArrayLiteralExpression, isCallExpression, isDecorator, isIdentifier, isImportDeclaration, isNamedImports, isObjectLiteralExpression, isPropertyAssignment, isStringLiteralLike, NamedImports, SourceFile } from 'typescript';
import { createVisitor } from './angular-template';

export interface ProviderEntry {
	provide: string;
	type: string;
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
			const imports = argument.properties
				.filter(isPropertyAssignment)
				.filter((prop) => isIdentifier(prop.name) && prop.name.text === 'imports')
				.map((prop) => prop.initializer)
				.find(isArrayLiteralExpression)?.elements;
			if (imports) {
				insertPos = imports[imports.length - 1].getEnd() || 0;
			}
		})
	);
	if (insertPos > 0) {
		return new InsertChange(fileToEdit, insertPos, `, ${symbolName}`);
	}
	return new NoopChange();
}

export function removeAngularImport(sourceFile: SourceFile, fileToEdit: string, symbolName: string): Change {
	if (!extractComponentImports(sourceFile).includes(symbolName)) {
		return new NoopChange();
	}
	let removePos = 0;
	let toRemove = symbolName;
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
						removePos = exp.getFullStart();
						if (index === 0) {
							removePos = importExpression.elements[0].getStart(sourceFile) || 0;
							toRemove += ',';
						} else if (index < imports.length - 1) {
							toRemove += ' , ';
						}
					}
				});
			}
		})
	);
	if (removePos > 0) {
		return new RemoveChange(fileToEdit, removePos, toRemove);
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
			return new RemoveChange(fileToEdit, specifier.getFullStart(), symbolName + ', ');
		}
	}
	return new NoopChange();
}
