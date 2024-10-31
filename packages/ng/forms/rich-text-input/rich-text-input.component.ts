import { Component, ElementRef, forwardRef, OnDestroy, OnInit, viewChild, ViewEncapsulation } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { createEmptyHistoryState, registerHistory } from '@lexical/history';
import { AutoLinkNode, LinkNode } from '@lexical/link';
import { $convertFromMarkdownString, $convertToMarkdownString, TRANSFORMERS } from '@lexical/markdown';
import { HeadingNode, QuoteNode, registerRichText } from '@lexical/rich-text';
import { mergeRegister } from '@lexical/utils';
import { ButtonComponent } from '@lucca-front/ng/button';
import { IconComponent } from '@lucca-front/ng/icon';
import { $createTextNode, $getSelection, CommandPayloadType, createEditor, FORMAT_TEXT_COMMAND, LexicalCommand } from 'lexical';
import { CLEAR_FORMAT, FORMAT_HEADINGS, FORMAT_LINK, FORMAT_QUOTE, registerFormatOptions } from './commands';
import { TagNode } from './tag-node';

type Tag = {
	label: string;
	color: string;
	background: string;
};
@Component({
	selector: 'lu-rich-input',
	standalone: true,
	imports: [ButtonComponent, IconComponent],
	templateUrl: './rich-text-input.component.html',
	styleUrl: './rich-text-input.component.scss',
	encapsulation: ViewEncapsulation.None,
	providers: [
		{
			provide: NG_VALUE_ACCESSOR,
			useExisting: forwardRef(() => RichTextInputComponent),
			multi: true,
		},
	],
})
export class RichTextInputComponent implements OnInit, OnDestroy, ControlValueAccessor {
	#onChange?: (markdown: string | null) => void;
	#onTouch?: () => void;

	readonly commands = {
		FORMAT_TEXT_COMMAND,
		FORMAT_HEADINGS,
		FORMAT_QUOTE,
		FORMAT_LINK,
		CLEAR_FORMAT,
	};

	editor = createEditor({
		theme: {
			text: {
				strikethrough: 'editorTheme__textStrikethrough',
				bold: 'editorTheme__textBold',
				italic: 'editorTheme__textItalic',
			},
		},
		nodes: [HeadingNode, QuoteNode, AutoLinkNode, LinkNode, TagNode],
	});

	tags: Tag[] = [
		{
			label: 'Prenom',
			color: '#FFFFFF',
			background: '#FF5733',
		},
		{
			label: 'Nom',
			color: '#FFFFFF',
			background: '#33FF57',
		},
		{
			label: 'Email',
			color: '#FFFFFF',
			background: '#3357FF',
		},
		{
			label: 'Téléphone',
			color: '#FFFFFF',
			background: '#FF33A1',
		},
		{
			label: 'Adresse',
			color: '#FFFFFF',
			background: '#33FFA1',
		},
		{
			label: 'Ville',
			color: '#FFFFFF',
			background: '#A133FF',
		},
		{
			label: 'Code postal',
			color: '#FFFFFF',
			background: '#FF5733',
		},
		{
			label: 'Pays',
			color: '#FFFFFF',
			background: '#33FF57',
		},
		{
			label: 'Entreprise',
			color: '#FFFFFF',
			background: '#3357FF',
		},
		{
			label: 'Poste',
			color: '#FFFFFF',
			background: '#FF33A1',
		},
		{
			label: 'Service',
			color: '#FFFFFF',
			background: '#33FFA1',
		},
		{
			label: 'Manager',
			color: '#FFFFFF',
			background: '#A133FF',
		},
		{
			label: 'Collaborateur',
			color: '#FFFFFF',
			background: '#FF5733',
		},
		{
			label: 'Date de naissance',
			color: '#FFFFFF',
			background: '#33FF57',
		},
		{
			label: "Date d'embauche",
			color: '#FFFFFF',
			background: '#3357FF',
		},
		{
			label: 'Date de départ',
			color: '#FFFFFF',
			background: '#FF33A1',
		},
	];

	#cleanup?: () => void;

	protected content = viewChild.required<string, ElementRef<HTMLElement>>('content', {
		read: ElementRef,
	});

	ngOnInit(): void {
		this.editor.setRootElement(this.content().nativeElement);
		this.#cleanup = mergeRegister(
			registerRichText(this.editor),
			registerHistory(this.editor, createEmptyHistoryState(), 300),
			registerFormatOptions(this.editor),
			// registerCtrlEnterShortcut(this.editor, () => this.ctrlEnter.emit()),
			// Sync editor state with ngControlValue
			this.editor.registerUpdateListener(() =>
				this.editor.getEditorState().read(() => {
					this.#onTouch?.();
					this.#onChange?.($convertToMarkdownString(TRANSFORMERS));
				}),
			),
		);
	}

	ngOnDestroy(): void {
		this.#cleanup?.();
	}

	writeValue(markdown: string | null): void {
		this.editor.update(() => {
			$convertFromMarkdownString(markdown ?? '', TRANSFORMERS);
		});
	}

	registerOnChange(onChange: (markdown: string | null) => void): void {
		this.#onChange = onChange;
	}

	registerOnTouched(onTouch: () => void): void {
		this.#onTouch = onTouch;
	}

	setDisabledState?(isDisabled: boolean): void {
		this.editor.setEditable(!isDisabled);
	}

	onKeyDown(_$event: KeyboardEvent) {
		// later
	}

	dispatchCommand<T extends LexicalCommand<unknown>>($event: Event, type: T, payload: CommandPayloadType<T>) {
		$event.preventDefault();
		this.editor.dispatchCommand(type, payload);
	}

	insertTag({ label, color, background }: Tag) {
		this.editor.update(() => {
			const selection = $getSelection();
			const node = new TagNode(label, color, background);
			selection.insertNodes([node]);
			node.insertAfter($createTextNode(' ')).selectEnd();
		});
	}
}
