import { Meta, StoryFn } from '@storybook/angular';

interface SelectableStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Selectable hover',
	argTypes: {},
} as Meta;

function getTemplate(args: SelectableStory): string {
	return `<form action="#">
	<div class="dataTableWrapper">
		<table class="dataTable mod-hover">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row mod-selectable">
					<th class="dataTable-head-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CBall" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CBall">Label</label>
					</th>
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row mod-selectable">
					<td class="dataTable-body-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CB1" checked />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CB1">Label</label>
					</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
				</tr>
				<tr class="dataTable-body-row mod-selectable">
					<td class="dataTable-body-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CB2" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CB2">Label</label>
					</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
				</tr>
				<tr class="dataTable-body-row mod-selectable">
					<td class="dataTable-body-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CB3" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CB3">Label</label>
					</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
				</tr>
			</tbody>
			<tfoot class="dataTable-foot">
				<tr class="dataTable-foot-row mod-selectable">
					<th class="dataTable-foot-row-cell">
						<span class="checkboxField">
							<input type="checkbox" class="checkboxField-input" id="CBfooter" />
							<span class="checkboxField-icon" aria-hidden="true"><span class="checkboxField-icon-check"></span></span>
						</span>
						<label class="pr-u-mask" for="CBfooter">Text</label>
					</th>
					<th class="dataTable-foot-row-cell">Text</th>
					<th class="dataTable-foot-row-cell">Text</th>
					<th class="dataTable-foot-row-cell">Text</th>
				</tr>
			</tfoot>
		</table>
	</div>
</form>`;
}

const Template: StoryFn<SelectableStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Selectable = Template.bind({});
Selectable.args = {};
