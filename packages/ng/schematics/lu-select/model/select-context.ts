import type { TmplAstElement } from '@angular/compiler';
import { Rejection } from '../util';

type ValueOf<T> = T[keyof T];

export const selectorToComponentName = {
	'lu-select': 'LuSelectInputComponent',
} as const;

export type SelectComponent = ValueOf<typeof selectorToComponentName>;

export interface SelectContext {
	component: SelectComponent;
	tagName: string;
	node: TmplAstElement;
	nodeOffset: number;
	rejection: Rejection | null;
}

export interface LuSelectInputContext extends SelectContext {
	component: 'LuSelectInputComponent';
}
