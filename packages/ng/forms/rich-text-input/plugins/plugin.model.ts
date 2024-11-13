import { LexicalNode } from 'lexical';

export interface RichTextEditorPluginDirective {
	getCustomNodes?(): (typeof LexicalNode)[];
}
