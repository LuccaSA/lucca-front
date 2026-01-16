import { booleanAttribute, computed, Directive, effect, inject, input, LOCALE_ID, output } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { FORM_FIELD_INSTANCE } from '@lucca-front/ng/form-field';
import { formatSize, MEGA_BYTE } from '../file-size-formatter';
import { LU_FILE_UPLOAD_TRANSLATIONS } from '../file-upload.translate';

let nextId = 0;

@Directive()
export abstract class BaseFileUploadComponent {
	protected locale = inject(LOCALE_ID);

	protected idSuffix = nextId++;

	protected droppable = false;

	intl = getIntl(LU_FILE_UPLOAD_TRANSLATIONS);

	protected formFieldRef = inject(FORM_FIELD_INSTANCE, { optional: true });

	filePicked = output<File>();

	accept = input<
		Array<{
			format: string;
			name?: string;
		}>
	>([
		{
			format: '*',
			name: this.intl.all,
		},
	]);

	acceptNames = computed(() =>
		this.accept()
			.filter((e) => e.name)
			.map((e) => e.name),
	);

	acceptAttribute = computed(() => this.accept().map((e) => e.format));

	acceptAll = computed(() => {
		return this.acceptAttribute().some((str) => str.includes('*'));
	});

	structure = input(false, { transform: booleanAttribute });

	fileMaxSize = input<number>(80 * MEGA_BYTE);

	maxSizeDisplay = computed(() => formatSize(this.locale, this.fileMaxSize()));

	size = input<'S' | null>(null);

	password = input(false, { transform: booleanAttribute });

	illustration = input<'picture' | 'paper'>('paper');

	illustrationUrl = computed(() => {
		if (this.illustration() === 'picture') {
			return 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPictureAction.svg';
		} else {
			return 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPaperAction.svg';
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
