import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';
import { Component, Input } from '@angular/core';
import { FilePickerState } from '../../../../packages/ng/file-picker/src/lib';
import { FormsModule } from '@angular/forms';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FilePickerComponent } from '../../../../packages/ng/file-picker/src/lib/file-picker.component';

interface FilesPickerStory {
	accept: string;
	authorizedFormatsText: string;
	authorizedMaxSizeText: string;
	progress?: number;
	uploadState: FilePickerState;
	errorMessage: string;
	modSmall: boolean;
}

@Component({
	selector: 'file-picker-stories',
	template: `
		<lu-file-picker
			[accept]="accept"
			[authorizedFormatsText]="authorizedFormatsText"
			[authorizedMaxSizeText]="authorizedMaxSizeText"
			[errorMessage]="errorMessage"
			[modSmall]="modSmall"
			[progress]="progress"
			[uploadState]="uploadState"
		></lu-file-picker>
	`,
})
class FilePickerStory {
	@Input() public accept = 'application/pdf';
	@Input() public authorizedFormatsText = '';
	@Input() public authorizedMaxSizeText = '';
	@Input() public progress = undefined;
	@Input() public uploadState: FilePickerState = 'Idle';
	@Input() public errorMessage = undefined;
	@Input() public modSmall = false;
}

export default {
	title: 'Documentation/Forms/Files/Picker',
	component: FilePickerComponent,
	decorators: [
		componentWrapperDecorator(FilePickerStory),
		moduleMetadata({
			imports: [FormsModule, BrowserAnimationsModule, FilePickerComponent],
			declarations: [FilePickerStory],
		}),
	],
	argTypes: {
		accept: {
			control: { type: 'string' },
			description: 'https://developer.mozilla.org/en-US/docs/Web/HTML/Attributes/accept',
		},
		authorizedFormatsText: { control: { type: 'string' }, description: 'translation of authorized Formats' },
		authorizedMaxSizeText: { control: { type: 'string' }, description: 'translation of max file size' },
		progress: {
			control: {
				type: 'range',
				min: 0,
				max: 100,
				step: 1,
			},
			description: '% of progress (0 -> 100)',
		},
		uploadState: {
			control: { type: 'radio', options: ['Idle', 'Loading', 'Success', 'Error'] },
			description: 'Idle | Loading | Success | Error',
		},
		errorMessage: { control: { type: 'string' }, description: 'uploading error message' },
		modSmall: { control: { type: 'boolean' }, description: 'Taille : Small' },
	},
} as Meta;

// function getTemplate(args: FilesPickerStory): string {
// 	// const { accept, authorizedFormatsText, authorizedMaxSizeText, progress, uploadState, errorMessage, modSmall } = args;
// 	return `
// 	<lu-file-picker
// 	[accept]='accept'
// 	[authorizedFormatsText]='authorizedFormatsText'
// 	[authorizedMaxSizeText]='authorizedMaxSizeText'
// 	[errorMessage]='errorMessage'
// 	[modSmall]='modSmall'
// 	[progress]='progress'
// 	[uploadState]='uploadState'
// 	></lu-file-picker>
// 	`;
// }

const Template: Story<FilePickerStory> = (args: FilePickerStory) => ({
	props: args,
});

export const Picker = Template.bind({});
Picker.params = {
	accept: 'application/pdf',
	authorizedFormatsText: '',
	authorizedMaxSizeText: '',
	progress: undefined,
	uploadState: 'Idle',
	errorMessage: undefined,
	modSmall: false,
};
