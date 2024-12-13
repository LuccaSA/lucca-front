import type { TmplAstElement } from '@angular/compiler';
import { Rejection } from '../util';
import { SourceFile } from 'typescript';

type ValueOf<T> = T[keyof T];


export const selectorToSelectComponentName = {
	'lu-select': 'LuSelectInputComponent'
} as const;

export const selectorToComponentName = {
	...selectorToSelectComponentName,
	'lu-option-picker': 'LuOptionPickerComponent',
	'lu-option-item': 'LuOptionItemComponent'
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
}

export interface LuSelectInputContext extends BaseSelectContext {
	component: 'LuSelectInputComponent';
}

export type SelectContext = LuSelectInputContext;
