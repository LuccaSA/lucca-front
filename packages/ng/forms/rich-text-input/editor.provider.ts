import { Injectable, InjectionToken, Provider, signal } from '@angular/core';
import { LexicalEditor } from 'lexical';

export const LU_RICH_TEXT_EDITOR = new InjectionToken<LexicalEditor>('LU_RICH_TEXT_EDITOR');

export function provideRichTextEditor(editor: LexicalEditor): Provider {
	return {
		provide: LU_RICH_TEXT_EDITOR,
		useValue: editor,
	};
}

@Injectable()
export class LexicalEditorProvider {
	public readonly editor = signal<LexicalEditor | undefined>(undefined);
}
