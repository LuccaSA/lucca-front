import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, inject, Input, OnChanges } from '@angular/core';
import { NgClazz, Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luButton],a[luButton]',
	standalone: true,
	hostDirectives: [NgClazz],
	template: '<ng-content></ng-content>',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'button',
	},
})
export class ButtonComponent implements OnChanges {
	#ngClazz = inject(NgClazz);
	#elementRef = inject(ElementRef);

	@Input()
	size: 'M' | 'S' | 'XS';

	@Input({
		transform: booleanAttribute,
	})
	block = false;

	@Input()
	palette: Palette = 'none';

	@Input()
	state: 'default' | 'loading' | 'error' | 'success' = 'default';

	@Input()
	/**
	 * '' is the default value when you just set the `luButton` directive without a value attached to it.
	 * We just make this explicit here.
	 */
	luButton: '' | 'outlined' | 'text' | 'text-invert' = '';

	#iconComponentRef?: ElementRef;

	@ContentChild(IconComponent, { read: ElementRef })
	set iconComponentRef(ref: ElementRef) {
		this.#iconComponentRef = ref;
		this.updateClasses();
	}

	private get iconOnly(): boolean {
		const listOfNode = Array.from((this.#elementRef?.nativeElement as HTMLButtonElement)?.childNodes || []);
		const noText = listOfNode.every((node) => node.nodeName !== '#text');
		// ignore icon and comment
		const noSpan =
			listOfNode.filter((node) => {
				return !(node.nodeName === '#comment' || (node as HTMLElement)?.tagName?.toLowerCase() === 'lu-icon');
			}).length == 0;
		return !!this.#iconComponentRef && noSpan && noText;
	}

	ngOnChanges(): void {
		this.updateClasses();
	}

	updateClasses(): void {
		const ngClassConfig = {
			[`mod-${this.size}`]: true,
			[`mod-block`]: this.block,
			[`palette-${this.palette}`]: true,
			[`is-${this.state}`]: true,
			['mod-onlyIcon']: this.iconOnly,
			['withIcon']: this.#iconComponentRef !== undefined,
		};

		if (this.luButton !== '') {
			if (this.luButton === 'text-invert') {
				ngClassConfig['mod-text'] = true;
				ngClassConfig['mod-invert'] = true;
			} else {
				ngClassConfig[`mod-${this.luButton}`] = true;
			}
		}
		this.#ngClazz.ngClass = ngClassConfig;
	}
}
