import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ILuModalContent, LU_MODAL_DATA } from '@lucca-front/ng/modal';
import { Harvest, varietyNames } from './harvest-planning.data';

/**
 * Delete confirmation, still written against the legacy `LuModal` API as many screens of consuming
 * applications are: `LuModal.open()` renders it through the dialog adapter. Its wording follows the
 * low impact delete confirmation of Prisme.
 */
@Component({
	selector: 'app-harvest-delete',
	templateUrl: './harvest-delete.component.html',
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarvestDeleteComponent implements ILuModalContent<true> {
	readonly harvest = inject<Harvest>(LU_MODAL_DATA);
	readonly varietyNames = varietyNames;

	readonly title = 'Supprimer la récolte ?';
	readonly submitLabel = 'Supprimer la récolte';
	readonly submitPalette = 'critical';
	readonly submitAction = () => true as const;
}
