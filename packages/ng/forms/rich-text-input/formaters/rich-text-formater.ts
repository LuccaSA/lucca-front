import { LexicalEditor } from 'lexical';
import { InjectionToken } from '@angular/core';

export abstract class RichTextFormater {
	abstract parse(editor: LexicalEditor, text?: string | null): void;
	abstract format(editor: LexicalEditor): string;
}

class NoopFormatter extends RichTextFormater {
	override parse(): void {
		throw new Error('You must provide a RichTextFormater');
	}

	override format(): string {
		throw new Error('You must provide a RichTextFormater');
	}
}

export const RICH_TEXT_FORMATER = new InjectionToken<RichTextFormater>('RICH_TEXT_FORMATER', {
	factory: () => new NoopFormatter(),
});
