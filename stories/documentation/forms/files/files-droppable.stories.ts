import { Meta, StoryFn } from '@storybook/angular';

interface FilesDroppableStory {
	s: boolean;
}

export default {
	title: 'Documentation/Forms/Files/Droppable',
	argTypes: {
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Taille : Small',
		},
	},
} as Meta;

function getTemplate(args: FilesDroppableStory): string {
	const s = args.s ? `mod-S` : '';
	return `
	<label class="file ${s}">
		<input class="file-input is-droppable" type="file" title="" accept=".xls,.xlsx,.csv" />
		<span role="text" class="file-content">
			<span aria-hidden="true" class="file-icon lucca-icon icon-success u-textSuccess"></span>
			<span aria-hidden="true" class="file-icon lucca-icon icon-error u-textError"></span>
			<span class="file-titleName">
				<span class="file-title u-marginBottom0">Drag and drop your file here</span>
				<span class="file-name"></span>
			</span>
			<span class="file-or">or</span>
			<span class="file-button button mod-outline">browse files</span>
			<span class="u-mask"> – </span>
			<span class="file-formats u-marginTopXS">Supported file formats: .xls, .xlsx .csv</span>
			<span class="file-progress progress">
				<span class="progress-bar" style="width: 50%"></span>
			</span>
		</span>
	</label>
	`;
}

const Template: StoryFn<FilesDroppableStory> = (args: FilesDroppableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Droppable = Template.bind({});
Droppable.args = { s: false };
