import { ChangeDetectionStrategy, Component, computed, DestroyRef, forwardRef, inject, input, OnDestroy } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { mergeRegister } from '@lexical/utils';
import { LuOptionDirective } from '@lucca-front/ng/core-select';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { LuSimpleSelectInputComponent } from '@lucca-front/ng/simple-select';
import { CommandPayloadType, Klass, LexicalEditor, LexicalNode } from 'lexical';
import { filter } from 'rxjs';
import { RICH_TEXT_PLUGIN_COMPONENT, RichTextPluginComponent } from '../../rich-text-input.component';

import { HeadingNode } from '@lexical/rich-text';
import { FORMAT_HEADINGS, registerHeadings, registerHeadingsSelectionChange } from './headings.command';
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';

@Component({
	selector: 'lu-rich-text-plugin-headings',
	templateUrl: './headings.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuSimpleSelectInputComponent, FormFieldComponent, ReactiveFormsModule, LuOptionDirective],
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => HeadingsComponent),
		},
	],
})
export class HeadingsComponent implements OnDestroy, RichTextPluginComponent {
	readonly #destroyRef = inject(DestroyRef);

	public maxHeadingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(6);

	intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);

	public readonly headingLabels: Record<CommandPayloadType<typeof FORMAT_HEADINGS>, [string, number]> = {
		paragraph: [this.intl.headings0, 0],
		h1: [this.intl.headings1, 1],
		h2: [this.intl.headings2, 2],
		h3: [this.intl.headings3, 3],
		h4: [this.intl.headings4, 4],
		h5: [this.intl.headings5, 5],
		h6: [this.intl.headings6, 6],
	};
	public readonly headingOptions = computed<CommandPayloadType<typeof FORMAT_HEADINGS>[]>(
		() => Object.keys(this.headingLabels).slice(0, this.maxHeadingLevel() + 1) as CommandPayloadType<typeof FORMAT_HEADINGS>[],
	);

	public readonly formControl = new FormControl<CommandPayloadType<typeof FORMAT_HEADINGS> | null>('paragraph');

	#registeredCommands: () => void = () => {};

	setEditorInstance(editor: LexicalEditor): void {
		this.#registeredCommands = mergeRegister(
			registerHeadings(editor),
			registerHeadingsSelectionChange(editor, (value) => this.formControl.setValue(value, { emitEvent: false })),
		);
		this.formControl.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef), filter(Boolean)).subscribe((heading) => editor.dispatchCommand(FORMAT_HEADINGS, heading));
	}

	getLexicalNodes(): Klass<LexicalNode>[] {
		return [HeadingNode];
	}

	public ngOnDestroy() {
		this.#registeredCommands();
	}
}
