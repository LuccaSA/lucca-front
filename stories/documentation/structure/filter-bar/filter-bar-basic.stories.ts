import { Meta, StoryFn } from '@storybook/angular';

interface FilterBarBasicStory {}

export default {
	title: 'Documentation/Structure/FilterBar/Basic',
} as Meta;

function getTemplate(args: FilterBarBasicStory): string {
	return `
	<form class="filterBar">
		<div class="grid" style="--grid-columns: 4; --grid-colspan: 4; --grid-align: end">
			<div class="grid-column" style="--grid-colspanAtMediaMinS: 2; --grid-colspanAtMediaMinM: 1">
				<div class="form-field">
					<label class="formLabel" id="IDlabel" for="ID">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" placeholder="Placeholder" aria-invalid="false" />
						</div>
					</div>
				</div>
			</div>
			<div class="grid-column" style="--grid-colspanAtMediaMinS: 2; --grid-colspanAtMediaMinM: 1">
				<div class="form-field">
					<label class="formLabel" id="IDlabel" for="ID">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" placeholder="Placeholder" aria-invalid="false" />
						</div>
					</div>
				</div>
			</div>
			<div class="grid-column" style="--grid-colspanAtMediaMinS: 2; --grid-colspanAtMediaMinM: 1">
				<div class="form-field">
					<label class="formLabel" id="IDlabel" for="ID">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" placeholder="Placeholder" aria-invalid="false" />
						</div>
					</div>
				</div>
			</div>
			<div class="grid-column" style="--grid-colspanAtMediaMinS: 2; --grid-colspanAtMediaMinM: 1">
				<div class="form-field">
					<label class="formLabel" id="IDlabel" for="ID">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" placeholder="Placeholder" aria-invalid="false" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="grid filterBar-toggledFilters" style="--grid-columns: 4; --grid-colspan: 4; --grid-align: end">
			<div class="grid-column" style="--grid-colspanAtMediaMinS: 2; --grid-colspanAtMediaMinM: 1">
				<div class="form-field">
					<label class="formLabel" id="IDlabel" for="ID">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" placeholder="Placeholder" aria-invalid="false" />
						</div>
					</div>
				</div>
			</div>
			<div class="grid-column" style="--grid-colspanAtMediaMinS: 2; --grid-colspanAtMediaMinM: 1">
				<div class="form-field">
					<label class="formLabel" id="IDlabel" for="ID">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" placeholder="Placeholder" aria-invalid="false" />
						</div>
					</div>
				</div>
			</div>
			<div class="grid-column" style="--grid-colspanAtMediaMinS: 2; --grid-colspanAtMediaMinM: 1">
				<div class="form-field">
					<label class="formLabel" id="IDlabel" for="ID">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" placeholder="Placeholder" aria-invalid="false" />
						</div>
					</div>
				</div>
			</div>
			<div class="grid-column" style="--grid-colspanAtMediaMinS: 2; --grid-colspanAtMediaMinM: 1">
				<div class="form-field">
					<label class="formLabel" id="IDlabel" for="ID">Label</label>
					<div class="textField">
						<div class="textField-input">
							<input type="text" id="ID" class="textField-input-value" aria-labelledby="IDlabel" placeholder="Placeholder" aria-invalid="false" />
						</div>
					</div>
				</div>
			</div>
		</div>
		<div class="filterBar-footer">
		<div class="filterBar-footer-toggle">
			<button type="button" class="button mod-text mod-withIcon mod-block filterBar-footer-toggle-button" aria-expanded="true">
				<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span>
				<span class="filterBar-footer-toggle-button-labelAlternative" data-content-before="Moins de filtres" aria-hidden="true"></span>
				<span class="filterBar-footer-toggle-button-label">Plus de filtres</span>
			</button>
		</div>
			<div class="filterBar-footer-actions">
				<span>21 résultats sur 30</span>
				<button type="reset" class="button mod-text palette-product">Réinitialiser les filtres</button>
				<button type="submit" class="button">Appliquer les filtres</button>
			</div>
		</div>
	</form>
	`;
}

const Template: StoryFn<FilterBarBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});



export const Basic = Template.bind({});
Basic.args = {};
