import { NgIf } from '@angular/common';
import { ChangeDetectionStrategy, Component, Input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';

@Component({
	selector: 'lu-icon',
	standalone: true,
	imports: [NgIf],
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
	@Input({ required: true })
	icon: LuccaIcon;

	@Input()
	alt: string;

	@Input()
	size: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

	@Input()
	color: 'primary' | 'secondary' | 'product' | 'error' | 'warning' | 'success' | 'light' | 'placeholder' | 'inherit' = 'inherit';
}
