import { ChangeDetectionStrategy, Component, effect, ElementRef, forwardRef, inject, input, OnDestroy, signal, viewChildren, ViewContainerRef } from '@angular/core';
import { $getNodeByKey, $getRoot, $getSelection, type Klass, type LexicalEditor, type LexicalNode, type NodeKey } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { $createTagNode, TagNode } from './tag-node';
import type { Tag } from './tag.model';

@Component({
	selector: 'lu-rich-text-plugin-tag',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tag.component.html',
	styleUrl: 'tag.component.scss',
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => TagComponent),
		},
	],
})
export class TagComponent implements RichTextPluginComponent, OnDestroy {
	readonly #viewContainerRef = inject(ViewContainerRef);
	readonly intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	readonly tags = input.required<Tag[]>();
	readonly isDisabled = signal(false);
	readonly tabindex = signal<number>(-1);
	readonly focusIndex = signal<number>(0);

	readonly focusableElements = viewChildren('tagButton', { read: ElementRef });

	editor: LexicalEditor | null = null;

	#tagNodeKeys = signal(new Set<NodeKey>());

	#registeredCommands = () => {};

	constructor() {
		TagNode.setViewContainerRef(this.#viewContainerRef);

		// Listen for new partial tag nodes and update their descriptions
		effect(() => {
			const tags = this.tags();
			// filter out previously recorded nodes
			const nodes = this.#tagNodeKeys();
			const isDisabled = this.isDisabled();

			this.editor.update(() => {
				nodes.forEach((node) => {
					const tagNode = $getNodeByKey<TagNode>(node);
					if (!tagNode) {
						return;
					}
					const tag = tags.find((t) => t.key === tagNode.getTagKey());
					if (tag) {
						tagNode.setTagDescription(tag.description).setDisabled(isDisabled);
					} else {
						tagNode.remove();
					}
				});
			});
		});
	}

	setEditorInstance(editor: LexicalEditor): void {
		this.editor = editor;

		// listen for new partial tag nodes (coming from formatters)
		this.#registeredCommands = this.editor.registerMutationListener(
			TagNode,
			(mutations) => {
				const newNodes = new Set<NodeKey>(this.#tagNodeKeys());
				this.editor.read(() => {
					mutations.forEach((m, k) => {
						if (m === 'created') {
							newNodes.add(k);
						} else if (m === 'destroyed') {
							newNodes.delete(k);
						}
					});
					if (newNodes.size !== this.#tagNodeKeys().size) {
						this.#tagNodeKeys.set(newNodes);
					}
				});
			},
			{ skipInitialization: true },
		);
	}

	getLexicalNodes(): Klass<LexicalNode>[] {
		return [TagNode];
	}

	insertTag(tag: Tag): void {
		this.editor?.update(() => {
			let selection = $getSelection();
			if (!selection) {
				selection = $getRoot().selectEnd();
			}
			const node = $createTagNode(tag.key, tag.description);
			selection.insertNodes([node]);
		});
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}

	focus() {
		// When receiving focus from the rich text input, focus the first tag button
		this.focusIndex.set(0);
		(this.focusableElements().at(0) as ElementRef<HTMLButtonElement>).nativeElement.focus();
	}

	focusTag(event: Event, direction: -1 | 1) {
		// When using left/right keyboard navigation within this tool,
		// cancel rich text input focus handling and focus the next/previous tag button if available
		if (this.focusIndex() >= 0 && this.focusIndex() < this.focusableElements().length - 1) {
			event.stopPropagation();
			this.focusIndex.update((v) => v + direction);

			(this.focusableElements().at(this.focusIndex()) as ElementRef<HTMLButtonElement>).nativeElement.focus();
		}
	}

	ngOnDestroy() {
		this.#registeredCommands();
	}
}
