import { ChangeDetectionStrategy, Component, computed, DestroyRef, inject, input, OnDestroy, OnInit } from '@angular/core';
import { LuSimpleSelectInputComponent } from '../../../../simple-select/input';
import { FormFieldComponent } from '../../../../form-field/form-field.component';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { LuOptionDirective } from '../../../../core-select/option';
import { CommandPayloadType } from 'lexical';
import { mergeRegister } from '@lexical/utils';
import { FORMAT_HEADINGS, registerHeadings, registerHeadingsSelectionChange } from './headings.command';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { filter } from 'rxjs/operators';
import { isNotNil } from '../../../../time/core/misc.utils';
import { RichTextInputComponent } from '../../rich-text-input.component';
import { HeadingNode } from '@lexical/rich-text';

@Component({
	selector: 'lu-rich-text-plugin-headings',
	templateUrl: './headings.component.html',
	standalone: true,
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [LuSimpleSelectInputComponent, FormFieldComponent, ReactiveFormsModule, LuOptionDirective],
})
export class HeadingsComponent implements OnDestroy, OnInit {
	readonly #destroyRef = inject(DestroyRef);
	readonly #richTextInputComponent: RichTextInputComponent = inject(RichTextInputComponent);
	readonly #editor = this.#richTextInputComponent.editor;

	public maxHeadingLevel = input<1 | 2 | 3 | 4 | 5 | 6>(6);

	public readonly headingLabels: Record<CommandPayloadType<typeof FORMAT_HEADINGS>, [string, number]> = {
		paragraph: ['Paragraph', 0],
		h1: ['Heading 1', 1],
		h2: ['Heading 2', 2],
		h3: ['Heading 3', 3],
		h4: ['Heading 4', 4],
		h5: ['Heading 5', 5],
		h6: ['Heading 6', 6],
	};
	public readonly headingOptions = computed<CommandPayloadType<typeof FORMAT_HEADINGS>[]>(
		() => Object.keys(this.headingLabels).slice(0, this.maxHeadingLevel() + 1) as CommandPayloadType<typeof FORMAT_HEADINGS>[],
	);

	public readonly formControl = new FormControl<CommandPayloadType<typeof FORMAT_HEADINGS> | null>('paragraph');

	#registeredCommands: () => void = () => {};

	constructor() {
		this.#richTextInputComponent.customNodes.add(HeadingNode);
	}

	public ngOnInit() {
		this.#registeredCommands = mergeRegister(
			registerHeadings(this.#editor()),
			registerHeadingsSelectionChange(this.#editor(), (value) => this.formControl.setValue(value, { emitEvent: false })),
		);
		this.formControl.valueChanges.pipe(takeUntilDestroyed(this.#destroyRef), filter(isNotNil)).subscribe((heading) => this.#editor().dispatchCommand(FORMAT_HEADINGS, heading));
	}

	public ngOnDestroy() {
		this.#registeredCommands();
	}
}
