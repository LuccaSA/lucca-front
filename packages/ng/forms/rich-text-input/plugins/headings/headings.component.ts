import { ChangeDetectionStrategy, Component, computed, DestroyRef, forwardRef, inject, input, OnDestroy, signal, viewChild } from '@angular/core';
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
import { getIntl } from '@lucca-front/ng/core';
import { LU_RICH_TEXT_INPUT_TRANSLATIONS } from '../../rich-text-input.translate';
import { FORMAT_HEADINGS, registerHeadings, registerHeadingsSelectionChange } from './headings.command';

@Component({
	selector: 'lu-rich-text-plugin-headings',
	templateUrl: './headings.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuSimpleSelectInputComponent, FormFieldComponent, ReactiveFormsModule, LuOptionDirective],
	host: {
		class: 'richTextField-toolbar-col-group',
	},
	providers: [
		{
			provide: RICH_TEXT_PLUGIN_COMPONENT,
			useExisting: forwardRef(() => HeadingsComponent),
		},
	],
})
export class HeadingsComponent implements OnDestroy, RichTextPluginComponent {
	readonly #destroyRef = inject(DestroyRef);

	readonly element = viewChild<LuSimpleSelectInputComponent<string>>('selectRef');

	readonly tabindex = signal<number>(-1);
	readonly maxHeadingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(6);
	readonly headingOptions = computed<CommandPayloadType<typeof FORMAT_HEADINGS>[]>(
		() => Object.keys(this.headingLabels).slice(0, this.maxHeadingLevel() + 1) as CommandPayloadType<typeof FORMAT_HEADINGS>[],
	);

	readonly intl = getIntl(LU_RICH_TEXT_INPUT_TRANSLATIONS);
	readonly headingLabels: Record<CommandPayloadType<typeof FORMAT_HEADINGS>, [string, number]> = {
		paragraph: [this.intl.headings0, 0],
		h1: [this.intl.headings1, 1],
		h2: [this.intl.headings2, 2],
		h3: [this.intl.headings3, 3],
		h4: [this.intl.headings4, 4],
		h5: [this.intl.headings5, 5],
		h6: [this.intl.headings6, 6],
	};
	readonly formControl = new FormControl<CommandPayloadType<typeof FORMAT_HEADINGS> | null>('paragraph');

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

	ngOnDestroy() {
		this.#registeredCommands();
	}

	focus() {
		this.element().focusInput();
	}

	setDisabledState(isDisabled: boolean) {
		if (isDisabled) {
			this.formControl.disable();
		} else {
			this.formControl.enable();
		}
	}
}
