import { NgClass } from '@angular/common';
import { booleanAttribute, Component, computed, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
import { outputFromObservable } from '@angular/core/rxjs-interop';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { getIntl, IntlParamsPipe } from '@lucca-front/ng/core';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { InlineMessageComponent } from '@lucca-front/ng/inline-message';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Subject } from 'rxjs';
import { FileEntry } from '../file-upload-entry';
import { LU_FILE_UPLOAD_TRANSLATIONS } from '../file-upload.translate';
import { formatSize } from '../formatter';

@Component({
	selector: 'lu-file-entry',
	standalone: true,
	templateUrl: './file-entry.component.html',
	styleUrls: ['./file-entry.component.scss'],
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, LuTooltipModule, ButtonComponent, InlineMessageComponent, DividerComponent, NgClass, FormFieldComponent, TextInputComponent, FormsModule, IntlParamsPipe],
	host: {
		class: 'u-displayContents',
	},
})
export class FileEntryComponent {
	#locale = inject(LOCALE_ID);

	intl = getIntl(LU_FILE_UPLOAD_TRANSLATIONS);

	state = input<'success' | 'loading' | 'error' | null>(null);

	inlineMessageError = input<string | null>(null);

	entry = input.required<FileEntry>();

	size = input<'S' | null>(null);

	iconOverride = input('');

	downloadURL = input('');

	password = input('');
	passwordChange$ = new Subject<string>();
	passwordChange = outputFromObservable(this.passwordChange$);

	get withPassword() {
		return this.passwordChange$.observed;
	}

	media = input(false, { transform: booleanAttribute });

	deleteFile$ = new Subject<void>();

	deleteFile = outputFromObservable(this.deleteFile$);

	get deletable() {
		return this.deleteFile$.observed;
	}

	fileName = computed(() => this.entry().name);
	fileType = computed(() => this.entry().type);
	fileSize = computed(() => this.entry().size);

	fileSizeDisplay = computed(() => formatSize(this.#locale, this.fileSize()));
	fileTypeDisplay = computed(() => this.intl.file.replace('{{fileTypeLastPart}}', this.fileType().split('/')[1].toUpperCase()));

	previewUrl = input<string>('');

	fileEntryIconSrc = computed(() => {
		const fileTypeLastPart = this.fileType().split('/')[1];
		const fileEntryIconRoot = 'https://cdn.lucca.fr/transverse/prisme/visuals/file-entry/';
		const fileEntryIconExtension = '.svg';

		let fileEntryIcontype = 'default';

		if (
			fileTypeLastPart === 'msword' ||
			fileTypeLastPart === 'vnd.msword' ||
			fileTypeLastPart === 'vnd.openxmlformats-officedocument.wordprocessingml.document' ||
			fileTypeLastPart === 'vnd.oasis.opendocument.text'
		) {
			fileEntryIcontype = 'document';
		}
		if (
			fileTypeLastPart === 'ms-powerpoint' ||
			fileTypeLastPart === 'vnd.ms-powerpoint' ||
			fileTypeLastPart === 'vnd.openxmlformats-officedocument.presentationml.presentation' ||
			fileTypeLastPart === 'vnd.oasis.opendocument.presentation'
		) {
			fileEntryIcontype = 'presentation';
		}
		if (
			fileTypeLastPart === 'ms-excel' ||
			fileTypeLastPart === 'vnd.ms-excel' ||
			fileTypeLastPart === 'vnd.openxmlformats-officedocument.spreadsheetml.sheet' ||
			fileTypeLastPart === 'vnd.oasis.opendocument.spreadsheet'
		) {
			fileEntryIcontype = 'spreadsheet';
		}

		return fileEntryIconRoot + fileEntryIcontype + fileEntryIconExtension;
	});

	tooltip = computed(() => {
		if (this.state() === 'error') {
			if (!this.media()) {
				return null;
			} else {
				return this.fileName() + ' — ' + this.fileSizeDisplay();
			}
		}

		if (!this.media() && this.size() === null) {
			return null;
		}

		if (this.size() === 'S' && !this.media()) {
			return this.fileTypeDisplay() + ' – ' + this.fileSizeDisplay();
		}

		return this.fileName() + ' – ' + this.fileTypeDisplay() + ' – ' + this.fileSizeDisplay();
	});

	dlClasses = computed(() => ({
		[`is-${this.state()}`]: !!this.state(),
		[`mod-${this.size()}`]: !!this.size(),
	}));
}
