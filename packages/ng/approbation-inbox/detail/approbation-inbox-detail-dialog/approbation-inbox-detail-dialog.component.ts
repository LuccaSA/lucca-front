import { NgTemplateOutlet } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { ContainerComponent } from '@lucca-front/ng/container';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, injectDialogData } from '@lucca-front/ng/dialog';
import { ApprobationInboxDetailComponent } from '../approbation-inbox-detail/approbation-inbox-detail.component';

@Component({
	selector: 'lu-approbation-inbox-detail-dialog',
	imports: [DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, NgTemplateOutlet, ContainerComponent],
	templateUrl: './approbation-inbox-detail-dialog.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailDialogComponent {
	dialogData = injectDialogData<{ detailsRef: ApprobationInboxDetailComponent }>();

	readonly label = input.required<string>();
}
