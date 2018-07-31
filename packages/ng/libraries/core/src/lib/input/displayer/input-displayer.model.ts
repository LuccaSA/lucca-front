import { TemplateRef, EmbeddedViewRef } from '@angular/core';

export interface ILuInputDisplayer<T = any> {
	// display(value: T): string;
	getEmbedViewRef(value: T): EmbeddedViewRef<any>;
}
export abstract class ALuInputDisplayer<T = any> implements ILuInputDisplayer<T> {
	// abstract display(value: T): string;
	abstract getEmbedViewRef(value: T): EmbeddedViewRef<any>;
}
