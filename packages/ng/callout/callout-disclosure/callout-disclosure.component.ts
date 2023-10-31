import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IconComponent } from '../../icon/icon.component';
import { LuccaIcon } from '@lucca-front/icons';
import { Palette } from '../../core/type';

@Component({
	selector: 'lu-callout-disclosure',
	standalone: true,
	imports: [CommonModule, IconComponent],
	templateUrl: './callout-disclosure.component.html',
	styleUrls: ['./callout-disclosure.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CalloutDisclosureComponent {
	@Input()
	icon: LuccaIcon | null = 'signInfo';

	@Input({ required: true })
	heading: string;

	@Input()
	palette: Palette = 'none';

	@Input()
	size: 'M' | 'S' = 'M';
}
