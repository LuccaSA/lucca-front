import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, injectDialogData } from '@lucca-front/ng/dialog';
import { ApprobationInboxDetailComponent } from '../approbation-inbox-detail/approbation-inbox-detail.component';
import { NgTemplateOutlet } from '@angular/common';
import { ContainerComponent } from '../../../container/container.component';

@Component({
	selector: 'lu-approbation-inbox-detail-dialog',
	imports: [DialogComponent, DialogContentComponent, DialogFooterComponent, DialogHeaderComponent, NgTemplateOutlet, ContainerComponent],
	templateUrl: './approbation-inbox-detail-dialog.component.html',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ApprobationInboxDetailDialogComponent {
	dialogData = injectDialogData<{ detailsRef: ApprobationInboxDetailComponent }>();
}
