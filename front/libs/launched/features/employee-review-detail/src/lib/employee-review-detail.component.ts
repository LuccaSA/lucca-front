import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, LuDialogService, provideLuDialog } from '@lucca-front/ng/dialog';
import { DimensionAssessmentDialogComponent } from '@launched/dimension-assessment';

@Component({
	selector: 'lib-employee-review-detail',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, ButtonComponent],
	providers: [provideLuDialog()],
	templateUrl: './employee-review-detail.html',
})
export class EmployeeReviewDetailComponent {
	readonly #dialog = inject(LuDialogService);

	openDimensionAssessment(): void {
		this.#dialog.open({
			content: DimensionAssessmentDialogComponent,
		});
	}
}
