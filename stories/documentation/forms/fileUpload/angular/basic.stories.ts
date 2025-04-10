import { HttpErrorResponse, HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { Injectable, LOCALE_ID, Pipe, PipeTransform, signal } from '@angular/core';
import { FileEntry, FileEntryComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from '@lucca-front/ng/button';
import { map, Observable, switchMap, throwError, timer } from 'rxjs';
import { generateInputs } from 'stories/helpers/stories';

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
					id: 'mockId' as LuccaFileUploadResultId,
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
			options: ['S', null],
			control: {
				type: 'radio',
			},
		},
		illustration: {
			options: ['paper', 'picture'],
			control: {
				type: 'select',
			},
		},
	},
	decorators: [
		moduleMetadata({
			imports: [MultiFileUploadComponent, SingleFileUploadComponent, FormFieldComponent, TextInputComponent, LuInputDirective, ButtonComponent, FileUploadToLFEntryPipe, FileEntryComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
} as Meta;

export const Multi = {
	render: (args, { argTypes }) => {
		const { media, size, displayFileName, ...mainArgs } = args;
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
		const mediaParam = media ? `media` : ``;
		const displayFileNameParam = displayFileName && media ? `displayFileName` : ``;
		const sizeSFileUploadParam = size ? `size="S"` : ``;
		const sizeSFileEntryParam = media ? `size="S"` : sizeSFileUploadParam;

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
			template: `
			<div lang="fr">
			<lu-form-field label="Label">
				<lu-multi-file-upload ${sizeSFileUploadParam} ${generateInputs(mainArgs, argTypes)} (filePicked)="fileUploadFeature.uploadFiles([$event])" />
			</lu-form-field>
			<div class="fileEntryDisplayWrapper">
				@for(fileUpload of fileUploadFeature.fileUploads(); track $index) {
					<lu-file-entry ${sizeSFileEntryParam} ${displayFileNameParam} ${mediaParam} [entry]="fileUpload | fileUploadToLFEntry" [state]="fileUpload.state" [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload.error?.detail" (deleteFile)="deleteFile(fileUpload)" />
				}
			</div>
			</div>
			`,
		};
	},
	args: {
		size: null,
		media: false,
		displayFileName: false,
		fileMaxSize: 5000000,
		illustration: 'paper',
	},
};

export const Single = {
	render: (args, { argTypes }) => {
		const multi = Multi.render(args, { argTypes });
		const { accept, ...mainArgs } = args;
		return {
			props: { ...multi.props, accept },
			template: `@let fileUpload = fileUploadFeature.fileUploads()[0];
			<lu-form-field label="Label">
				<lu-single-file-upload ${generateInputs(mainArgs, argTypes)} [accept]="accept" (filePicked)="fileUploadFeature.uploadFiles([$event])"
				 [entry]="fileUpload | fileUploadToLFEntry" [state]="fileUpload?.state" [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload?.error?.detail" (deleteFile)="deleteFile(fileUpload)"/>
			</lu-form-field>`,
		};
	},
	args: {
		size: null,
		accept: [
			{
				format: 'image/*',
				name: 'tous les formats d’images',
			},
		],
		fileMaxSize: 5000000,
		illustration: 'paper',
		displayFileName: false,
	},
};
