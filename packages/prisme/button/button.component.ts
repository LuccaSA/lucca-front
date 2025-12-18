import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, Input, input, signal, ViewEncapsulation } from '@angular/core';
import { Palette, PrClass } from '@lucca/prisme/core';
import { IconComponent } from '@lucca/prisme/icon';
import { Palette, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[prButton],a[prButton],button[luButton],a[luButton]',
	providers: [PrClass],
	template: '<ng-content />',
	styleUrl: './button.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'button',
		'[class.is-error]': 'notifyError()',
		'(click)': 'triggerErrorIfNeeded()',
		'(animationend)': 'notifyError.set(false)',
	},
})
export class ButtonComponent {
	#prClass = inject(PrClass);
	#elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

	readonly notifyError = signal(false);

	readonly size = input<'M' | 'S' | 'XS'>();

	readonly block = input(false, { transform: booleanAttribute });

	readonly critical = input(false, { transform: booleanAttribute });

	readonly delete = input(false, { transform: booleanAttribute });

	readonly disclosure = input(false, { transform: booleanAttribute });

	readonly palette = input<Palette>('none');

	readonly state = input<'default' | 'loading' | 'error' | 'success'>('default');

	@Input({
		alias: 'luButton',
	})
	set luButton(value: this['prButton']) {
		this.prButton = value;
	}

	/**
	 * '' is the default value when you just set the `prButton` directive without a value attached to it.
	 * We just make this explicit here.
	 */
	readonly prButton = input<'' | 'outlined' | 'AI' | 'ghost' | 'ghost-invert' | 'text' | 'text-invert'>('');

	readonly iconComponentRef = contentChild<IconComponent, ElementRef<HTMLElement>>(IconComponent, { read: ElementRef });

	readonly classesConfig = computed(() => {
		const config = {
			[`mod-${this.size()}`]: !!this.size(),
			[`mod-block`]: this.block(),
			[`palette-${this.palette()}`]: !!this.palette(),
			[`is-${this.state()}`]: !!this.state() && this.state() !== 'error',
			['mod-onlyIcon']: this.iconOnly,
			['mod-iconOnLeft']: this.iconOnLeft,
			['mod-iconOnRight']: this.iconOnRight,
			['mod-withIcon']: this.iconComponentRef() !== undefined && !this.disclosure() && !this.iconOnly,
			['mod-critical']: this.critical() || this.delete(),
			['mod-disclosure']: this.disclosure(),
		};

		if (this.luButton() !== '') {
			if (this.luButton() === 'ghost-invert') {
				config['mod-ghost'] = true;
				config['mod-invert'] = true;
			} else {
				config[`mod-${this.luButton()}`] = true;
			}
		}
		return config;
	});

	private get iconOnly(): boolean {
		const childNodes = Array.from(this.#elementRef?.nativeElement?.childNodes || []);
		const noText = childNodes.every(({ nodeName }) => nodeName !== '#text');
		// ignore icon and comment
		const noSpan =
			childNodes.filter((node: HTMLElement) => {
				return node.nodeName !== '#comment' && node.nodeName.toLowerCase() !== 'lu-icon' && !node?.className?.includes('mask');
			}).length == 0;
		return !!this.iconComponentRef() && noSpan && noText;
	}

	private get iconOnLeft(): boolean {
		return this.iconComponentRef()?.nativeElement === this.#elementRef?.nativeElement?.firstChild;
	}

	private get iconOnRight(): boolean {
		return this.iconComponentRef()?.nativeElement === this.#elementRef?.nativeElement?.lastChild;
	}

	constructor() {
		ɵeffectWithDeps([this.state], (state) => {
			if (state) {
				this.triggerErrorIfNeeded();
			}
		});

		ɵeffectWithDeps([this.classesConfig], (config) => {
			if (config) {
				this.#luClass.setState(config);
			}
		});
	}

	triggerErrorIfNeeded(): void {
		if (this.state() === 'error') {
			this.notifyError.set(true);
		}
	}
}
