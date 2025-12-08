import { NgTemplateOutlet } from '@angular/common';
import { booleanAttribute, Component, input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-footer',
	styleUrl: './footer.component.scss',
	templateUrl: './footer.component.html',
	encapsulation: ViewEncapsulation.None,
	imports: [NgTemplateOutlet],
})
export class FooterComponent {
	sticky = input(false, { transform: booleanAttribute });
	container = input(false, { transform: booleanAttribute });
	forceNarrow = input(false, { transform: booleanAttribute });
	dialog = input(false, { transform: booleanAttribute });
	narrowAtMediaMax = input<'XXS' | 'XS' | 'S' | 'M'>('XXS');

	get breakpointClass() {
		if (this.forceNarrow()) {
			return 'mod-narrow';
		}
		return {
			[`mod-narrowAtMediaMax${this.narrowAtMediaMax()}`]: !!this.narrowAtMediaMax(),
		};
	}
}
