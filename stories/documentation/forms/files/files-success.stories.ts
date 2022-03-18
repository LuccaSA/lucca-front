import { Meta, Story } from '@storybook/angular';

interface FilesSuccessStory {
	small: boolean;
}

export default {
	title: 'Documentation/Forms/Files/Success',
	argTypes: {
		small: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: FilesSuccessStory): string {
	const small = args.small ? `mod-small` : '';
	return `
	<label class="file ${small}">
		<input class="file-input is-uploaded" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-success u-textSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-error u-textError"></span>
			<span class="file-titleName">
				<span class="file-title u-marginBottomReset">File uploaded</span>
				<span class="file-name">filename.xls</span>
			</span>
			<span class="file-or">It’s the wrong file?</span>
			<span class="file-button button mod-outline">Select another file</span>
			<span class="u-mask"> – </span>
			<span class="file-formats u-marginTopSmaller">Supported file formats: .xls, .xlsx .csv</span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>
	`
}

const Template: Story<FilesSuccessStory> = (args: FilesSuccessStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Success = Template.bind({});
Success.args = { small: false };
