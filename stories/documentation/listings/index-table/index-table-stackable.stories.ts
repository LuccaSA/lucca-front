import { Meta, StoryFn } from '@storybook/angular';

interface IndexTableStackableStory {

}

export default {
	title: 'Documentation/Listings/Index Table/Stackable',
	argTypes: {
		
	},
} as Meta;

function getTemplate(args: IndexTableStackableStory): string {
	return `
	<table class="indexTable mod-stackable mod-selectable">
		<thead class="indexTable-head">
			<tr class="indexTable-head-row">
				<th class="indexTable-head-row-transparentCell" scope="col"></th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
				<th class="indexTable-head-row-cell" scope="col">Label</th>
			</tr>
		</thead>
		<tbody class="indexTable-body">
			<tr class="indexTable-body-row mod-stack2">
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
			</tr>
			<tr class="indexTable-body-row mod-stack3">
				<td class="indexTable-body-row-transparentCell">
					<label class="checkbox">
						<input class="checkbox-input" type="checkbox" />
						<span class="checkbox-label"></span>
						<span class="u-mask">Select this line</span>
					</label>
				</td>
				<td class="indexTable-body-row-cell">Content<br/>content</td>
				<td class="indexTable-body-row-cell">Content</td>
				<td class="indexTable-body-row-cell">Content</td>
			</tr>
			<tr class="indexTable-body-row mod-stack3">
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
			</tr>
		</tbody>
	</table>
	`;
}

const Template: StoryFn<IndexTableStackableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Stackable = Template.bind({});
Stackable.args = { };
