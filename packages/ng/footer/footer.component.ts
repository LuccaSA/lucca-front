import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-footer',
	styleUrl: './footer.component.scss',
	templateUrl: './footer.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FooterComponent {
	readonly sticky = input(false, { transform: booleanAttribute });
	readonly container = input(false, { transform: booleanAttribute });
	readonly forceNarrow = input(false, { transform: booleanAttribute });
	readonly dialog = input(false, { transform: booleanAttribute });
	readonly narrowAtMediaMax = input<'XXS' | 'XS' | 'S' | 'M'>('XXS');

	readonly breakpointClass = computed(() => (this.forceNarrow() ? 'mod-narrow' : { [`mod-narrowAtMediaMax${this.narrowAtMediaMax()}`]: !!this.narrowAtMediaMax() }));
}
