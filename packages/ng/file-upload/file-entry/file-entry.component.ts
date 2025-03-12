import { NgClass, UpperCasePipe } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { formatSize } from '../formatter';
import { FileEntry } from '../file-upload-entry';
import { Subject } from 'rxjs';
import { outputFromObservable } from '@angular/core/rxjs-interop';

@Component({
	selector: 'lu-file-entry',
	standalone: true,
	templateUrl: './file-entry.component.html',
	styleUrls: ['./file-entry.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, UpperCasePipe, LuTooltipModule, ButtonComponent, InlineMessageComponent, DividerComponent, NgClass, FormFieldComponent, TextInputComponent, FormsModule],
	host: {
		class: 'u-displayContents',
	},
})
export class FileEntryComponent {
	#locale = inject(LOCALE_ID);

	state = input<'success' | 'loading' | 'error' | null>(null);

	inlineMessageError = input<string | null>(null);

	entry = input.required<FileEntry>();

	format = input<'file' | 'word' | 'excel' | 'powerpoint'>('file');

	size = input<'S' | 'M' | null>(null);

	downloadable = input(false, { transform: booleanAttribute });
	viewable = input(false, { transform: booleanAttribute });

	password = input('');
	passwordChange$ = new Subject<string>();
	passwordChange = outputFromObservable(this.passwordChange$);

	get withPassword() {
		return this.passwordChange$.observed;
	}

	// TODO story simple/multiple avec fake service cdk qui attend 1s
	// TODO ajouter une doc md avec Olivier pour parler du combo avec le service lucca files et son intégration

	display = input<'media' | 'single' | null>(null);

	deleteFile$ = new Subject<void>();

	deleteFile = outputFromObservable(this.deleteFile$);

	get deletable() {
		return this.deleteFile$.observed;
	}

	fileName = computed(() => this.entry().name);
	fileType = computed(() => this.entry().type);
	fileSize = computed(() => this.entry().size);
	previewUrl = input<string>('');

	fileSizeDisplay = computed(() => formatSize(this.#locale, this.fileSize()));

	dlClasses = computed(() => ({
		[`is-${this.state()}`]: !!this.state(),
		[`mod-${this.size()}`]: !!this.size(),
		[`mod-${this.format()}`]: !!this.format(),
		'mod-media': this.display() === 'media',
		'mod-single': this.display() === 'single',
	}));
}
