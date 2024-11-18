import { ChangeDetectionStrategy, Component, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-date-pill',
	standalone: true,
	imports: [],
	templateUrl: './date-pill.component.html',
	styleUrl: './date-pill.component.scss',
	encapsulation: ViewEncapsulation.None,
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatePillComponent {}
