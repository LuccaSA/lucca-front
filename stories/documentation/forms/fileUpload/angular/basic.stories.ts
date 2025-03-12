import { HttpErrorResponse, HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { Injectable, Pipe, PipeTransform, signal } from '@angular/core';
import { FileEntry, FileEntryComponent, FileUploadComponent } from '@lucca-front/ng/file-upload';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from 'dist/ng/button';
import { generateInputs } from 'stories/helpers/stories';
import { map, Observable, switchMap, throwError, timer } from 'rxjs';

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
	errorSettings: ErrorSettings = 'partial';
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
									detail: 'An error occured',
								} as LuccaFileUploadError,
							}),
					),
				),
			);
		}
	}
}

export default {
	title: 'Documentation/FileUpload/Angular/Basic',
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
		displayMedia: {
			if: { arg: 'multiple', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FileUploadComponent, FormFieldComponent, TextInputComponent, LuInputDirective, ButtonComponent, FileUploadToLFEntryPipe, FileEntryComponent],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		const { accept, ...mainArgs } = args;
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
		return {
			props: {
				accept,
				fileUploadFeature,
				deleteFile: (upload: FileUpload<LuccaFileUploadResult>) => {
					uploads.set([...uploads().filter(({ file: f }) => f !== upload.file)]);
				},
				getPreviewUrl: (fileUpload: FileUpload<LuccaFileUploadResult>) => (fileUpload.file.type.startsWith('image/') ? URL.createObjectURL(fileUpload.file) : undefined),
			},
			template: `
			<lu-form-field label="Label">
				<lu-file-upload multiple ${generateInputs(mainArgs, argTypes)} [accept]="accept" (filePicked)="fileUploadFeature.uploadFiles([$event])"/>
			</lu-form-field>
			@for(fileUpload of fileUploadFeature.fileUploads(); track $index){
				<lu-file-entry [entry]="fileUpload | fileUploadToLFEntry" [state]="fileUpload.state" [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload.error?.detail" (deleteFile)="deleteFile(fileUpload)"></lu-file-entry>
			}
			`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		size: null,
		displayMedia: false,
		accept: [
			{
				format: '.jpg',
				name: 'JPG',
			},
			{
				format: '.jpeg',
			},
			{
				format: '.png',
				name: 'PNG',
			},
			{
				format: '.gif',
				name: 'GIF',
			},
			{
				format: '.svg',
				name: 'SVG',
			},
		],
		fileMaxSize: 5000000,
		disablePreview: false,
		illustration: 'paper',
	},
};
