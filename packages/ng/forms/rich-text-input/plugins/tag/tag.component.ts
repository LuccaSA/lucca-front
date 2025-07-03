import { ChangeDetectionStrategy, Component, effect, ElementRef, forwardRef, inject, input, OnDestroy, signal, viewChildren, ViewContainerRef } from '@angular/core';
import { $getRoot, $getSelection, $nodesOfType, type Klass, type LexicalEditor, type LexicalNode, NodeKey } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { $createTagNode, TagNode } from './tag-node';
import type { Tag } from './tag.model';
import { ButtonComponent } from '@lucca-front/ng/button';

@Component({
	selector: 'lu-rich-text-plugin-tag',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tag.component.html',
	styleUrl: 'tag.component.scss',
	imports: [ButtonComponent],
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

	readonly focusableElements = viewChildren(ButtonComponent, { read: ElementRef });

	editor: LexicalEditor | null = null;

	#registeredNodeKeys: NodeKey[] = [];

	#mutationListener = () => {};

	constructor() {
		TagNode.setViewContainerRef(this.#viewContainerRef);
		effect(() => {
			const tags = this.tags();
			this.editor.update(() => {
				console.log($nodesOfType(TagNode));
				$nodesOfType(TagNode).forEach((node) => {
					console.log('BBBBBBBBBBBB');
					console.log(node.getTagKey());
					const tag = tags.find((t) => t.key === node.getTagKey());
					if (tag) {
						node.setTagDescription(tag.description);
					} else {
						node.remove();
					}
				});
			});
		});
	}

	setEditorInstance(editor: LexicalEditor): void {
		this.editor = editor;

		this.#mutationListener = this.editor.registerMutationListener(
			TagNode,
			(mutations) => {
				mutations.forEach((m, k) => {
					if (m === 'created') {
						this.#registeredNodeKeys.push(k);
					}
				});
			},
			{ skipInitialization: false },
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
		this.#mutationListener();
	}
}
