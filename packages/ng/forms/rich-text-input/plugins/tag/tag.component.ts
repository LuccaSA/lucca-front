import { ChangeDetectionStrategy, Component, effect, ElementRef, forwardRef, inject, input, signal, viewChildren, ViewContainerRef } from '@angular/core';
import { $createTextNode, $getSelection, type Klass, type LexicalEditor, type LexicalNode } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { TagNode } from './tag-node';
import type { Tag } from './tag.model';
import { ButtonComponent } from '../../../../button/button.component';

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
export class TagComponent implements RichTextPluginComponent {
	readonly #viewContainerRef = inject(ViewContainerRef);
	readonly intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	readonly tags = input.required<Tag[]>();
	readonly isDisabled = signal(false);
	readonly tabindex = signal<number>(-1);
	readonly focusIndex = signal<number>(0);

	readonly focusableElements = viewChildren(ButtonComponent, { read: ElementRef });

	editor: LexicalEditor | null = null;

	constructor() {
		TagNode.setViewContainerRef(this.#viewContainerRef);
		effect(() => {
			TagNode.setAvailableTags(this.tags());
		});
	}

	setEditorInstance(editor: LexicalEditor): void {
		this.editor = editor;
	}

	getLexicalNodes(): Klass<LexicalNode>[] {
		return [TagNode];
	}

	insertTag(tag: Tag): void {
		this.editor?.update(() => {
			const selection = $getSelection();
			const node = new TagNode(tag);

			if (selection) {
				selection.insertNodes([node]);
				// Move the cursor after the inserted tag node
				node.insertAfter($createTextNode('')).selectEnd();
			}
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
}
