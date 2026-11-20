import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ILuModalContent, LU_MODAL_DATA } from '@lucca-front/ng/modal';
import { Harvest } from './harvest-planning.data';

/**
 * Delete confirmation, still written against the legacy `LuModal` API as many screens of consuming
 * applications are: `LuModal.open()` renders it through the dialog adapter.
 */
@Component({
	selector: 'sb-harvest-delete',
	template: `La récolte de {{ harvest.varieties[0].name }} sur la parcelle {{ harvest.plot.name }} sera supprimée du planning.`,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HarvestDeleteComponent implements ILuModalContent<true> {
	readonly harvest = inject<Harvest>(LU_MODAL_DATA);

	readonly title = 'Supprimer la récolte ?';
	readonly submitLabel = 'Supprimer';
	readonly submitPalette = 'critical';
	readonly submitAction = () => true as const;
}
