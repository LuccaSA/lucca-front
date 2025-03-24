import { booleanAttribute, Component, ElementRef, HostBinding, input, OnInit, signal, viewChild, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-read-more',
	standalone: true,
	templateUrl: './read-more.component.html',
	styleUrls: ['./read-more.component.scss'],
	encapsulation: ViewEncapsulation.None,

	host: {
		class: 'readMore',
	},
})
export class ReadMoreComponent implements OnInit {
	lineClamp = input<number>(5);
	openOnly = input(false, { transform: booleanAttribute });
	surface = input<null | 'sunken' | 'raised' | string>(null);

	label = signal<string>('Lire plus');
	labelToggle = 'Lire moins';

	textFlowRef = viewChild<ElementRef<HTMLDivElement>>('textFlow');

	expanded = signal(false);
	isClamped = signal(false);

	@HostBinding('style.--components-readMore-lineClamp') get lines() {
		return this.lineClamp();
	}

	@HostBinding('style.--components-readMore-textFlow-lastChild-content') get labelText() {
		return `"${this.labelToggle}"`;
	}

	@HostBinding('class.is-disabled') get isDisabled() {
		return !this.expanded() && !this.isClamped();
	}

	@HostBinding('class.mod-openOnly') get isOpenOnly() {
		return this.openOnly();
	}

	@HostBinding('class.mod-sunken') get surfaceSunken() {
		return this.surface() === 'sunken';
	}

	@HostBinding('class.mod-raised') get surfaceRaised() {
		return this.surface() === 'raised';
	}

	@HostBinding('style.--components-readMore-link-backgroudColor') get backgroundColor() {
		if (this.surface() === 'sunken' || this.surface() === 'raised' || this.surface() === null) {
			return null;
		}
		return `${this.surface()}`;
	}

	ngOnInit(): void {
		new ResizeObserver(() => {
			const textFlowElement = this.textFlowRef()?.nativeElement;

			this.isClamped.set(textFlowElement.scrollHeight > textFlowElement.clientHeight);
		}).observe(this.textFlowRef().nativeElement);
	}

	toggleExpanded() {
		this.expanded.set(!this.expanded());

		if (this.expanded()) {
			this.label.set(this.labelToggle);
		} else {
			this.label.set('Lire plus');
		}
	}
}
