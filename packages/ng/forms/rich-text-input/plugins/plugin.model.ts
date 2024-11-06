import { LexicalNode } from 'lexical';

export interface RichTextEditorPlugin<T extends LexicalNode | never> {
	getCustomNodes?(): T[];
}
