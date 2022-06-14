import { Meta, Story } from '@storybook/angular';

interface TableSelectableStory {
}

export default {
	title: 'Documentation/Listings/Table/Selectable',
	argTypes: {
	},
} as Meta;

function getTemplate(args: TableSelectableStory): string {
	return `
	<table class="table">
	  <thead class="table-head">
	    <tr class="table-head-row mod-selectable">
	      <th class="table-head-row-cell">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
					</label>
				</th>
	      <th class="table-head-row-cell">Label</th>
	      <th class="table-head-row-cell">Label</th>
	      <th class="table-head-row-cell">Label</th>
	    </tr>
	  </thead>
	  <tbody class="table-body">
	    <tr class="table-body-row mod-selectable">
	      <td class="table-body-row-cell">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
					</label>
				</td>
	      <td class="table-body-row-cell">Contenu</td>
	      <td class="table-body-row-cell">Contenu</td>
	      <td class="table-body-row-cell">Contenu</td>
	    </tr>
	    <tr class="table-body-row mod-selectable">
	      <td class="table-body-row-cell">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
					</label>
				</td>
	      <td class="table-body-row-cell">Contenu</td>
	      <td class="table-body-row-cell">Contenu</td>
	      <td class="table-body-row-cell">Contenu</td>
	    </tr>
	  </tbody>
	</table>
	`
}

const Template: Story<TableSelectableStory> = (args: TableSelectableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Selectable = Template.bind({});
Selectable.args = {};
