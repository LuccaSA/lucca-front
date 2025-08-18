import { NgClass } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, computed, Input, ViewEncapsulation } from '@angular/core';
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
	@Input({ required: true })
	icon: LuccaIcon;

	@Input()
	alt: string;

	@Input()
	size: 'XXS' | 'XS' | 'S' | 'M' | 'L' | 'XL' | 'XXL';

	@Input()
	color: 'primary' | 'secondary' | 'product' | 'error' | 'warning' | 'success' | 'light' | 'placeholder' | 'inherit' = 'inherit';

	get iconClasses() {
		return {
			[`mod-${this.size}`]: !!this.size,
		};
	}

	// iconUrl = computed(() => `https://cdn.lucca.fr/transverse/prisme/icons/svg/${this.icon}.svg`);

	iconUrl = computed(() => 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconpictureAction.svg');
}
