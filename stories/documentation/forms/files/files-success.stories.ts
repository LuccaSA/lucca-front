import { Meta, Story } from '@storybook/angular';

interface FilesSuccessStory {}

export default {
	title: 'Documentation/Forms/Files/Success',
	argTypes: {},
} as Meta;

function getTemplate(args: FilesSuccessStory): string {
	return `
	<label class="file">
		<input class="file-input is-uploaded" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-signSuccess u-textSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-signError u-textError"></span>
			<span class="file-titleName">
				<span class="file-title u-marginBottom0">File uploaded</span>
				<span class="file-name">filename.xls</span>
			</span>
			<span class="file-or">It’s the wrong file?</span>
			<span class="file-button button mod-outlined">Select another file</span>
			<span class="u-mask"> – </span>
			<span class="file-formats u-marginTopXS">Supported file formats: .xls, .xlsx .csv</span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>

	<label class="file mod-S">
		<input class="file-input is-uploaded" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-signSuccess u-textSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-signError u-textError"></span>
			<span class="file-titleName">
				<span class="file-title u-marginBottom0">File uploaded</span>
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

const Template: Story<FilesSuccessStory> = (args: FilesSuccessStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`.file {
			margin-bottom: 1rem;
		}`,
	],
});

export const Success = Template.bind({});
Success.args = {};
