import { Meta, StoryFn } from '@storybook/angular';

interface FilesUploadingStory {}

export default {
	title: 'Documentation/Forms/Files/Uploading',
	argTypes: {},
} as Meta;

function getTemplate(args: FilesUploadingStory): string {
	return `
	<label class="file">
		<input class="file-input is-uploading" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-signSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-signError"></span>
			<span class="file-titleName">
				<span class="file-title pr-u-marginBlockEnd0">Uploading your file…</span>
				<span class="file-name"></span>
			</span>
			<span class="file-or"></span>
			<span class="file-button button mod-outlined"></span>
			<span class="pr-u-mask"></span>
			<span class="file-formats pr-u-marginBlockStart100"></span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>

	<label class="file mod-S">
		<input class="file-input is-uploading" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-signSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-signError"></span>
			<span class="file-titleName">
				<span class="file-title pr-u-marginBlockEnd0">Uploading your file…</span>
				<span class="file-formats">Supported file formats: .xls, .xlsx .csv</span>
				<span class="file-name"></span>
			</span>
			<span class="file-or"></span>
			<span class="file-button button mod-outlined mod-S"></span>
			<span class="file-formats"></span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>
	`;
}

const Template: StoryFn<FilesUploadingStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.file {
			margin-block-end: 1rem;
		}`,
	],
});

export const Uploading = Template.bind({});
Uploading.args = {};
