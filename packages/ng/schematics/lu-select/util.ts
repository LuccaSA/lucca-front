import { LuSelectInputContext, SelectContext } from './model/select-context';
import { HtmlAstVisitor } from '../lib/html-ast';
import { extractProviders } from '../lib/angular-component-ast';
import { currentSchematicContext } from '../lib/lf-schematic-context';
import { SourceFile } from 'typescript';

export enum RejectionReason {
	UNSUPPORTED_ATTRIBUTE,
	UNSUPPORTED_INPUT,
	CUSTOM_PICKER_CONTENT,
	NO_DATA_SOURCE,
	UNSUPPORTED_VALUE_ASSIGNMENT,
	DATA_SERVICE_OVERRIDE,
	SELECT_ALL,
	TREE_OPTION_PICKER,
	CONDITIONAL_MULTIPLE
}

export interface Rejection {
	reason: RejectionReason;
	details?: string;
}

export interface SelectDataSource {
	sourceName: string;
	display: SelectDisplayer;
	comparer?: string;
}

export interface SelectDisplayer {
	canBeRemoved: boolean;
	variables?: string;
	display?: string;
}

const allowedAttributes = [/class/, /ngModel/, /ngModelChange/, /ngClass/, /disabled/,
	/title/, /formControl/, /formControlName/, /required/, /data-.+/, /attr\..+/, /class\..+/,
	/placeholder/, /title/, /filters/, /multiple/, /api/, /orderBy/, /fields/, /id/, /luTooltip/];

export function isRejection(value: unknown): value is Rejection {
	return (value as Rejection)?.reason !== undefined && RejectionReason[(value as Rejection).reason] != undefined;
}

export function getCommonMigrationRejectionReason(node: unknown, sourceFile: SourceFile): Rejection | null {
	if (node instanceof currentSchematicContext.angularCompiler.TmplAstElement) {
		const unsupportedAttr = node.attributes.find((attr) => !allowedAttributes.some((rxp) => rxp.test(attr.name)));
		if (unsupportedAttr) {
			return {
				reason: RejectionReason.UNSUPPORTED_ATTRIBUTE,
				details: unsupportedAttr.name
			};
		}
		const unsupportedInput = node.inputs.find((input) => !allowedAttributes.some((rxp) => rxp.test(input.name)));
		if (unsupportedInput) {
			return {
				reason: RejectionReason.UNSUPPORTED_INPUT,
				details: unsupportedInput.name
			};
		}
		const providers = extractProviders(sourceFile);
		if (providers.length > 0) {
			switch (node.name) {
				case 'lu-establishment-select':
					if (providers.some(p => p.provide === 'ALuEstablishmentService')) {
						return {
							reason: RejectionReason.DATA_SERVICE_OVERRIDE,
							details: 'ALuEstablishmentService'
						};
					}
					if (providers.some(p => p.provide === 'ALuLegalUnitService')) {
						return {
							reason: RejectionReason.DATA_SERVICE_OVERRIDE,
							details: 'ALuLegalUnitService'
						};
					}
					break;
				case 'lu-user-select':
					if (providers.some(p => p.provide === 'ALuUserService')) {
						return {
							reason: RejectionReason.DATA_SERVICE_OVERRIDE,
							details: 'ALuUserService'
						};
					}
					if (providers.some(p => p.provide === 'ALuUserHomonymsService')) {
						return {
							reason: RejectionReason.DATA_SERVICE_OVERRIDE,
							details: 'ALuUserHomonymsService'
						};
					}
					break;
				case 'lu-qualification-select':
					if (providers.some(p => p.provide === 'ALuQualificationService')) {
						return {
							reason: RejectionReason.DATA_SERVICE_OVERRIDE,
							details: 'ALuUserService'
						};
					}
					break;
				case 'lu-api-select':
					if (providers.some(p => p.provide === 'ALuApiService')) {
						return {
							reason: RejectionReason.DATA_SERVICE_OVERRIDE,
							details: 'ALuApiService'
						};
					}
					break;
			}
		}
	}
	return null;
}

export function getDataSource(select: LuSelectInputContext): SelectDataSource | Rejection {
	let result: SelectDataSource | Rejection = {
		reason: RejectionReason.NO_DATA_SOURCE
	};
	const htmlAstVisitor = new HtmlAstVisitor(select.node);
	let rejected = false;
	// First of all, check that there's no lu-option-select-all, because this is a rejection reason
	htmlAstVisitor.visitElements(/(lu-option-select-all)|(lu-tree-.*)/, (node) => {
		rejected = true;
		if (node.name === 'lu-option-select-all') {
			result = {
				reason: RejectionReason.SELECT_ALL
			};
		} else {
			result = {
				reason: RejectionReason.TREE_OPTION_PICKER
			};
		}
	});
	// If we have a rejection from template elements, don't go further
	if (rejected) {
		return result;
	}

	htmlAstVisitor.visitElements(/lu-option-picker(-advanced)?/, (node) => {
		// If picker doesn't have option as direct child, reject, we can't migrate this kind of custom stuff
		const luOption = node.children.find((c) => c instanceof currentSchematicContext.angularCompiler.TmplAstTemplate && c.tagName === 'lu-option');
		if (luOption === undefined) {
			result = {
				reason: RejectionReason.CUSTOM_PICKER_CONTENT
			};
		} else {
			// TODO Handle advanced option picker
			if (luOption instanceof currentSchematicContext.angularCompiler.TmplAstTemplate && node.name === 'lu-option-picker') {
				let valueName: string = '';
				let ngForOfName: string = '';
				let ngForImplicitVarName: string = '';
				// If that's a simple option picker, lu-option should have dataSource in its ngFor
				luOption.templateAttrs.forEach((attr) => {
					if (attr.name === 'ngForOf' && attr.value instanceof currentSchematicContext.angularCompiler.ASTWithSource) {
						ngForOfName = attr.value.source || '';
						ngForImplicitVarName = luOption.variables.find((v) => v.value === '$implicit')?.name || '';
					}
				});
				// Grab assigned value to make sure it's a supported one
				luOption.inputs.forEach((attr) => {
					if (attr.name === 'value' && attr.value instanceof currentSchematicContext.angularCompiler.ASTWithSource) {
						valueName = attr.value.source || '';
					}
				});
				// If value is bound to something else than the iteration variable, we don't handle it
				if (valueName !== ngForImplicitVarName) {
					result = {
						reason: RejectionReason.UNSUPPORTED_VALUE_ASSIGNMENT,
						details: valueName
					};
				} else {
					// We have found value and it matches, now let's check how it's rendered
					// Idk why but AST has two levels for a single node in this case
					const contentHost = luOption.children[0];
					if (contentHost instanceof currentSchematicContext.angularCompiler.TmplAstElement) {
						const templateNodes = contentHost.children.filter(c => c instanceof currentSchematicContext.angularCompiler.TmplAstBoundText);
						const firstValue = templateNodes[0];
						if (firstValue instanceof currentSchematicContext.angularCompiler.TmplAstBoundText && firstValue.value instanceof currentSchematicContext.angularCompiler.ASTWithSource) {
							const firstTemplateSource = firstValue.value.source?.trim();
							// First of all, check if it's a basic ?.name approach, in which case we can remove it
							if (
								(templateNodes.length === 1 && firstTemplateSource === `{{ ${valueName} }}`) ||
								firstTemplateSource === `{{ ${valueName}?.name }}` ||
								firstTemplateSource === `{{ ${valueName}.name }}`
							) {
								result = {
									sourceName: ngForOfName,
									display: {
										canBeRemoved: true
									}
								};
							} else {
								// Else, we'll have to build an option displayer
								result = {
									sourceName: ngForOfName,
									display: {
										canBeRemoved: false,
										variables: luOption.variables.map(v => {
											return v.value === '$implicit' ? `let ${v.name}` : `let ${v.name}=${v.value}`;
										}).join('; '),
										display: luOption.startSourceSpan.end.file.content.slice(select.nodeOffset + luOption.startSourceSpan.end.offset, select.nodeOffset + (luOption.endSourceSpan?.start?.offset || 0))
									}
								};
							}
						}
					}
				}

				const comparerAST = node.inputs.find(attr => attr.name === 'option-comparer')?.value;
				if (comparerAST instanceof currentSchematicContext.angularCompiler.ASTWithSource && comparerAST?.source && !isRejection(result)) {
					result.comparer = comparerAST?.source;
				}
			}
		}
	});
	return result;
}

export function getDisplayer(select: SelectContext): SelectDisplayer {

	const displayerHostNode = select.node.children.find((node) => node instanceof currentSchematicContext.angularCompiler.TmplAstTemplate && node.templateAttrs.some((attr) => attr.name === 'luDisplayer'));
	if (!displayerHostNode) {
		return {
			canBeRemoved: true
		};
	}
	if (displayerHostNode instanceof currentSchematicContext.angularCompiler.TmplAstTemplate) {
		const displayerVarName = displayerHostNode.variables.find((v) => v.value === '$implicit')?.name;
		const templateNodes: unknown[] = [];
		new HtmlAstVisitor(displayerHostNode.children).visitNodes((c) => {
			if (c instanceof currentSchematicContext.angularCompiler.TmplAstBoundText) {
				templateNodes.push(c);
			}
		});
		if (templateNodes?.length > 0) {
			const firstValue = templateNodes[0];
			if (firstValue instanceof currentSchematicContext.angularCompiler.TmplAstBoundText && firstValue.value instanceof currentSchematicContext.angularCompiler.ASTWithSource) {
				const firstTemplateSource = firstValue.value.source?.trim();
				if (
					(templateNodes.length === 1 && firstTemplateSource === `{{ ${displayerVarName} }}`) ||
					firstTemplateSource === `{{ ${displayerVarName}?.name }}` ||
					firstTemplateSource === `{{ ${displayerVarName}.name }}`
				) {
					return {
						canBeRemoved: true
					};
				} else {
					return {
						canBeRemoved: false,
						variables: displayerHostNode.variables.map(v => {
							return v.value === '$implicit' ? `let ${v.name}` : `let ${v.name}=${v.value}`;
						}).join('; '),
						display: displayerHostNode.startSourceSpan.end.file.content.slice(select.nodeOffset + displayerHostNode.startSourceSpan.end.offset, select.nodeOffset + (displayerHostNode.endSourceSpan?.start?.offset || 0))
					};
				}
			}
		}
	}
	return {
		canBeRemoved: false
	};

}
