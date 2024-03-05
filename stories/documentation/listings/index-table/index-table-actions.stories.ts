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
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
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
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
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
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
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
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-copy"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-archive"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
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
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-copy"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-archive"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
					<!-- Implement dropdown on this button clic-->
					<button type="button" class="button mod-text mod-onlyIcon mod-S indexTable-body-row-cell-subActionDropdownTrigger">
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
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-copy"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-archive"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
					<!-- Implement dropdown on this button clic-->
					<button type="button" class="button mod-text mod-onlyIcon mod-S indexTable-body-row-cell-subActionDropdownTrigger">
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
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select all</span>
					</label>
				</th>
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
				<td class="indexTable-body-row-transparentCell">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
				</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-trashDelete"></span>
					</button>
				</td>
			</tr>
			<tr class="indexTable-body-row">
				<td class="indexTable-body-row-transparentCell">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell mod-actions">
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
						<span aria-hidden="true" class="lucca-icon icon-officePen"></span>
					</button>
					<button type="button" class="button mod-text indexTable-body-row-cell-subAction mod-onlyIcon mod-S">
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
