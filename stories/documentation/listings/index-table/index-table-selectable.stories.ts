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
	<table class="indexTable mod-selectable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-transparentCell" scope="col">
					<label class="formLabel u-mask" for="allchbx">Select all items</label>
					<span class="checkboxField indexTable-body-row-cell-checkbox">
						<input class="checkboxField-input" type="checkbox" id="allchbx"
							aria-controls="r0chbx r1chbx r2chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span
								class="checkboxField-icon-check"></span></span>
					</span>
				</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="formLabel u-mask" for="r0chbx">Select this item</label>
					<span class="checkboxField indexTable-body-row-cell-checkbox">
						<input class="checkboxField-input" type="checkbox" id="r0chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span
								class="checkboxField-icon-check"></span></span>
					</span>
				</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="formLabel u-mask" for="r1chbx">Select this item</label>
					<span class="checkboxField indexTable-body-row-cell-checkbox">
						<input class="checkboxField-input" type="checkbox" id="r1chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span
								class="checkboxField-icon-check"></span></span>
					</span>
				</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="formLabel u-mask" for="r2chbx">Select this item</label>
					<span class="checkboxField indexTable-body-row-cell-checkbox">
						<input class="checkboxField-input" type="checkbox" id="r2chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span
								class="checkboxField-icon-check"></span></span>
					</span>
				</td>
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
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
