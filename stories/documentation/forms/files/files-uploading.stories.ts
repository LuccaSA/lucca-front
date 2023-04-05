import { Meta, Story } from '@storybook/angular';

interface FilesUploadingStory {
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Files/Uploading',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: "Taille : Small",
		},
	},
} as Meta;

function getTemplate(args: FilesUploadingStory): string {
	const s = args.s ? `mod-S` : '';
	return `
	<label class="file ${s}">
		<input class="file-input is-uploading" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-success u-textSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-error u-textError"></span>
			<span class="file-titleName">
				<span class="file-title u-marginBottom0">Uploading your file…</span>
				<span class="file-name"></span>
			</span>
			<span class="file-or"></span>
			<span class="file-button button mod-outline"></span>
			<span class="u-mask"></span>
			<span class="file-formats u-marginTopXS"></span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>
	`
}

const Template: Story<FilesUploadingStory> = (args: FilesUploadingStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Uploading = Template.bind({});
Uploading.args = { s: false };
