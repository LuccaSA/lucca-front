import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableActionsStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Actions',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableActionsStory): string {
	return `
	<h2 class="u-h3">Simple</h2>
	<table class="indexTable u-marginBottomL">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">
					<span class="u-mask">Actions</span>
				</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
				</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
				</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
	<h2 class="u-h3">4 or more actions + touch detection</h2>
	<table class="indexTable u-marginBottomL">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">
					<span class="u-mask">Actions</span>
				</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-copy"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-archive"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
					<!-- Implement dropdown on this button clic-->
					<button type="button" class="button indexTable-body-row-cell-subActionDropdownTrigger mod-text mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-ellipsis"></span>
					</button>
				</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-copy"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-archive"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
					<!-- Implement dropdown on this button clic-->
					<button type="button" class="button indexTable-body-row-cell-subActionDropdownTrigger">
						<span aria-hidden="true" class="lucca-icon icon-ellipsis"></span>
					</button>
				</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-cell">
					<a href="#" class="indexTable-body-row-cell-action">See details</a>
					Content
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-copy"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-archive"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
					<!-- Implement dropdown on this button clic-->
					<button type="button" class="button indexTable-body-row-cell-subActionDropdownTrigger">
						<span aria-hidden="true" class="lucca-icon icon-ellipsis"></span>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
	<h2 class="u-h3">Test with mod-selectable</h2>
	<table class="indexTable mod-selectable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-transparentCell" scope="col">
					<label class="formLabel u-mask" for="allchbx">Select all items</label>
					<span class="checkboxField indexTable-head-row-cell-checkbox">
						<input class="checkboxField-input" type="checkbox" id="allchbx"
							aria-controls="r0chbx r1chbx r2chbx" />
						<span class="checkboxField-icon" aria-hidden="true"><span
								class="checkboxField-icon-check"></span></span>
					</span>
				</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">
					<span class="u-mask">actions</span>
				</th>
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
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
				</td>
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
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
				</td>
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
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button indexTable-body-row-cell-subAction">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
				</td>
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<IndexTableActionsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Actions = Template.bind({});
Actions.args = { };
