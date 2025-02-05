import { Meta, StoryFn } from '@storybook/angular';

interface FilesDroppableStory {}

export default {
	title: 'Documentation/Forms/Files/Droppable',
	argTypes: {},
} as Meta;

function getTemplate(args: FilesDroppableStory): string {
	return `
	<label class="file">
		<input class="file-input is-droppable" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-signSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-signError"></span>
			<span class="file-titleName">
				<span class="file-title pr-u-marginBlockEnd0">Drag and drop your file here</span>
				<span class="file-name"></span>
			</span>
			<span class="file-or"> or </span>
			<span class="file-button button mod-outlined">browse files</span>
			<span class="u-mask"> – </span>
			<span class="file-formats pr-u-marginBlockStart100">Supported file formats: .xls, .xlsx .csv</span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>

	<label class="file mod-S">
		<input class="file-input is-droppable" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-signSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-signError"></span>
			<span class="file-titleName">
				<span class="file-title pr-u-marginBlockEnd0">Drag and drop your file here</span>
				<span class="file-formats">Supported file formats: .xls, .xlsx .csv</span>
				<span class="file-name"></span>
			</span>
			<span class="file-button button mod-outlined mod-S">browse files</span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>
	`;
}

const Template: StoryFn<FilesDroppableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.file {
			margin-block-end: 1rem;
		}`,
	],
});

export const Droppable = Template.bind({});
Droppable.args = {};
