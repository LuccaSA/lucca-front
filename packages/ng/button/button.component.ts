import { booleanAttribute, ChangeDetectionStrategy, Component, ContentChild, ElementRef, inject, Input, OnChanges, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luButton],a[luButton]',
	standalone: true,
	providers: [LuClass],
	template: '<ng-content></ng-content>',
	styleUrls: ['./button.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
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

	@Input({
		transform: booleanAttribute,
	})
	delete = false;

	@Input({
		transform: booleanAttribute,
	})
	disclosure = false;

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
			childNodes.filter((node: HTMLElement) => {
				return node.nodeName !== '#comment' && node.nodeName.toLowerCase() !== 'lu-icon' && !node?.className?.includes('u-mask');
			}).length == 0;
		return !!this.#iconComponentRef && noSpan && noText;
	}

	private get iconOnLeft(): boolean {
		return this.#iconComponentRef?.nativeElement === this.#elementRef?.nativeElement?.firstChild;
	}

	private get iconOnRight(): boolean {
		return this.#iconComponentRef?.nativeElement === this.#elementRef?.nativeElement?.lastChild;
	}

	ngOnChanges(): void {
		this.updateClasses();
	}

	updateClasses(): void {
		const classesConfig = {
			[`mod-${this.size}`]: !!this.size,
			[`mod-block`]: this.block,
			[`palette-${this.palette}`]: !!this.palette,
			[`is-${this.state}`]: !!this.state,
			['mod-onlyIcon']: this.iconOnly,
			['mod-iconOnLeft']: this.iconOnLeft,
			['mod-iconOnRight']: this.iconOnRight,
			['mod-withIcon']: this.#iconComponentRef !== undefined && !this.disclosure && !this.iconOnly,
			['mod-delete']: this.delete,
			['mod-disclosure']: this.disclosure,
		};

		if (this.luButton !== '') {
			if (this.luButton === 'text-invert') {
				classesConfig['mod-text'] = true;
				classesConfig['mod-invert'] = true;
			} else {
				classesConfig[`mod-${this.luButton}`] = true;
			}
		}
		this.#luClass.setState(classesConfig);
	}
}
