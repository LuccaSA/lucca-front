import { Meta, Story } from '@storybook/angular';

interface FilesDroppableStory {
	small: boolean;
}

export default {
	title: 'Documentation/Forms/Files/Droppable',
	argTypes: {
		small: {
			control: {
				type: 'boolean',
			}
		},
	},
} as Meta;

function getTemplate(args: FilesDroppableStory): string {
	const small = args.small ? `mod-small` : '';
	return `
	<label class="file ${small}">
		<input class="file-input is-droppable" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-success u-textSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-error u-textError"></span>
			<span class="file-titleName">
				<span class="file-title u-marginBottomReset">Drag and drop your file here</span>
				<span class="file-name"></span>
			</span>
			<span class="file-or">or</span>
			<span class="file-button button mod-outline">browse files</span>
			<span class="u-mask"> – </span>
			<span class="file-formats u-marginTopSmaller">Supported file formats: .xls, .xlsx .csv</span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>
	`
}

const Template: Story<FilesDroppableStory> = (args: FilesDroppableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Droppable = Template.bind({});
Droppable.args = { small: false };
