import { AfterViewInit, ChangeDetectionStrategy, Component, ElementRef, forwardRef, inject, OnDestroy, signal, TemplateRef, viewChild, ViewContainerRef } from '@angular/core';
import { AutoLinkNode, createLinkMatcherWithRegExp, LinkNode, registerAutoLink } from '@lexical/link';
import { $getNearestNodeOfType, mergeRegister } from '@lexical/utils';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl } from '@lucca-front/ng/core';
import { LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { IconComponent } from '@lucca-front/ng/icon';
import { LinkComponent as LuLinkComponent } from '@lucca-front/ng/link';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { LuTooltipTriggerDirective } from '@lucca-front/ng/tooltip';
import { $getSelection, $isRangeSelection, LexicalEditor, SELECTION_CHANGE_COMMAND } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { getSelectedNode } from '../../utils';
import { LinkDialogComponent } from './link-dialog';
import { FORMAT_LINK, registerLink, registerLinkSelectionChange } from './link.command';
import { PopoverAutoLinkNode } from './popover-autolink-node';
import { PopoverLinkNode } from './popover-link-node';

const URL_REGEX = /((https?:\/\/(www\.)?)|(www\.))[-a-zA-Z0-9@:%._+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_+.~#?&//=]*)(?<![-.+():%])/;
const EMAIL_REGEX = /(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))/;

@Component({
	selector: 'lu-rich-text-plugin-link',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './link.component.html',
	styleUrl: 'link.component.scss',
	imports: [ButtonComponent, IconComponent, LuTooltipTriggerDirective, PopoverDirective, LuLinkComponent],
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
export class LinkComponent implements OnDestroy, AfterViewInit, RichTextPluginComponent {
	readonly #luDialogService = inject(LuDialogService);
	readonly #viewContainerRef = inject(ViewContainerRef);

	readonly linkNodeTemplate = viewChild.required('linkNodeTemplate', { read: TemplateRef });
	readonly element = viewChild.required('element', { read: ElementRef<HTMLButtonElement> });

	readonly tabindex = signal<number>(-1);
	readonly active = signal(false);
	readonly isDisabled = signal(false);

	#editor?: LexicalEditor;
	intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	#registeredCommands: () => void = () => {};

	constructor() {
		PopoverLinkNode.setViewContainerRef(this.#viewContainerRef);
		PopoverAutoLinkNode.setViewContainerRef(this.#viewContainerRef);
	}

	ngAfterViewInit() {
		PopoverLinkNode.setTemplateRef(this.linkNodeTemplate());
		PopoverAutoLinkNode.setTemplateRef(this.linkNodeTemplate());
	}

	setEditorInstance(editor: LexicalEditor) {
		this.#editor = editor;
		this.#registeredCommands = mergeRegister(
			registerLink(editor),
			registerLinkSelectionChange(editor, (isLink) => this.active.set(isLink)),
			registerAutoLink(editor, {
				matchers: [createLinkMatcherWithRegExp(URL_REGEX, (text) => (text.startsWith('http') ? text : `https://${text}`)), createLinkMatcherWithRegExp(EMAIL_REGEX, (text) => `mailto:${text}`)],
				changeHandlers: [],
			}),
		);
	}

	getLexicalNodes() {
		return [
			PopoverLinkNode,
			PopoverAutoLinkNode,
			{
				replace: LinkNode,
				with: (node: LinkNode) =>
					new PopoverLinkNode(node.getURL(), {
						rel: node.getRel(),
						target: node.getTarget(),
						title: node.getTitle(),
					}),
				withKlass: PopoverLinkNode,
			},
			{
				replace: AutoLinkNode,
				with: (node: AutoLinkNode) =>
					new PopoverAutoLinkNode(node.getURL(), {
						rel: node.getRel(),
						target: node.getTarget(),
						title: node.getTitle(),
					}),
				withKlass: PopoverAutoLinkNode,
			},
		];
	}

	ngOnDestroy() {
		this.#registeredCommands();
	}

	dispatchCommand() {
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

	deleteLink() {
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
