import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, ElementRef, forwardRef, inject, NgZone, OnDestroy, signal, viewChild } from '@angular/core';
import { AutoLinkNode, createLinkMatcherWithRegExp, LinkNode, registerAutoLink } from '@lexical/link';
import { $isAtNodeEnd } from '@lexical/selection';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl } from '@lucca-front/ng/core';
import { LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent as LuLinkComponent } from '@lucca-front/ng/link';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { $getSelection, $isRangeSelection, CLICK_COMMAND, COMMAND_PRIORITY_LOW, LexicalEditor, SELECTION_CHANGE_COMMAND } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { getSelectedNode } from '../../utils';
import { LinkDialogComponent } from './link-dialog';
import { FORMAT_LINK, registerLink, registerLinkSelectionChange } from './link.command';

const URL_REGEX = /https?:\/\/(?:www\.)?[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b(?:[-a-zA-Z0-9()@:%_+.~#?&/=;,[\]]*)/;
const EMAIL_REGEX = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

@Component({
	selector: 'lu-rich-text-plugin-link',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './link.component.html',
	styleUrl: 'link.component.scss',
	imports: [CommonModule, ButtonComponent, IconComponent, LuTooltipTriggerDirective, PopoverDirective, LuLinkComponent],
	host: {
		class: 'richTextField-toolbar-col-group',
	},
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
	readonly #ngZone = inject(NgZone);

	readonly element = viewChild.required('element', { read: ElementRef<HTMLButtonElement> });
	readonly popoverDirective = viewChild(PopoverDirective);

	readonly tabindex = signal<number>(-1);
	readonly active = signal(false);
	readonly isDisabled = signal(false);

	readonly selectedLinkElement = signal<HTMLElement | null>(null);
	readonly selectedLinkUrl = signal<string>('');

	#editor?: LexicalEditor;
	intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	#registeredCommands: () => void = () => {};

	setEditorInstance(editor: LexicalEditor) {
		this.#editor = editor;
		this.#registeredCommands = mergeRegister(
			registerLink(editor),
			registerLinkSelectionChange(editor, (isLink) => this.active.set(isLink)),
			editor.registerUpdateListener(({ editorState }) => {
				editorState.read(() => {
					const selection = $getSelection();
					if ($isRangeSelection(selection)) {
						const node = getSelectedNode(selection);
						const linkNode = $getNearestNodeOfType(node, LinkNode) || $getNearestNodeOfType(node, AutoLinkNode);

						if (linkNode) {
							const element = editor.getElementByKey(linkNode.getKey());
							this.selectedLinkElement.set(element);
							this.selectedLinkUrl.set(linkNode.getURL());
						} else {
							this.selectedLinkElement.set(null);
							this.selectedLinkUrl.set('');
						}
					} else {
						this.selectedLinkElement.set(null);
					}
				});
			}),
			registerAutoLink(editor, {
				matchers: [createLinkMatcherWithRegExp(URL_REGEX, (text) => (text.startsWith('http') ? text : `https://${text}`)), createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => `mailto:${text}`)],
				changeHandlers: [],
			}),
			editor.registerCommand(
				CLICK_COMMAND,
				() => {
					const selection = $getSelection();
					if ($isRangeSelection(selection)) {
						const node = getSelectedNode(selection);
						const linkNode = $getNearestNodeOfType(node, LinkNode) || $getNearestNodeOfType(node, AutoLinkNode);
						const isNotAtEnd = !($isAtNodeEnd(selection.anchor) && selection.isCollapsed());

						if (linkNode && isNotAtEnd) {
							this.#ngZone.run(() => {
								this.popoverDirective()?.openPopover(true);
							});
						}
					}
					return false;
				},
				COMMAND_PRIORITY_LOW,
			),
		);
	}

	getLexicalNodes() {
		return [LinkNode, AutoLinkNode];
	}

	ngOnDestroy() {
		this.#registeredCommands();
	}

	dispatchCommand() {
		this.popoverDirective()?.close();
		this.#editor?.read(() => {
			console.log('opening dialog', { url: this.selectedLinkUrl() });
			this.#luDialogService
				.open({
					content: LinkDialogComponent,
					size: 'S',
					data: this.selectedLinkUrl(),
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

	deleteLink() {
		this.popoverDirective()?.close();
		this.#editor?.dispatchCommand(FORMAT_LINK, undefined);
		this.#editor?.dispatchCommand(SELECTION_CHANGE_COMMAND, undefined);
	}

	focus() {
		(this.element() as ElementRef<HTMLButtonElement>).nativeElement.focus();
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}
}
