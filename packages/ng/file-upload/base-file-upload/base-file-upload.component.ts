import { computed, Directive, effect, inject, input, LOCALE_ID, output } from '@angular/core';
import { intlInputOptions, luBooleanAttribute, luNumberAttribute } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE } from '@lucca-front/ng/form-field';
import { LU_FILE_UPLOAD_TRANSLATIONS } from '../file-upload.translate';
import { FileUploadSize } from '../file-upload.type';
import { formatFileSize, MEGA_BYTE } from '../formatter';

let nextId = 0;

@Directive()
export abstract class BaseFileUploadComponent {
	protected locale = inject(LOCALE_ID);

	protected idSuffix = nextId++;

	protected droppable = false;

	readonly intl = input(...intlInputOptions(LU_FILE_UPLOAD_TRANSLATIONS));

	protected formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	/**
	 * Emits each file picked by the user, through the file selector or drag and drop
	 */
	filePicked = output<File>();

	/**
	 * List of accepted file formats (`format` is used in the native `accept` attribute, `name` is displayed in the instructions). Accepts all formats when empty
	 */
	readonly accept = input<
		Array<{
			format: string;
			name?: string;
		}>
	>([]);

	protected readonly defaultAccept = computed(() => [
		{
			format: '*',
			name: this.intl().all,
		},
	]);

	protected readonly resolvedAccept = computed(() => {
		const acceptValue = this.accept();
		return acceptValue.length > 0 ? acceptValue : this.defaultAccept();
	});

	readonly acceptNames = computed(() =>
		this.resolvedAccept()
			.filter((e) => e.name)
			.map((e) => e.name),
	);

	readonly acceptAttribute = computed(() => this.resolvedAccept().map((e) => e.format));

	readonly acceptAll = computed(() => {
		return this.acceptAttribute().some((str) => str.includes('*'));
	});

	/**
	 * Increases the border-radius to use the component as a structure element
	 */
	readonly structure = input(false, { transform: luBooleanAttribute });

	/**
	 * Maximum file size displayed in the instructions, in bytes (80 MB by default)
	 */
	readonly fileMaxSize = input(80 * MEGA_BYTE, { transform: luNumberAttribute });

	readonly maxSizeDisplay = computed(() => formatFileSize(this.locale, this.fileMaxSize()));

	/**
	 * Changes the size of the component
	 */
	readonly size = input<FileUploadSize | null>(null);

	readonly password = input(false, { transform: luBooleanAttribute });

	/**
	 * Changes the illustration displayed in the drop zone
	 */
	readonly illustration = input<
		/** @deprecated use 'invoice' instead */
		'paper' | 'picture' | 'invoice'
	>('invoice');

	readonly illus = computed(() => {
		switch (this.illustration()) {
			case 'paper':
			case 'invoice':
				return 'invoice';
			default:
				return 'picture';
		}
	});

	/**
	 * Marks the field as required in the parent form field
	 */
	readonly required = input(false, { transform: luBooleanAttribute });

	/**
	 * Displays the button as the main action of the page
	 */
	readonly buttonFilled = input(false, { transform: luBooleanAttribute });

	constructor() {
		effect(() => {
			this.formFieldRef?.forceInputRequired.set(this.required());
		});
	}

	filesChange(event: Event) {
		const host = event.target as HTMLInputElement;
		this.droppable = false;
		if (host.files) {
			for (const file of Array.from(host.files)) {
				this.filePicked.emit(file);
			}
		}
		host.value = '';
	}
}
