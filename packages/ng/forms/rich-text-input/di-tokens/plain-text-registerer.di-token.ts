import { InjectionToken } from '@angular/core';
import { LexicalEditor } from 'lexical';

type UnregisterFn = () => void;

export type PlainTextRegisterer = (editor: LexicalEditor) => UnregisterFn;

export const PLAIN_TEXT_REGISTERER = new InjectionToken<PlainTextRegisterer>('PLAIN_TEXT_REGISTERER', {
	factory: () => noopPlainTextRegisterer,
});

const noopPlainTextRegisterer: PlainTextRegisterer = (_editor): UnregisterFn => {
	throw new Error('You must provide a PlainTextRegisterer');
};
