import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input, ViewEncapsulation } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT } from '@lucca-front/ng/core-select';
import { IconComponent } from '@lucca-front/ng/icon';
import { LU_CORE_SELECT_LEGAL_UNIT_ESTABLISHMENT_TRANSLATIONS } from './legal-unit-establishment.translate';
import { LuLegalUnitEstablishmentOption } from './models';

/**
 * Renders a selected value in the input. A legal unit carries a leading icon and an establishment
 * does not: nothing else in a chip says which of the two levels it stands for, and the two behave
 * differently — one is a rule, the other an element.
 *
 * Set as the select's `valueTpl`, which only the chips read: the option rows keep the plain name,
 * their nesting already telling the levels apart.
 */
@Component({
	selector: 'lu-legal-unit-establishment-displayer',
	imports: [AsyncPipe, IconComponent],
	template: `@if (context.option$ | async; as option) {
		@if (option.kind === 'legalUnit') {
			<!-- The icon is decorative, so the distinction is spelled out for screen readers instead -->
			<lu-icon icon="buildingCompany" [alt]="intl().legalUnit" />
		}
		{{ option.name }}
	}`,
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class LuLegalUnitEstablishmentDisplayerComponent {
	readonly context = inject<ILuOptionContext<LuLegalUnitEstablishmentOption>>(LU_OPTION_CONTEXT);

	readonly intl = input(...intlInputOptions(LU_CORE_SELECT_LEGAL_UNIT_ESTABLISHMENT_TRANSLATIONS));
}
