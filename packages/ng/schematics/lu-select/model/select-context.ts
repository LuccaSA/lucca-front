import type { TmplAstElement } from '@angular/compiler';
import { Rejection } from '../util';
import { SourceFile } from 'typescript';

type ValueOf<T> = T[keyof T];


export const selectorToSelectComponentName = {
	'lu-select': 'LuSelectInputComponent',
	'lu-qualification-select': 'LuQualificationSelectInputComponent',
	'lu-user-select': 'LuUserSelectModule',
	'lu-establishment-select': 'LuEstablishmentSelectInputComponent'
} as const;

export const selectorToComponentName = {
	...selectorToSelectComponentName,
	'lu-option-picker': 'LuOptionPickerComponent',
	'lu-option': 'LuOptionItemComponent',
	'lu-input-clearer': 'LuInputClearerComponent'
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
	multiple?: { start: number, end: number };
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

export type PremadeApiSelectContext = LuUserSelectInputContext
	| LuEstablishmentSelectInputContext
	| LuQualificationSelectInputContext;

export type SelectContext = LuSelectInputContext | PremadeApiSelectContext;

export type RejectedSelectContext = SelectContext & { rejection: Rejection };
