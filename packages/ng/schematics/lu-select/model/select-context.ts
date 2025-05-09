// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import type { TmplAstElement } from '@angular/compiler';
import { Rejection } from '../util';
import { SourceFile } from 'typescript';

type ValueOf<T> = T[keyof T];

export const selectorToSelectComponentName = {
	'lu-select': 'LuSelectInputComponent',
	'lu-qualification-select': 'LuQualificationSelectInputComponent',
	'lu-user-select': 'LuUserSelectModule',
	'lu-establishment-select': 'LuEstablishmentSelectInputComponent',
	'lu-department-select': 'LuDepartmentSelectInputComponent',
	'lu-api-select': 'LuApiSelectInputComponent',
} as const;

export const selectorToComponentName = {
	...selectorToSelectComponentName,
	'lu-option-picker': 'LuOptionPickerComponent',
	'lu-option': 'LuOptionItemComponent',
	'lu-input-clearer': 'LuInputClearerComponent',
};

export type SelectComponent = ValueOf<typeof selectorToSelectComponentName>;

interface BaseSelectContext {
	component: SelectComponent;
	tagName: string;
	node: TmplAstElement;
	nodeOffset: number;
	rejection: Rejection | null;
	requiredImports?: string[];
	filePath: string;
	componentTS: SourceFile;
	multiple?: { start: number; end: number };
}

export interface LuSelectInputContext extends BaseSelectContext {
	component: 'LuSelectInputComponent';
}

export interface LuUserSelectInputContext extends BaseSelectContext {
	component: 'LuUserSelectModule';
}

export interface LuEstablishmentSelectInputContext extends BaseSelectContext {
	component: 'LuEstablishmentSelectInputComponent';
}

export interface LuQualificationSelectInputContext extends BaseSelectContext {
	component: 'LuQualificationSelectInputComponent';
}

export interface LuDepartmentSelectInputComponentContext extends BaseSelectContext {
	component: 'LuDepartmentSelectInputComponent';
}

export interface LuApiSelectInputComponentContext extends BaseSelectContext {
	component: 'LuApiSelectInputComponent';
}

export type PremadeApiSelectContext = LuUserSelectInputContext | LuEstablishmentSelectInputContext | LuQualificationSelectInputContext | LuDepartmentSelectInputComponentContext;

export type SelectContext = LuSelectInputContext | PremadeApiSelectContext | LuApiSelectInputComponentContext;

export type RejectedSelectContext = SelectContext & { rejection: Rejection };
