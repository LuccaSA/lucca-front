import { booleanAttribute, computed, Directive, effect, inject, input, LOCALE_ID, output } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE } from '@lucca-front/ng/form-field';
import { LU_FILE_UPLOAD_TRANSLATIONS } from '../file-upload.translate';
import { formatFileSize, MEGA_BYTE } from '../formatter';

let nextId = 0;

@Directive()
export abstract class BaseFileUploadComponent {
	protected locale = inject(LOCALE_ID);

	protected idSuffix = nextId++;

	protected droppable = false;

	intl = input(...intlInputOptions(LU_FILE_UPLOAD_TRANSLATIONS));

	protected formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	filePicked = output<File>();

	accept = input<
		Array<{
			format: string;
			name?: string;
		}>
	>([]);

	protected defaultAccept = computed(() => [
		{
			format: '*',
			name: this.intl().all,
		},
	]);

	protected resolvedAccept = computed(() => {
		const acceptValue = this.accept();
		return acceptValue.length > 0 ? acceptValue : this.defaultAccept();
	});

	acceptNames = computed(() =>
		this.resolvedAccept()
			.filter((e) => e.name)
			.map((e) => e.name),
	);

	acceptAttribute = computed(() => this.resolvedAccept().map((e) => e.format));

	acceptAll = computed(() => {
		return this.acceptAttribute().some((str) => str.includes('*'));
	});

	structure = input(false, { transform: booleanAttribute });

	fileMaxSize = input<number>(80 * MEGA_BYTE);

	maxSizeDisplay = computed(() => formatFileSize(this.locale, this.fileMaxSize()));

	size = input<'S' | null>(null);

	password = input(false, { transform: booleanAttribute });

	illustration = input<
		/** @deprecated use 'invoice' instead */
		'paper' | 'picture' | 'invoice'
	>('invoice');

	illus = computed(() => {
		switch (this.illustration()) {
			case 'paper':
			case 'invoice':
				return 'invoice';
			default:
				return 'picture';
		}
	});

	required = input(false, { transform: booleanAttribute });

	constructor() {
		effect(() => {
			this.formFieldRef?.forceInputRequired.set(this.required());
		});
	}

	filesChange(event: Event) {
		const host = event.target as HTMLInputElement;
		this.droppable = false;
		for (const file of Array.from(host.files)) {
			this.filePicked.emit(file);
		}
		host.value = null;
	}
}
