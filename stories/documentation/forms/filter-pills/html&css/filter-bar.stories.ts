import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

interface FilterBarBasicStory {
	label: string;
	value: string;
	expanded: boolean;
}

export default {
	title: 'Documentation/Forms/FiltersPills/FilterBar/HTML&CSS',
	decorators: [
		moduleMetadata({
			imports: [
				FilterPillComponent,
				DateInputComponent,
				FormsModule,
				StoryModelDisplayComponent,
				ScrollBoxComponent,
				ButtonComponent,
				IconComponent,
				PopoverDirective,
				FormFieldComponent,
				CheckboxInputComponent,
				TextInputComponent,
				DividerComponent,
				LuTooltipModule,
			],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: FilterBarBasicStory): string {
	return `
	<form>
		<div class="filterBar" [ngModel]="group" [ngModelOptions]="{ standalone: true }">
			<lu-scroll-box class="filterBar-scrollBox">
				<div class="filterBar-scrollBox-group">
					<ul class="segmentedControl filterBar-segmentedControl" role="presentation">
						<li class="segmentedControl-item">
							<input type="radio" class="segmentedControl-item-input" name="tab" id="tab1" checked="checked" />
							<label for="tab1" class="segmentedControl-item-action">
								Tous
							</label>
						</li>
						<li class="segmentedControl-item">
							<input type="radio" class="segmentedControl-item-input" name="tab" id="tab2" />
							<label for="tab2" class="segmentedControl-item-action">
								En cours d’approbation
								@if (withNumericBadge) {
									<span class="numericBadge">8</span>
								}
							</label>
						</li>
						<li class="segmentedControl-item">
							<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
							<label for="tab3" class="segmentedControl-item-action">
								Approuvés
								@if (withNumericBadge) {
									<span class="numericBadge">88</span>
								}
							</label>
						</li>
						<li class="segmentedControl-item">
							<input type="radio" class="segmentedControl-item-input" name="tab" id="tab4" />
							<label for="tab4" class="segmentedControl-item-action">
								Clos
							</label>
						</li>
					</ul>

					<div class="divider filterBar-divider"></div>

					<button type="button" class="filterPill mod-checkbox">
						<span class="filterPill-checkbox">
							<span class="filterPill-checkbox-input"></span>
							<span class="filterPill-checkbox-icon" aria-hidden="true">
								<span class="filterPill-checkbox-icon-check"></span>
							</span>
						</span>
						<span class="filterPill-label" luTooltip="Inclure les collaborateurs partis" luTooltipWhenEllipsis>
							Inclure les collaborateurs partis
							<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="Inclure les collaborateurs partis"></span>
						</span>
					</button>

					<div class="filterPillWrapper">
						<button type="button" class="filterPill" aria-expanded="false" aria-controls="panel">
							<span class="filterPill-label">Département</span>
							<span class="filterPill-value"></span>
							<span class="filterPill-toggle">
								<span class="lucca-icon icon-arrowChevronBottom mod-S"></span>
							</span>
						</button>
						<button type="button" class="filterPill_clear clear"><span class="pr-u-mask">Vider ce champ</span></button>
					</div>

					<button type="submit" class="button mod-ghost mod-S palette-product">Appliquer les filtres</button>
				</div>
				<div class="filterBar-scrollBox-export">
					<button type="submit" class="button mod-S mod-outlined">Exporter</button>
				</div>
			</lu-scroll-box>
		</div>

	</form>
`;
}

const Template = (args: FilterBarBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<FilterBarBasicStory> = {
	args: {},
	render: Template,
};
