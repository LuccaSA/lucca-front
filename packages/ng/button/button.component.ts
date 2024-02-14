import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, inject, Input, OnChanges } from '@angular/core';
import { NgClazz, LuClass, Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luButton],a[luButton]',
	standalone: true,
	providers: [LuClass],
	template: '<ng-content></ng-content>',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	host: {
		class: 'button',
	},
})
export class ButtonComponent implements OnChanges {
	#luClass = inject(LuClass);
	#elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

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

	#iconComponentRef?: ElementRef<HTMLElement>;

	@ContentChild(IconComponent, { read: ElementRef<HTMLElement> })
	set iconComponentRef(ref: ElementRef<HTMLElement>) {
		this.#iconComponentRef = ref;
		this.updateClasses();
	}

	private get iconOnly(): boolean {
		const childNodes = Array.from(this.#elementRef?.nativeElement?.childNodes || []);
		const noText = childNodes.every(({ nodeName }) => nodeName !== '#text');
		// ignore icon and comment
		const noSpan =
			childNodes.filter(({ nodeName }) => {
				return nodeName !== '#comment' && nodeName.toLowerCase() !== 'lu-icon';
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
			['mod-withIcon']: this.#iconComponentRef !== undefined,
		};

		if (this.luButton !== '') {
			if (this.luButton === 'text-invert') {
				ngClassConfig['mod-text'] = true;
				ngClassConfig['mod-invert'] = true;
			} else {
				ngClassConfig[`mod-${this.luButton}`] = true;
			}
		}
		this.#luClass.setState(ngClassConfig);
	}
}
