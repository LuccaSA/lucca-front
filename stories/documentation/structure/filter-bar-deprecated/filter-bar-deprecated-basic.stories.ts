import { Meta, StoryObj } from '@storybook/angular';

interface FilterBarDeprecatedBasicStory {}

export default {
	title: 'Documentation/Structure/FilterBarDeprecated/Basic',
} as Meta;

function getTemplate(args: FilterBarDeprecatedBasicStory): string {
	return `<form class="filterBarDeprecated">
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
	<div class="grid filterBarDeprecated-toggledFilters" style="--grid-columns: 4; --grid-colspan: 4; --grid-align: end">
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
	<div class="filterBarDeprecated-footer">
		<button type="button" class="button mod-ghost mod-withIcon filterBarDeprecated-footer-toggleButton" aria-expanded="true">
			<span aria-hidden="true" class="lucca-icon icon-arrowChevronBottom"></span>
			<span class="filterBarDeprecated-footer-toggleButton-labelAlternative" data-content-before="Moins de filtres" aria-hidden="true"></span>
			<span class="filterBarDeprecated-footer-toggleButton-label">Plus de filtres</span>
		</button>
		<div class="filterBarDeprecated-footer-actions">
			<span>8 résultats sur 88</span>
			<button type="reset" class="button mod-ghost palette-product">Réinitialiser les filtres</button>
			<button type="submit" class="button">Appliquer les filtres</button>
		</div>
	</div>
</form>`;
}

const Template = (args: FilterBarDeprecatedBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<FilterBarDeprecatedBasicStory> = {
	args: {},
	render: Template,
};
