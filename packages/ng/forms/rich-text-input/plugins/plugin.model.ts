import { LexicalNode } from 'lexical';
import { RichTextInputComponent } from '../rich-text-input.component';

export interface RichTextEditorPluginDirective {
	richTextInputComponent: RichTextInputComponent;
	customNodes: (typeof LexicalNode)[];
}
