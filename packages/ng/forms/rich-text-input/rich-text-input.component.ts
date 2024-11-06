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

	tags = [
		'Prenom',
		'Nom',
		'Email',
		'Téléphone',
		'Adresse',
		'Ville',
		'Code postal',
		'Pays',
		'Entreprise',
		'Poste',
		'Service',
		'Manager',
		'Collaborateur',
		'Date de naissance',
		"Date d'embauche",
		'Date de départ',
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

	insertTag(text: string) {
		this.editor.update(() => {
			const selection = $getSelection();
			const node = new TagNode(text);
			selection.insertNodes([node]);
			node.insertAfter($createTextNode(' ')).selectEnd();
		});
	}
}
