import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';
import { FooterComponent } from '@lucca-front/ng/footer';

@Component({
	selector: 'lu-dialog-footer',
	standalone: true,
	template: '<lu-footer dialog><ng-content /></lu-footer>',
	styleUrl: './dialog-footer.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [FooterComponent],
})
export class DialogFooterComponent {}
