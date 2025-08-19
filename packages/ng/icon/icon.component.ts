import { NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, input, ViewEncapsulation } from '@angular/core';
import { LuccaIcon } from '@lucca-front/icons';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';

@Component({
	selector: 'lu-icon',
	standalone: true,
	imports: [NgClass, LuSafeExternalSvgPipe, HttpClientModule],
	templateUrl: './icon.component.html',
	styleUrls: ['./icon.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
})
export class IconComponent {
	icon = input<LuccaIcon>();
	alt = input<string | null>(null);
	size = input<'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL' | null>(null);
	color = input<'primary' | 'secondary' | 'product' | 'error' | 'warning' | 'success' | 'light' | 'placeholder' | 'inherit'>('inherit');

	get iconClasses() {
		return {
			[`mod-${this.size()}`]: !!this.size(),
		};
	}
}
