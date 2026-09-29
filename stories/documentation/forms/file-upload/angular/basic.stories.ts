import { createTestStory, generateInputs, setStoryOptions } from '@/helpers/stories';
import { waitForAngular } from '@/helpers/test';
import { HttpErrorResponse, HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { Injectable, LOCALE_ID, Pipe, PipeTransform, signal } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FILE_UPLOAD_SIZE, FileEntry, FileEntryComponent, FileEntryWrapperComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
import { TagComponent } from '@lucca-front/ng/tag';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular-vite';
import { map, Observable, switchMap, throwError, timer } from 'rxjs';
import { expect, fireEvent, userEvent, waitFor, within } from 'storybook/test';

type LuccaFileUploadResultId = string;

export interface LuccaFileUploadError {
	status: HttpStatusCode;
	detail: string;
}

export interface LuccaFileUploadResult {
	id: LuccaFileUploadResultId;
	name: string;
	contentLength: number;
	contentType: string;
	extension: string;
	createdAt: string;
	deletedAt: string | null;
	totalPages: number;
}

type FileUploadSuccess<TResult> = {
	file: File;
	result: TResult;
	progress: 100;
	state: 'success';
};

type FileUploadError = {
	file: File;
	error: LuccaFileUploadError | null;
	progress: number;
	state: 'error';
};

export type FileUpload<TResult> =
	| {
			file: File;
			progress: number;
			state: 'loading';
	  }
	| FileUploadSuccess<TResult>
	| FileUploadError;

type ErrorSettings = 'none' | 'partial' | 'all';

@Pipe({
	name: 'fileUploadToLFEntry',
})
class FileUploadToLFEntryPipe implements PipeTransform {
	transform<TResult>(upload: FileUpload<TResult>): FileEntry {
		if (!upload) {
			return null;
		}
		return {
			name: upload.file.name,
			size: upload.file.size,
			type: upload.file.type,
		};
	}
}

@Injectable({
	providedIn: 'root',
})
class MockFileUploadService {
	errorSettings: ErrorSettings = 'none';
	callNumber = 0;

	uploadFile(file: File): Observable<LuccaFileUploadResult> {
		const base = timer(2500);
		this.callNumber++;
		if (this.errorSettings === 'none' || (this.errorSettings === 'partial' && this.callNumber % 2 === 0)) {
			return base.pipe(
				map(() => ({
					id: 'mockId',
					name: file.name,
					contentLength: file.size,
					contentType: file.type,
					createdAt: new Date().toISOString(),
					deletedAt: null,
					totalPages: 0,
					extension: file.name.substring(file.name.lastIndexOf('.')),
				})),
			);
		} else {
			return base.pipe(
				switchMap(() =>
					throwError(
						() =>
							new HttpErrorResponse({
								error: {
									status: 400,
									detail: 'Virus détecté dans le fichier.',
								} as LuccaFileUploadError,
							}),
					),
				),
			);
		}
	}
}

export default {
	title: 'Documentation/File/FileUpload/Angular/Basic',
	argTypes: {
		size: {
			options: setStoryOptions(FILE_UPLOAD_SIZE),
			control: {
				type: 'select',
			},
			description: 'Modifie la taille du composant.',
			table: { category: 'inputs' },
		},
		fileMaxSize: {
			description: 'Limite le poids des fichiers importables (en octets).',
			control: {
				type: null,
			},
			table: { category: 'inputs' },
		},
		illustration: {
			options: ['invoice', 'picture'],
			control: {
				type: 'select',
			},
			description: 'Modifie l’illustration de l’icône dans la zone de drop.',
			table: { category: 'inputs' },
		},
		media: {
			description: 'Affiche les fichiers importés avec une mise en forme adaptée aux visuels.',
			table: { category: 'inputs' },
		},
		displayFileName: {
			description: 'Affiche le nom des fichiers importés sous l’image en vue <code>media</code>.',
			table: { category: 'inputs' },
		},
		structure: {
			description: 'Augmente le border-radius du champ pour l’utiliser en élément de structure.',
			table: { category: 'inputs' },
		},
		buttonFilled: {
			description: 'Affiche le bouton comme action principale de la page.',
			if: { arg: 'size', truthy: true },
			table: { category: 'inputs' },
		},
		accept: {
			control: {
				type: 'object',
			},
			description: 'Liste des formats de fichiers acceptés.',
			table: { category: 'inputs' },
		},
		AItag: {
			description: '[Story] Ajoute un tag AI au contenu du composant.',
			table: { category: 'inputs' },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [
				MultiFileUploadComponent,
				SingleFileUploadComponent,
				FormFieldComponent,
				TextInputComponent,
				LuInputDirective,
				ButtonComponent,
				FileUploadToLFEntryPipe,
				FileEntryComponent,
				FileEntryWrapperComponent,
				TagComponent,
			],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
} as Meta;

export const Multi = {
	render: (args, { argTypes }) => {
		const { media, size, displayFileName, accept, ...mainArgs } = args;
		const service = new MockFileUploadService();
		const uploads = signal([] as FileUpload<LuccaFileUploadResult>[]);
		const fileUploadFeature = {
			uploadFiles: (files: File[]) => {
				uploads.set([
					...uploads(),
					{
						file: files[0],
						progress: 20,
						state: 'loading',
					},
				]);

				service.uploadFile(files[0]).subscribe({
					next: (result) => {
						uploads.set([...uploads().filter(({ file }) => file !== files[0]), { file: files[0], result, progress: 100, state: 'success' }]);
					},
					error: (error) => {
						uploads.set([
							...uploads().filter(({ file }) => file !== files[0]),
							{
								file: files[0],
								error: error.error,
								progress: 100,
								state: 'error',
							},
						]);
					},
				});
			},
			fileUploads: uploads,
		};
		const previewCache = new Map<File, string>();
		const mediaParam = media ? ` media` : ``;
		const displayFileNameParam = displayFileName && media ? ` displayFileName` : ``;
		const sizeLFileUploadParam = size ? ` size="L"` : ``;
		const sizeLFileEntryParam = media ? `` : sizeLFileUploadParam;

		if (args.AItag) {
			return {
				props: {
					fileUploadFeature,
					deleteFile: (upload: FileUpload<LuccaFileUploadResult>) => {
						uploads.set([...uploads().filter(({ file: f }) => f !== upload.file)]);
					},
					getPreviewUrl: (fileUpload: FileUpload<LuccaFileUploadResult>) => {
						if (!fileUpload) {
							return null;
						}
						if (previewCache.has(fileUpload.file)) {
							return previewCache.get(fileUpload.file);
						} else if (fileUpload.state !== 'error' && fileUpload.file.type.startsWith('image/')) {
							const url = URL.createObjectURL(fileUpload.file);
							previewCache.set(fileUpload.file, url);
							return url;
						}
						return null;
					},
				},
				template: `<lu-form-field label="Label">
		<lu-multi-file-upload${sizeLFileUploadParam}${generateInputs(mainArgs, argTypes)} (filePicked)="fileUploadFeature.uploadFiles([$event])">
			<lu-tag icon="weatherStars" label="Scan intelligent" AI />
		</lu-multi-file-upload>
	</lu-form-field>
	<lu-file-entry-wrapper>
		@for(fileUpload of fileUploadFeature.fileUploads(); track $index) {
			<lu-file-entry${sizeLFileEntryParam}${displayFileNameParam}${mediaParam} [entry]="fileUpload | fileUploadToLFEntry" [state]="fileUpload.state" [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload.error?.detail" (deleteFile)="deleteFile(fileUpload)" />
		}
	</lu-file-entry-wrapper>`,
			};
		} else {
			return {
				props: {
					fileUploadFeature,
					deleteFile: (upload: FileUpload<LuccaFileUploadResult>) => {
						uploads.set([...uploads().filter(({ file: f }) => f !== upload.file)]);
					},
					getPreviewUrl: (fileUpload: FileUpload<LuccaFileUploadResult>) => {
						if (!fileUpload) {
							return null;
						}
						if (previewCache.has(fileUpload.file)) {
							return previewCache.get(fileUpload.file);
						} else if (fileUpload.state !== 'error' && fileUpload.file.type.startsWith('image/')) {
							const url = URL.createObjectURL(fileUpload.file);
							previewCache.set(fileUpload.file, url);
							return url;
						}
						return null;
					},
				},
				template: `<lu-form-field label="Label">
	<lu-multi-file-upload${sizeLFileUploadParam}${generateInputs(mainArgs, argTypes)} (filePicked)="fileUploadFeature.uploadFiles([$event])" />
</lu-form-field>
<lu-file-entry-wrapper>
	@for(fileUpload of fileUploadFeature.fileUploads(); track $index) {
		<lu-file-entry${sizeLFileEntryParam}${displayFileNameParam}${mediaParam} [entry]="fileUpload | fileUploadToLFEntry" [state]="fileUpload.state" [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload.error?.detail" (deleteFile)="deleteFile(fileUpload)" />
	}
</lu-file-entry-wrapper>`,
			};
		}
	},
	args: {
		media: false,
		displayFileName: false,
		fileMaxSize: 5000000,
		illustration: 'paper',
		structure: false,
		buttonFilled: false,
		accept: [
			{
				format: 'image/*',
				name: 'tous les formats d’images',
			},
		],
		AItag: false,
	},
};

export const Single = {
	render: (args, { argTypes }) => {
		const multi = Multi.render(args, { argTypes });
		const { size, displayFileName, accept, ...mainArgs } = args;

		// En Single, le FileEntry est toujours en taille L ; l'aperçu média n'existe qu'à size="L".
		const isLarge = !!size;
		const entryAttrs = `size="L"${isLarge ? ` media` : ``}${isLarge && displayFileName ? ` displayFileName` : ``}`;
		const sizeLFileUploadParam = size ? ` size="L"` : ``;
		const fileEntry = `<lu-file-entry-wrapper>
			<lu-file-entry ${entryAttrs} [entry]="fileUpload | fileUploadToLFEntry" [state]="fileUpload.state" [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload.error?.detail" (deleteFile)="deleteFile(fileUpload)" />
		</lu-file-entry-wrapper>`;
		if (args.AItag) {
			return {
				props: { ...multi.props, accept },
				template: `@let fileUpload = fileUploadFeature.fileUploads()[0];
<lu-form-field label="Label">
	@if (fileUpload) {
		${fileEntry}
	} @else {
		<lu-single-file-upload${sizeLFileUploadParam}${generateInputs(mainArgs, argTypes)} [accept]="accept" (filePicked)="fileUploadFeature.uploadFiles([$event])">
			<lu-tag icon="weatherStars" label="Scan intelligent" AI />
		</lu-single-file-upload>
	}
</lu-form-field>`,
			};
		} else {
			return {
				props: { ...multi.props, accept },
				template: `@let fileUpload = fileUploadFeature.fileUploads()[0];
<lu-form-field label="Label">
	@if (fileUpload) {
		${fileEntry}
	} @else {
		<lu-single-file-upload${sizeLFileUploadParam}${generateInputs(mainArgs, argTypes)} [accept]="accept" (filePicked)="fileUploadFeature.uploadFiles([$event])" />
	}
</lu-form-field>`,
			};
		}
	},
	argTypes: {
		// En Single, le mode media découle de la taille : le contrôle n'a pas lieu d'être.
		media: { table: { disable: true } },
	},
	args: {
		accept: [
			{
				format: 'image/*',
				name: 'tous les formats d’images',
			},
		],
		fileMaxSize: 5000000,
		illustration: 'invoice',
		displayFileName: false,
		structure: false,
		buttonFilled: false,
		AItag: false,
	},
};

// The mock upload service answers after 2.5s
const UPLOAD_TIMEOUT = { timeout: 5000 };

const createImage = (name: string) => new File(['x'.repeat(1500)], name, { type: 'image/png' });
const getFileInput = (canvasElement: HTMLElement) => canvasElement.querySelector<HTMLInputElement>('input[type="file"]');
const getEntries = (canvasElement: HTMLElement) => Array.from(canvasElement.querySelectorAll('.fileEntry'));
// The file name is surrounded by non-breaking spaces
const deleteButtonName = (fileName: string) => new RegExp(`Supprimer le fichier\\s«\\s${fileName.replace('.', '\\.')}\\s»`);

const dragAndDropPlay = async (canvasElement: HTMLElement) => {
	const input = getFileInput(canvasElement);
	const fileUpload = input.closest('.fileUpload');
	await fireEvent.dragEnter(input);
	await waitForAngular();
	await expect(fileUpload).toHaveClass('is-droppable');
	await fireEvent.dragLeave(input);
	await waitForAngular();
	await expect(fileUpload).not.toHaveClass('is-droppable');
};

export const MultiTEST = createTestStory(Multi, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('The file input exposes its contract', async () => {
		const input = getFileInput(canvasElement);
		await expect(input).toHaveAttribute('multiple');
		await expect(input).toHaveAccessibleName('Label');
		// Colons are preceded by non-breaking spaces in French
		await expect(canvas.getByText(/Poids maximum pour un fichier\s:\s5Mo\./)).toBeInTheDocument();
	});

	await step('Dragging a file over the field highlights it', async () => {
		await dragAndDropPlay(canvasElement);
	});

	await step('Picking files adds a loading entry for each of them', async () => {
		// The Multi story does not forward its accept arg, so the input gets the invalid "*" token: browsers
		// ignore it, but user-event would reject every file with it
		await userEvent.setup({ applyAccept: false }).upload(getFileInput(canvasElement), [createImage('first.png'), createImage('second.png')]);
		await waitForAngular();
		const entries = getEntries(canvasElement);
		await expect(entries).toHaveLength(2);
		for (const entry of entries) {
			await expect(entry).toHaveClass('is-loading');
		}
		await expect(canvas.getByText('first.png')).toBeInTheDocument();
		await expect(canvas.getByText('second.png')).toBeInTheDocument();
	});

	await step('The entries switch to success once uploaded', async () => {
		await waitFor(() => expect(getEntries(canvasElement).every((entry) => entry.classList.contains('is-success'))).toBe(true), UPLOAD_TIMEOUT);
		await expect(canvas.getAllByText('Fichier PNG')).toHaveLength(2);
		await expect(canvas.getAllByText('1,5ko')).toHaveLength(2);
	});

	await step('The field stays available to pick more files', async () => {
		await expect(getFileInput(canvasElement)).toBeInTheDocument();
	});

	await step('An entry can be deleted with the keyboard', async () => {
		canvas.getByRole('button', { name: deleteButtonName('first.png') }).focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(canvas.queryByText('first.png')).not.toBeInTheDocument();
		await expect(getEntries(canvasElement)).toHaveLength(1);
	});

	await step('An entry can be deleted with the mouse', async () => {
		await userEvent.click(canvas.getByRole('button', { name: deleteButtonName('second.png') }));
		await waitForAngular();
		await expect(getEntries(canvasElement)).toHaveLength(0);
	});
});

export const SingleTEST = createTestStory(Single, async ({ canvasElement, step }) => {
	await waitForAngular();

	const canvas = within(canvasElement);

	await step('The file input exposes its contract', async () => {
		const input = getFileInput(canvasElement);
		await expect(input).not.toHaveAttribute('multiple');
		await expect(input).toHaveAttribute('accept', 'image/*');
		await expect(input).toHaveAccessibleName('Label');
		// Colons are preceded by non-breaking spaces in French
		await expect(canvas.getByText(/Formats acceptés\s:\stous les formats d’images\./)).toBeInTheDocument();
		await expect(canvas.getByText(/Poids maximum\s:\s5Mo\./)).toBeInTheDocument();
	});

	await step('Dragging a file over the field highlights it', async () => {
		await dragAndDropPlay(canvasElement);
	});

	await step('Picking a file replaces the field with its entry', async () => {
		await userEvent.upload(getFileInput(canvasElement), createImage('invoice.png'));
		await waitForAngular();
		await expect(getFileInput(canvasElement)).not.toBeInTheDocument();
		const [entry] = getEntries(canvasElement);
		await expect(entry).toHaveClass('is-loading');
		await expect(entry).toHaveClass('mod-L');
		await expect(canvas.getByText('invoice.png')).toBeInTheDocument();
	});

	await step('The entry switches to success once uploaded', async () => {
		await waitFor(() => expect(getEntries(canvasElement)[0]).toHaveClass('is-success'), UPLOAD_TIMEOUT);
	});

	await step('Deleting the entry gives the field back', async () => {
		canvas.getByRole('button', { name: deleteButtonName('invoice.png') }).focus();
		await userEvent.keyboard('{Enter}');
		await waitForAngular();
		await expect(getEntries(canvasElement)).toHaveLength(0);
		await expect(getFileInput(canvasElement)).toBeInTheDocument();
	});
});
