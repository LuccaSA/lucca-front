import { Meta, StoryFn } from '@storybook/angular';

interface TableSelectableStory {}

export default {
	title: 'Documentation/Listings/Table/Selectable',
	argTypes: {},
} as Meta;

function getTemplate(args: TableSelectableStory): string {
	return `
	<table class="table">
	  <thead class="table-head">
	    <tr class="table-head-row mod-selectable">
	      <th class="table-head-row-cell">
				<span class="checkboxField">
					<input type="checkbox" class="checkboxField-input" id="CB1" aria-describedby="CB1message" aria-required="true" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
				</th>
	      <th class="table-head-row-cell">Label</th>
	      <th class="table-head-row-cell">Label</th>
	      <th class="table-head-row-cell">Label</th>
	    </tr>
	  </thead>
	  <tbody class="table-body">
	    <tr class="table-body-row mod-selectable">
	      <td class="table-body-row-cell">
				<span class="checkboxField">
					<input type="checkbox" class="checkboxField-input" id="CB2" aria-describedby="CB2message" aria-required="true" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
				</td>
	      <td class="table-body-row-cell">Contenu</td>
	      <td class="table-body-row-cell">Contenu</td>
	      <td class="table-body-row-cell">Contenu</td>
	    </tr>
	    <tr class="table-body-row mod-selectable">
	      <td class="table-body-row-cell">
				<span class="checkboxField">
					<input type="checkbox" class="checkboxField-input" id="CB3" aria-describedby="CB3message" aria-required="true" />
					<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
				</span>
				</td>
	      <td class="table-body-row-cell">Contenu</td>
	      <td class="table-body-row-cell">Contenu</td>
	      <td class="table-body-row-cell">Contenu</td>
	    </tr>
	  </tbody>
	</table>
	`;
}

const Template: StoryFn<TableSelectableStory> = (args: TableSelectableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Selectable = Template.bind({});
Selectable.args = {};
