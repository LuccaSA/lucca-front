import type { TmplAstElement } from '@angular/compiler';
import { Rejection } from '../util';
import { SourceFile } from 'typescript';

type ValueOf<T> = T[keyof T];

export const selectorToComponentName = {
  'lu-select': 'LuSelectInputComponent',
  'lu-option-picker': 'LuOptionPickerComponent',
  'lu-option-item': 'LuOptionItemComponent'
} as const;

export type SelectComponent = ValueOf<typeof selectorToComponentName>;

export interface SelectContext {
  component: SelectComponent;
  tagName: string;
  node: TmplAstElement;
  nodeOffset: number;
  rejection: Rejection | null;
  requiredImports?: string[];
  filePath: string;
  componentTS: SourceFile;
}

export interface LuSelectInputContext extends SelectContext {
  component: 'LuSelectInputComponent';
}
