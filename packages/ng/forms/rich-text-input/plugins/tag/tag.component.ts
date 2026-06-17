import { ChangeDetectionStrategy, Component, computed, effect, ElementRef, forwardRef, inject, input, OnDestroy, signal, viewChildren, ViewContainerRef } from '@angular/core';
import { ChipComponent } from '@lucca-front/ng/chip';
import { intlInputOptions, isNotNil } from '@lucca-front/ng/core';
import { $getNodeByKey, $getRoot, $getSelection, type Klass, type LexicalEditor, type LexicalNode, type NodeKey, SKIP_DOM_SELECTION_TAG } from 'lexical';
import { INITIAL_UPDATE_TAG, RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { $createTagNode, TagNode } from './tag-node';
import type { Tag } from './tag.model';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { LuOptionDirective, LuOptionGroupDirective } from '@lucca-front/ng/core-select';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

const areSetsEqual = (a: Set<string>, b: Set<string>): boolean => a.size === b.size && [...a].every((value) => b.has(value));

@Component({
	selector: 'lu-rich-text-plugin-tag',
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tag.component.html',
	styleUrl: './tag.component.scss',
	imports: [ChipComponent, LuSimpleSelectInputComponent, FilterPillComponent, LuOptionGroupDirective, LuOptionDirective, ReactiveFormsModule],
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => RichTextPluginTagComponent),
		},
	],
})
export class RichTextPluginTagComponent implements RichTextPluginComponent, OnDestroy {
	readonly #viewContainerRef = inject(ViewContainerRef);
	readonly intl = input(...intlInputOptions(LU_RICH_TEXT_INPUT_TRANSLATIONS));

	readonly tags = input.required<Tag[]>();
	readonly isDisabled = signal(false);
	readonly focusIndex = signal<number>(0);

	readonly focusableElements = viewChildren('tagButton', { read: ElementRef });
	readonly primaryTags = computed(() => this.tags().filter((t) => !t.secondary));
	readonly secondaryTags = computed(() => this.tags().filter((t) => t.secondary));
	readonly filteredSecondaryTags = computed(() => {
		const search = this.#normalize(this.tagSearch());
		return this.secondaryTags().filter((t) => {
			const description = t.description ? this.#normalize(t.description) : '';
			return !search || description.includes(search);
		});
	});
	readonly secondaryHasGroup = computed(() => this.secondaryTags().some((s) => isNotNil(s.group)));
	readonly tagSearch = signal<string>('');
	readonly selectedTagControl = new FormControl<Tag | null>(null);

	editor: LexicalEditor | null = null;

	readonly #tagNodeKeys = signal(new Set<NodeKey>());

	#registeredCommands = () => {};

	constructor() {
		// Listen for new partial tag nodes and update their descriptions
		effect(() => {
			const tags = this.tags();
			// filter out previously recorded nodes
			const nodes = this.#tagNodeKeys();
			const isDisabled = this.isDisabled();

			this.editor?.update(
				() => {
					nodes.forEach((node) => {
						const tagNode = $getNodeByKey<TagNode>(node);
						if (!tagNode) {
							return;
						}
						const tag = tags.find((t) => t.key === tagNode.getTagKey());
						if (tag) {
							tagNode.setViewContainerRef(this.#viewContainerRef);
							tagNode.setTagDescription(tag.description ?? '').setDisabled(isDisabled);
						} else {
							tagNode.remove();
						}
					});
				},
				{ tag: [SKIP_DOM_SELECTION_TAG, INITIAL_UPDATE_TAG] },
			);
		});

		this.selectedTagControl.valueChanges.pipe(takeUntilDestroyed()).subscribe((tag) => {
			if (tag) {
				this.selectedTagControl.reset();
				this.insertTag(tag);
			}
		});
	}

	setEditorInstance(editor: LexicalEditor): void {
		this.editor = editor;

		// listen for new partial tag nodes (coming from formatters)
		this.#registeredCommands = this.editor.registerMutationListener(
			TagNode,
			(mutations) => {
				const newNodes = new Set<NodeKey>(this.#tagNodeKeys());
				this.editor?.read(() => {
					mutations.forEach((m, k) => {
						if (m === 'created') {
							newNodes.add(k);
						} else if (m === 'destroyed') {
							newNodes.delete(k);
						}
					});
					if (!areSetsEqual(newNodes, this.#tagNodeKeys())) {
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
			const node = $createTagNode(tag.key, this.#viewContainerRef, tag.description);
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
		event.stopPropagation();

		this.focusIndex.update((v) => (v + direction) % this.focusableElements().length);
		(this.focusableElements().at(this.focusIndex()) as ElementRef<HTMLButtonElement>).nativeElement.focus();
	}

	ngOnDestroy() {
		this.#registeredCommands();
	}

	groupByTagGroup(tag: Tag) {
		return tag.group;
	}

	#normalize(str: string): string {
		return str
			.normalize('NFD')
			.replace(/\p{Diacritic}/gu, '')
			.toLowerCase();
	}
}
