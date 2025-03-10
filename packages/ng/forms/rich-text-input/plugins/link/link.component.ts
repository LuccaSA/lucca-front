import { ChangeDetectionStrategy, Component, forwardRef, inject, OnDestroy, signal } from '@angular/core';
import { $getSelection, $isRangeSelection, Klass, LexicalEditor, LexicalNode, SELECTION_CHANGE_COMMAND } from 'lexical';
import { FORMAT_LINK, registerLink, registerLinkSelectionChange } from './link.command';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { getSelectedNode } from '../../utils';
import { LinkDialogComponent } from './link-dialog';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';

@Component({
	selector: 'lu-rich-text-plugin-link',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './link.component.html',
	styleUrl: '../styles/_buttons.scss',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective],
	providers: [
		provideLuDialog(),
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => LinkComponent),
		},
	],
})
export class LinkComponent implements OnDestroy, RichTextPluginComponent {
	readonly #luDialogService = inject(LuDialogService);

	public readonly active = signal(false);
	#editor?: LexicalEditor;
	intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	#registeredCommands: () => void = () => {};

	setEditorInstance(editor: LexicalEditor) {
		this.#editor = editor;
		this.#registeredCommands = mergeRegister(
			registerLink(editor),
			registerLinkSelectionChange(editor, (isLink) => this.active.set(isLink)),
		);
	}

	getLexicalNodes(): Klass<LexicalNode>[] {
		return [LinkNode, AutoLinkNode];
	}

	public ngOnDestroy() {
		this.#registeredCommands();
	}

	public dispatchCommand() {
		this.#editor?.read(() => {
			let url = '';
			const selection = $getSelection();
			if ($isRangeSelection(selection)) {
				const node = getSelectedNode(selection);
				const parent = $getNearestNodeOfType(node, LinkNode);
				if (parent) {
					url = parent.getURL();
				}
			}

			this.#luDialogService
				.open({
					content: LinkDialogComponent,
					size: 'S',
					data: url,
				})
				.result$.subscribe((href) => {
					let newHref = href;
					if (href && !href.startsWith('http')) {
						newHref = `https://${href}`;
					}
					this.#editor.dispatchCommand(FORMAT_LINK, newHref);
					this.#editor.dispatchCommand(SELECTION_CHANGE_COMMAND, undefined);
				});
		});
	}
}
