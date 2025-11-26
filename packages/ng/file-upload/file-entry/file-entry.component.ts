import { booleanAttribute, ChangeDetectionStrategy, Component, computed, inject, input, LOCALE_ID, ViewEncapsulation } from '@angular/core';
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
	templateUrl: './file-entry.component.html',
	styleUrl: './file-entry.component.scss',
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, LuTooltipModule, ButtonComponent, InlineMessageComponent, DividerComponent, FormFieldComponent, TextInputComponent, FormsModule, IntlParamsPipe],
	host: {
		class: 'pr-u-displayContents',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FileEntryComponent {
	#locale = inject(LOCALE_ID);

	readonly intl = getIntl(LU_FILE_UPLOAD_TRANSLATIONS);

	readonly state = input<'success' | 'loading' | 'error' | 'default'>('default');

	readonly displayFileName = input(false, { transform: booleanAttribute });

	readonly inlineMessageError = input<string | null>(null);

	readonly entry = input.required<FileEntry>();

	readonly size = input<'S' | null>(null);

	readonly iconOverride = input('');

	readonly downloadURL = input('');

	readonly password = input('');
	passwordChange$ = new Subject<string>();
	passwordChange = outputFromObservable(this.passwordChange$);

	get withPassword() {
		return this.passwordChange$.observed;
	}

	readonly media = input(false, { transform: booleanAttribute });

	deleteFile$ = new Subject<void>();

	deleteFile = outputFromObservable(this.deleteFile$);

	get deletable() {
		return this.deleteFile$.observed;
	}

	readonly fileName = computed(() => this.entry().name);
	readonly fileType = computed(() => this.entry().type);
	readonly fileSize = computed(() => this.entry().size);

	readonly fileSizeDisplay = computed(() => formatSize(this.#locale, this.fileSize()));
	readonly fileTypeDisplay = computed(() => this.intl.file.replace('{{fileTypeLastPart}}', this.fileType().split('/')[1].toUpperCase()));

	readonly previewUrl = input<string>('');

	readonly fileEntryIconSrc = computed(() => {
		const fileExtension = this.fileName().split('.').pop();
		const fileEntryIconRoot = 'https://cdn.lucca.fr/transverse/prisme/visuals/file-entry/';
		const fileEntryIconExtension = '.svg';

		switch (fileExtension) {
			case 'pdf':
			case 'xls':
			case 'xlsx':
			case 'doc':
			case 'csv':
				return fileEntryIconRoot + fileExtension + fileEntryIconExtension;
			case 'jpg':
			case 'jpeg':
			case 'png':
			case 'gif':
			case 'svg':
				return fileEntryIconRoot + 'image' + fileEntryIconExtension;
			default:
				return fileEntryIconRoot + 'default' + fileEntryIconExtension;
		}
	});

	readonly tooltip = computed(() => {
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

	readonly dlClasses = computed(() => ({
		[`is-${this.state()}`]: !!this.state(),
		[`mod-${this.size()}`]: !!this.size(),
	}));
}
