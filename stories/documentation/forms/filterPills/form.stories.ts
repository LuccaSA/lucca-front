import { FormsModule } from '@angular/forms';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DateInputComponent } from '@lucca-front/ng/date2';
import { FilterPillComponent } from '@lucca-front/ng/filter-pills';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { CheckboxInputComponent, TextInputComponent } from '@lucca-front/ng/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { PopoverDirective } from '@lucca-front/ng/popover2';
import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { DividerComponent } from 'dist/ng/divider';
import { StoryModelDisplayComponent } from 'stories/helpers/story-model-display.component';

interface FormBasicStory {
	label: string;
	value: string;
	expanded: boolean;
}

export default {
	title: 'Documentation/Forms/FiltersPills',
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
	],
	argTypes: {},
} as Meta;

function getTemplate(args: FormBasicStory): string {
	return `
	<form class="pr-u-marginBlock200">
		<lu-filter-bar [ngModel]="group" [ngModelOptions]="{standalone: true}">
			<lu-scroll-box class="filterPillScrollBoxWrapper">
				<div class="filterPillScrollBoxWrapper-first"></div>

				<!--
				<div class="filterPillScrollBoxWrapper-group">
				-->

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
								<span class="numericBadge" *ngIf="withNumericBadge">8</span>
							</label>
						</li>
						<li class="segmentedControl-item">
							<input type="radio" class="segmentedControl-item-input" name="tab" id="tab3" />
							<label for="tab3" class="segmentedControl-item-action">
								Approuvés
								<span class="numericBadge" *ngIf="withNumericBadge">88</span>
							</label>
						</li>
						<li class="segmentedControl-item">
							<input type="radio" class="segmentedControl-item-input" name="tab" id="tab4" />
							<label for="tab4" class="segmentedControl-item-action">
								Clos
							</label>
						</li>
					</ul>

					<lu-divider class="filterBar-divider" />

					<button class="filterPill" type="button" luTooltip="Filtres supplémentaires" luTooltipOnlyForDisplay [luPopover2]="contentOptions">
						<lu-icon class="filterPill-icon" icon="filtersDescending" alt="Filtres supplémentaires"></lu-icon>
					</button>

					<div class="filterPill">
						<label for="input1" class="filterPill-label" luTooltip="Inclure les collaborateurs partis" luTooltipWhenEllipsis="true">
							Inclure les collaborateurs partis
							<span class="filterPill-label-placeholder" aria-hidden="true" data-content-before="Inclure les collaborateurs partis"></span>
						</label>
						<span class="filterPill-checkbox">
							<input type="checkbox" id="input1" class="filterPill-checkbox-input" />
							<span class="filterPill-checkbox-icon" aria-hidden="true">
								<span class="filterPill-checkbox-icon-check"></span>
							</span>
						</span>
					</div>


					<div class="filterPill">
						<label for="input1" class="filterPill-label" luTooltip="Département" luTooltipWhenEllipsis="true">Équipe :</label>
						<button class="filterPill-combobox" type="button" id="input1" role="combobox" aria-expanded="false" luTooltipWhenEllipsis="true">
							Finance
						</button>
						<button type="button" class="filterPill-clear clear"><span class="u-mask">Vider ce champ</span></button>
						<button type="button" aria-hidden="true" tabindex="-1" class="filterPill-toggle">
							<lu-icon icon="arrowChevronBottom" size="S" />
						</button>
					</div>

					<lu-filter-pill label="Échéance"><lu-date-input [ngModel]="example6" [ngModelOptions]="{standalone: true}" /></lu-filter-pill>

					<lu-form-field label="Test" hiddenLabel size="S" style="width: 15rem; flex-shrink: 0">
						<lu-text-input [ngModel]="example10" [ngModelOptions]="{standalone: true}" hasSearchIcon hasClearer />
					</lu-form-field>

					<button type="submit" size="S" luButton="text" palette="product">Appliquer les filtres</button>
				<!--
				</div>

				<div class="filterPillScrollBoxWrapper-export">
					<button type="submit" size="S" luButton="outlined">Exporter</button>
				</div>
				-->

				<div class="filterPillScrollBoxWrapper-last"></div>
			</lu-scroll-box>
		</lu-filter-bar>
	</form>

	<ng-template #contentOptions>
		<form class="filterPill_popover-content popover-contentOptional">
			<lu-form-field label="Inclure les collaborateurs partis" class="filterPill_popover-content-formField mod-selectOption">
				<lu-checkbox-input [ngModel]="true" [ngModelOptions]="{standalone: true}" />
			</lu-form-field>
			<lu-form-field label="Équipe" class="filterPill_popover-content-formField mod-selectOption">
				<lu-checkbox-input [ngModel]="true" [ngModelOptions]="{standalone: true}" />
			</lu-form-field>
			<lu-form-field label="Statut" class="filterPill_popover-content-formField mod-selectOption">
				<lu-checkbox-input [ngModel]="false" [ngModelOptions]="{standalone: true}" />
			</lu-form-field>
			<lu-form-field label="Échéance" class="filterPill_popover-content-formField mod-selectOption">
				<lu-checkbox-input [ngModel]="true" [ngModelOptions]="{standalone: true}" />
			</lu-form-field>
			<lu-form-field label="Fréquence de facturation" class="filterPill_popover-content-formField mod-selectOption">
				<lu-checkbox-input [ngModel]="false" [ngModelOptions]="{standalone: true}"  />
			</lu-form-field>
			<!--
			<lu-divider />
			<button luButton="text" size="S" type="submit">Activer ces filtres</button>
			-->
		</form>
	</ng-template>
`;
}

const Template: StoryFn<FormBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Form = Template.bind({});
Form.args = {};
