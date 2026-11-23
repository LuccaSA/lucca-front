import { AsyncPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component, inject, input } from '@angular/core';
import { intlInputOptions } from '@lucca-front/ng/core';
import { ILuOptionContext, LU_OPTION_CONTEXT, ɵLuOptionComponent } from '@lucca-front/ng/core-select';
import { LU_CORE_SELECT_ESTABLISHMENT_TRANSLATIONS } from './establishment.translate';
import { LuCoreSelectEstablishmentsDirective } from './establishments.directive';
import { LuCoreSelectEstablishment } from './models';

@Component({
	selector: 'lu-establishment-option',
	imports: [AsyncPipe],
	template: `
		@if (context.option$ | async; as establishment) {
			@if (isInPanel && establishmentsDirective?.isMyEstablishmentOption(establishment)) {
				<strong>{{ intl().myEstablishment }}</strong
				>&ngsp;<strong>{{ establishment.name }}</strong>
			} @else {
				<!-- Wrapped so the template indentation doesn't add spaces around the name, eg. before the comma of a multiple value -->
				<span>{{ establishment.name }}</span>
			}
		}
	`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuEstablishmentOptionComponent {
	protected context = inject<ILuOptionContext<LuCoreSelectEstablishment>>(LU_OPTION_CONTEXT);
	// Optional: a directive extending `LuCoreSelectEstablishmentsDirective` is not provided under the base class
	protected establishmentsDirective = inject(LuCoreSelectEstablishmentsDirective, { optional: true });
	// The same template displays the selected value in the field, where "My establishment" must not be prefixed
	protected isInPanel = !!inject(ɵLuOptionComponent, { optional: true });

	readonly intl = input(...intlInputOptions(LU_CORE_SELECT_ESTABLISHMENT_TRANSLATIONS));
}
