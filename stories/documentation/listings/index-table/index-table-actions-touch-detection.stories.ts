import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableActionsTouchDetectionStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Actions touch detection',
	argTypes: {

	},
} as Meta;

function getTemplate(args: IndexTableActionsTouchDetectionStory): string {
	return `<table class="indexTable u-marginBottomL">
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
	</tbody>
</table>`;
}

const Template: StoryFn<IndexTableActionsTouchDetectionStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Actions = Template.bind({});
Actions.args = { };
