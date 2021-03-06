import { ChangeDetectorRef, Directive, forwardRef, TemplateRef, ViewContainerRef } from '@angular/core';
import { ILuGroup } from '@lucca-front/ng/core';
import { ALuOptionOperator, LuForGroupContext, LuForGroupsDirective } from '@lucca-front/ng/option';
import { ILuEstablishment, ILuLegalUnit } from '../../establishment.model';

@Directive({
	selector: '[luForLegalUnits]',
	providers: [
		{
			provide: ALuOptionOperator,
			useExisting: forwardRef(() => LuForLegalUnitsDirective),
			multi: true,
		},
	]
})
export class LuForLegalUnitsDirective extends LuForGroupsDirective<ILuEstablishment, ILuLegalUnit> {

	/** @override */
	public set attrGroupBy(fn: (item: ILuEstablishment) => ILuLegalUnit) {
		throw new Error('Unsupported');
	}

	public constructor(
		protected _vcr: ViewContainerRef,
		protected _cdr: ChangeDetectorRef,
		protected _templateRef: TemplateRef<LuForGroupContext<ILuGroup<ILuEstablishment, ILuLegalUnit>>>,
	) {
		super(_vcr, _cdr, _templateRef);
	}

	/** @override */
	protected groupBy(items: ILuEstablishment[]): ILuGroup<ILuEstablishment, ILuLegalUnit>[] {
		const groups: ILuGroup<ILuEstablishment, ILuLegalUnit>[] = [];
		items.forEach((item) => {
			const legalUnit = item?.legalUnit;
			let group = groups.find(g => g.key.id === legalUnit.id);
			if (!group) {
				group = { key: legalUnit, items: [] };
				groups.push(group);
			}
			group.items.push(item);
		});
		return groups;
	}
}