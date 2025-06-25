import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableInputStory {}

export default {
	title: 'Documentation/Listings/Index Table/Input',
	argTypes: {},
} as Meta;

function getTemplate(args: IndexTableInputStory): string {
	return `<table class="indexTable mod-selectable">
	<thead class="indexTable-head">
		<tr class="indexTable-head-row">
			<th class="indexTable-head-row-cell" scope="col">Label</th>
			<th class="indexTable-head-row-cell" scope="col">Label</th>
		</tr>
	</thead>
	<tbody class="indexTable-body">
		<tr class="indexTable-body-row">
			<td class="indexTable-body-row-cell">
				<label class="indexTable-body-row-cell-link" for="myInput">
					<span>Importer un ficher</span>
				</label>
				<input
					id="myInput"
					type="file"
					accept=".pdf, .jpg, .jpeg, .png"
					class="indexTable-body-row-cell-link u-mask"
				/>
			</td>
			<td class="indexTable-body-row-cell">Content</td>
		</tr>
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableInputStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Input = Template.bind({});
Input.args = {};
