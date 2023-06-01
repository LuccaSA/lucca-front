import { Meta, Story } from '@storybook/angular';

interface FilesErrorStory {
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Files/Error',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
	},
} as Meta;

function getTemplate(args: FilesErrorStory): string {
	const s = args.s ? `mod-S` : '';
	return `
	<label class="file ${s}">
		<input class="file-input" type="file" title="" accept=".xls,.xlsx,.csv" aria-invalid="true" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-success u-textSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-error u-textError"></span>
			<span class="file-titleName">
				<span class="file-title u-marginBottom0">File not supported</span>
				<span class="file-name">filename.xls</span>
			</span>
			<span class="file-or">It’s the wrong file?</span>
			<span class="file-button button mod-outline">Select another file</span>
			<span class="u-mask"> – </span>
			<span class="file-formats u-marginTopXS">Supported file formats: .xls, .xlsx .csv</span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>
	`;
}

const Template: Story<FilesErrorStory> = (args: FilesErrorStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Error = Template.bind({});
Error.args = { s: false };
