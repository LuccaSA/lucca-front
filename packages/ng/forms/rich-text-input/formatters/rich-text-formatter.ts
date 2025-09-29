import { InjectionToken } from '@angular/core';
import { LexicalEditor } from 'lexical';

type UnregisterFn = () => void;

export abstract class RichTextFormatter {
	/** Register the rich-text or plain-text Lexical plugin */
	abstract registerTextPlugin(editor: LexicalEditor): UnregisterFn;
	abstract parse(editor: LexicalEditor, text?: string | null): void;
	abstract format(editor: LexicalEditor): string;
}

class NoopFormatter extends RichTextFormatter {
	override registerTextPlugin(): UnregisterFn {
		throw new Error('You must provide a RichTextFormatter');
	}

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
