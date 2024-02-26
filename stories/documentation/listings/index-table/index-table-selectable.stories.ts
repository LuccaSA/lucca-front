import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableSelectableStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Selectable',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableSelectableStory): string {
	return `
	<table class="indexTable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cellEmpty"></th>
				<th class="indexTable-head-row-cell">Label</th>
				<th class="indexTable-head-row-cell">Label</th>
				<th class="indexTable-head-row-cell">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cellEmpty">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Sélectionner la ligne</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cellEmpty">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Sélectionner la ligne</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cellEmpty">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Sélectionner la ligne</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
				<td class="indexTable-body-row-cell">Contenu</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<IndexTableSelectableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Selectable = Template.bind({});
Selectable.args = { };
