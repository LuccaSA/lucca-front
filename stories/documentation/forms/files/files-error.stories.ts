import { Meta, StoryObj } from '@storybook/angular';

interface FilesErrorStory {}

export default {
	title: 'Documentation/Forms/Files/Error',
	argTypes: {},
} as Meta;

function getTemplate(args: FilesErrorStory): string {
	return `
	<label class="file">
		<input class="file-input" type="file" title="" accept=".xls,.xlsx,.csv" aria-invalid="true" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-signSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-signError"></span>
			<span class="file-titleName">
				<span class="file-title pr-u-marginBlockEnd0">File not supported</span>
				<span class="file-name">filename.xls</span>
				<span class="file-formats pr-u-marginBlockStart100">Supported file formats: .xls, .xlsx .csv</span>
			</span>
			<span class="file-or">It’s the wrong file?</span>
			<span class="file-button button mod-outlined">Select another file</span>
			<span class="pr-u-mask"> – </span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>

	<label class="file mod-S">
		<input class="file-input" type="file" title="" accept=".xls,.xlsx,.csv" aria-invalid="true" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-signSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-signError"></span>
			<span class="file-titleName">
				<span class="file-title pr-u-marginBlockEnd0">File not supported</span>
				<span class="file-formats">Supported file formats: .xls, .xlsx .csv</span>
				<span class="file-name">filename.xls</span>
			</span>
			<span class="file-or">It’s the wrong file?</span>
			<span class="file-button button mod-outlined mod-S">Select another file</span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>
	`;
}

const Template = (args: FilesErrorStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.file {
			margin-block-end: 1rem;
		}`,
	],
});

export const Error: StoryObj<FilesErrorStory> = {
	args: {},
	render: Template,
};
