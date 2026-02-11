import { Meta, StoryObj } from '@storybook/angular';

interface EditableStory {}

export default {
	title: 'Documentation/Listings/Data table/HTML&CSS/Editable',
	argTypes: {},
} as Meta;

function getTemplate(args: EditableStory): string {
	return `<form action="#">
	<div class="dataTableWrapper">
		<table class="dataTable">
			<thead class="dataTable-head">
				<tr class="dataTable-head-row">
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
					<th class="dataTable-head-row-cell">Label</th>
				</tr>
			</thead>
			<tbody class="dataTable-body">
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell mod-editable">
						<div class="form-field">
							<label class="formLabel pr-u-mask" id="IDlabel1" for="ID1">Label</label>
							<div class="textField">
								<div class="textField-input">
									<input value="Label" type="text" id="ID1" class="textField-input-value" aria-labelledby="IDlabel1 IDsuffix1" />
								</div>
								<span class="textField-suffix" id="IDsuffix1">
									<span class="textField-label-suffix-item">€</span>
								</span>
							</div>
						</div>
					</td>
				</tr>
				<tr class="dataTable-body-row">
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell">Text</td>
					<td class="dataTable-body-row-cell mod-editable">
						<div class="form-field">
							<label class="formLabel pr-u-mask" id="IDlabel2" for="ID2">Label</label>
							<div class="textField">
								<div class="textField-input">
									<input value="Label" type="text" id="ID2" class="textField-input-value" aria-labelledby="IDlabel2 IDsuffix2" />
								</div>
								<span class="textField-suffix" id="IDsuffix2">
									<span class="textField-label-suffix-item">€</span>
								</span>
							</div>
						</div>
					</td>
				</tr>
			</tbody>
		</table>
	</div>
</form>`;
}

const Template = (args: EditableStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Editable: StoryObj<EditableStory> = {
	args: {},
	render: Template,
};
