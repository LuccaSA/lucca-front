import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { DialogCloseDirective, DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent } from '@lucca-front/ng/dialog';

@Component({
	selector: 'lib-dimension-assessment-dialog',
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [DialogComponent, DialogHeaderComponent, DialogContentComponent, DialogFooterComponent, DialogCloseDirective, ButtonComponent],
	template: `
		<lu-dialog stacked>
			<lu-dialog-header>
				<h1>Evaluer une dimension</h1>
			</lu-dialog-header>
			<lu-dialog-content></lu-dialog-content>
			<lu-dialog-footer>
				<div class="footer-actions">
					<button type="button" luButton luDialogClose>Confirmer</button>
				</div>
			</lu-dialog-footer>
		</lu-dialog>
	`,
})
export class DimensionAssessmentDialogComponent {}
