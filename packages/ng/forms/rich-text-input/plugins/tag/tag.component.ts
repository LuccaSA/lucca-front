import { AfterViewInit, ChangeDetectionStrategy, Component, forwardRef, inject, signal, ViewContainerRef } from '@angular/core';
import { $createTextNode, $getSelection, type Klass, type LexicalEditor, type LexicalNode } from 'lexical';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';

import { ChipComponent } from '@lucca-front/ng/chip';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { TagNode } from './tag-node';
import type { Tag } from './tag.model';
import { TAGS } from './tag.provider';

@Component({
	selector: 'lu-rich-text-plugin-tag',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	templateUrl: './tag.component.html',
	styleUrl: 'tag.component.scss',
	imports: [ChipComponent],
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => TagComponent),
		},
	],
})
export class TagComponent implements RichTextPluginComponent, AfterViewInit {
	readonly isDisabled = signal(false);
	readonly tags = inject(TAGS);
	readonly intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	readonly viewContainerRef = inject(ViewContainerRef);

	editor: LexicalEditor | null = null;

	setEditorInstance(editor: LexicalEditor): void {
		this.editor = editor;
	}

	getLexicalNodes(): Klass<LexicalNode>[] {
		TagNode.setAvailableTags(this.tags());
		return [TagNode];
	}

	insertTag(tag: Tag): void {
		this.editor?.update(() => {
			const selection = $getSelection();
			const node = new TagNode(tag);

			if (selection) {
				selection.insertNodes([node]);
				node.insertAfter($createTextNode()).selectEnd();
			}
		});
	}

	ngAfterViewInit() {
		TagNode.setViewContainerRef(this.viewContainerRef);
	}

	setDisabledState(isDisabled: boolean): void {
		this.isDisabled.set(isDisabled);
	}
}
