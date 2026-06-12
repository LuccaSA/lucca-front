import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular';

@Component({
	selector: 'file-upload-stories',
	templateUrl: './file-upload.stories.html',
	imports: [SingleFileUploadComponent, MultiFileUploadComponent, LuSafeExternalSvgPipe],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			:host ::ng-deep .fileUpload,
			lu-single-file-upload,
			lu-multi-file-upload {
				inline-size: 100%;
			}
			.demo-QAtable {
				inline-size: 100%;
				table-layout: fixed;
			}
		`,
	],
})
class FileUploadStory {}

export default {
	title: 'QA/FileUpload',
	component: FileUploadStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FileUploadStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FileUploadStory> = {
	args: {},
	render: template,
};
