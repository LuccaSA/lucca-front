import { LexicalEditor } from 'lexical';
import { InjectionToken } from '@angular/core';

export abstract class RichTextFormatter {
	abstract parse(editor: LexicalEditor, text?: string | null): void;
	abstract format(editor: LexicalEditor): string;
}

class NoopFormatter extends RichTextFormatter {
	override parse(): void {
		throw new Error('You must provide a RichTextFormatter');
	}

	override format(): string {
		throw new Error('You must provide a RichTextFormatter');
	}
}

export const RICH_TEXT_FORMATTER = new InjectionToken<RichTextFormatter>('RICH_TEXT_FORMATTER', {
	factory: () => new NoopFormatter(),
});
