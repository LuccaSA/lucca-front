import { ASTWithSource, TmplAstBoundText, TmplAstElement, TmplAstTemplate } from '@angular/compiler';
import { LuSelectInputContext, SelectContext } from './model/select-context';
import { HtmlAst, HtmlAstVisitor } from '../lib/html-ast';

export enum RejectionReason {
	UNSUPPORTED_ATTRIBUTE,
	UNSUPPORTED_INPUT,
	CUSTOM_PICKER_CONTENT,
	NO_DATA_SOURCE,
	UNSUPPORTED_VALUE_ASSIGNMENT,
}

export interface Rejection {
	reason: RejectionReason;
	details?: string;
}

export interface SelectDataSource {
	sourceName: string;
}

export interface SelectDisplayer {
	canBeRemoved: boolean;
	source?: string;
}

const allowedAttributes = [/class/, /ngModel/, /ngModelChange/, /disabled/, /title/, /formControl/, /required/, /data-.+/, /attr\..+/, /class\..+/, /placeholder/, /title/];

export function isRejection(value: unknown): value is Rejection {
	return (value as Rejection)?.reason !== undefined && RejectionReason[(value as Rejection).reason] != undefined;
}

export function getCommonMigrationRejectionReason(node: TmplAstElement): Rejection | null {
	const unsupportedAttr = node.attributes.find((attr) => !allowedAttributes.some((rxp) => rxp.test(attr.name)));
	if (unsupportedAttr) {
		return {
			reason: RejectionReason.UNSUPPORTED_ATTRIBUTE,
			details: unsupportedAttr.name,
		};
	}
	const unsupportedInput = node.inputs.find((input) => !allowedAttributes.some((rxp) => rxp.test(input.name)));
	if (unsupportedInput) {
		return {
			reason: RejectionReason.UNSUPPORTED_INPUT,
			details: unsupportedInput.name,
		};
	}
	return null;
}

export function getDataSource(select: LuSelectInputContext): SelectDataSource | Rejection {
	let result: SelectDataSource | Rejection = {
		reason: RejectionReason.NO_DATA_SOURCE,
	};
	const htmlAstVisitor = new HtmlAstVisitor(select.node);
	htmlAstVisitor.visitElements(/lu-option-picker(-advanced)?/, (node) => {
		// If picker doesn't have option as direct child, reject, we can't migrate this kind of custom stuff
		const luOption = node.children.find((c) => c instanceof TmplAstTemplate && c.tagName === 'lu-option') as TmplAstTemplate;
		if (!luOption) {
			result = {
				reason: RejectionReason.CUSTOM_PICKER_CONTENT,
			};
		} else {
			// TODO Handle advanced option picker
			if (node.name === 'lu-option-picker') {
				let valueName: string = '';
				let ngForOfName: string = '';
				let ngForImplicitVarName: string = '';
				// If that's a simple option picker, lu-option should have dataSource in its ngFor
				luOption.templateAttrs.forEach((attr) => {
					if (attr.name === 'ngForOf') {
						ngForOfName = (attr.value as ASTWithSource).source || '';
						ngForImplicitVarName = luOption.variables.find((v) => v.value === '$implicit')?.name || '';
					}
				});
				// Grab assigned value to make sure it's a supported one
				luOption.inputs.forEach((attr) => {
					if (attr.name === 'value') {
						valueName = (attr.value as ASTWithSource).source || '';
					}
				});
				// If value is bound to something else than the iteration variable, we don't handle it
				if (valueName !== ngForImplicitVarName) {
					result = {
						reason: RejectionReason.UNSUPPORTED_VALUE_ASSIGNMENT,
						details: valueName,
					};
				} else {
					result = {
						sourceName: ngForOfName,
					};
				}
			}
		}
	});
	return result;
}

export function getDisplayer(select: SelectContext): SelectDisplayer {
	const displayerHostNode = select.node.children.find((node) => node instanceof TmplAstTemplate && node.templateAttrs.some((attr) => attr.name === 'luDisplayer')) as TmplAstTemplate;
	if (!displayerHostNode) {
		return {
			canBeRemoved: true,
		};
	}
	const displayerVarName = displayerHostNode.variables.find((v) => v.value === '$implicit')?.name;
	const templateNodes: TmplAstBoundText[] = [];
	new HtmlAstVisitor(displayerHostNode.children).visitNodes((c) => {
		if (c instanceof TmplAstBoundText) {
			templateNodes.push(c);
		}
	});
	if (templateNodes?.length > 0) {
		const firstTemplateSource = (templateNodes[0].value as ASTWithSource).source?.trim();
		if (
			(templateNodes.length === 1 && firstTemplateSource === `{{ ${displayerVarName} }}`) ||
			firstTemplateSource === `{{ ${displayerVarName}?.name }}` ||
			firstTemplateSource === `{{ ${displayerVarName}.name }}`
		) {
			return {
				canBeRemoved: true,
			};
		}
	}
	return {
		canBeRemoved: false,
	};
}
