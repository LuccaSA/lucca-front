import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { NgIf } from '@angular/common';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-icon',
	standalone: true,
	imports: [NgIf],
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class IconComponent {
	@Input({ required: true })
	icon: LuccaIcon;

	@Input({ required: true })
	alt: string;

	@Input()
	size: 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

	@Input()
	color: 'primary' | 'secondary' | 'error' | 'warning' | 'success' | 'light' | 'placeholder' | 'inherit' = 'inherit';
}
