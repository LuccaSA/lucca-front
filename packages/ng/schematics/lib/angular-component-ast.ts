import ts, { forEachChild, isArrayLiteralExpression, isCallExpression, isDecorator, isIdentifier, isObjectLiteralExpression, isPropertyAssignment } from 'typescript';
import { createVisitor } from './angular-template';

export interface ProviderEntry {
	provide: string;
	type: string;
	value: string;
}

export function extractProviders(sourceFile: ts.SourceFile): ProviderEntry[] {
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
						value: '',
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
		}),
	);
	return providerEntries;
}

export function extractComponentImports(sourceFile: ts.SourceFile): string[] {
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
				// Here we're inside the providers
				.flatMap((array) => array.elements)
				// Here we're iterating on each provider
				.filter(isIdentifier)
				.forEach((identifier) => {
					imports.push(identifier.escapedText.toString());
				});
		}),
	);
	return imports;
}
