import { ChangeDetectionStrategy, Component } from '@angular/core';
import { FileEntryComponent, FileEntryWrapperComponent } from '@lucca-front/ng/file-upload';
import { Meta, StoryObj, moduleMetadata } from '@storybook/angular-vite';

@Component({
	selector: 'file-entry-stories',
	templateUrl: './file-entry.stories.html',
	imports: [FileEntryComponent, FileEntryWrapperComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			.loading::after,
			:host ::ng-deep .loading::after {
				animation-play-state: paused;
			}
			:host ::ng-deep .fileEntryDisplayWrapper {
				inline-size: 100%;
			}
			.demo-QAtable {
				inline-size: 100%;
				table-layout: fixed;
			}
		`,
	],
})
class FileEntryStory {}

export default {
	title: 'QA/FileEntry',
	component: FileEntryStory,
	decorators: [
		moduleMetadata({
			entryComponents: [FileEntryStory],
		}),
	],
} as Meta;

const template = () => ({});

export const Basic: StoryObj<FileEntryStory> = {
	args: {},
	render: template,
};
