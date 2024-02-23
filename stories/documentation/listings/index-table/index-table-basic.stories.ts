import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableBasicStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Basic',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableBasicStory): string {
	return `
	<table class="indexTable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell">Label</th>
				<th class="indexTable-head-row-cell">Label</th>
				<th class="indexTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<IndexTableBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = { };
