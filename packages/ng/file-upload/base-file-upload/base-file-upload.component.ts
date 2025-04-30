import { booleanAttribute, Directive, computed, inject, input, LOCALE_ID, output } from '@angular/core';
import { getIntl } from '@lucca-front/ng/core';
import { LU_FILE_UPLOAD_TRANSLATIONS } from '../file-upload.translate';
import { formatSize, MEGA_BYTE } from '../formatter';

let nextId = 0;

@Directive()
export abstract class BaseFileUploadComponent {
	protected locale = inject(LOCALE_ID);

	protected idSuffix = nextId++;

	protected droppable = false;

	intl = getIntl(LU_FILE_UPLOAD_TRANSLATIONS);

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

	fileMaxSize = input<number>(80 * MEGA_BYTE);

	maxSizeDisplay = computed(() => formatSize(this.locale, this.fileMaxSize()));

	size = input<'S' | null>(null);

	password = input<boolean, boolean>(false, { transform: booleanAttribute });

	illustration = input<'picture' | 'paper'>('paper');

	illustrationUrl = computed(() => {
		if (this.illustration() === 'picture') {
			return 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPictureAction.svg';
		} else {
			return 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPaperAction.svg';
		}
	});

	filesChange(event: Event) {
		const host = event.target as HTMLInputElement;
		this.droppable = false;
		for (const file of Array.from(host.files)) {
			this.filePicked.emit(file);
		}
		host.value = null;
	}
}
