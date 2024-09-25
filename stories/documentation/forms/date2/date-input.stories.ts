import { LOCALE_ID } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IconComponent } from '@lucca-front/ng/icon';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular';
import { DateInputComponent } from '../../../../packages/ng/date2/date-input/date-input.component';

export default {
	title: 'Documentation/Forms/Date2/DateInput',
	decorators: [
		moduleMetadata({
			imports: [DateInputComponent, FormsModule, IconComponent],
		}),
		applicationConfig({
			providers: [{ provide: LOCALE_ID, useValue: 'fr-FR' }],
		}),
	],
	render: (args, { argTypes }) => {
		return {
			props: {
				example: new Date(),
			},
			styles: [
				`
					lu-date-input,
					.period {
						max-width: 16.25rem;
						display: block;
					}
					
					.period {
						padding: 0;
						border: 0;
						margin: 0;

						.textField-input-value {
							--component-textField-padding: var(--pr-t-spacings-50);
							--component-textField-affix-padding: var(--pr-t-spacings-50);

							margin: var(--component-textField-padding);
							margin-right: 2.5rem;
							border-radius: var(--commons-borderRadius-M);

							&:focus-visible {
								background-color: var(--palettes-product-100);
							}
						}
					}

					.period-legend {
						padding-bottom: var(--pr-t-spacings-50);
					}

					.period-separator {
						color: var(--palettes-neutral-600);
					}
				`,
			],
			template: `
			<lu-date-input [(ngModel)]="example"></lu-date-input>
			{{example}}
			
			<!--
			<br />
			<fieldset class="period">
				<legend class="period-legend">Période</legend>
				<div class="textField">
					<div class="textField-input">
						<label class="u-mask" for="dateStart">Début de la période</label>
						<input type="text" class="textField-input-value" value="08/08/2024" />
						<div class="textField-input-affix">
							<lu-icon class="period-separator" [icon]="'arrowRight'" [size]="'S'"></lu-icon>
						</div>
					</div>
					<div class="textField-input">
						<label class="u-mask" for="dateEnd">Fin de la période</label>
						<input type="text" class="textField-input-value" value="08/08/2024" />
						<div class="textField-input-affix">
							<button tabindex="-1" type="button" class="button mod-onlyIcon mod-text textField-input-affix-toggle">
								<lu-icon [icon]="'calendarPlanning'" [alt]="'Choisir une date dans le calendrier'"></lu-icon>
							</button>
						</div>
					</div>
				</div>
			</fieldset>
			-->
			`,
		};
	},
} as Meta;

export const Basic: StoryObj<DateInputComponent> = {};
