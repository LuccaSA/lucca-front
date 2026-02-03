import { booleanAttribute, ChangeDetectionStrategy, Component, computed, contentChild, ElementRef, inject, input, signal, ViewEncapsulation } from '@angular/core';
import { LuClass, Palette, ɵeffectWithDeps } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';

@Component({
	// eslint-disable-next-line @angular-eslint/component-selector
	selector: 'button[luButton],a[luButton]',
	providers: [LuClass],
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
	#luClass = inject(LuClass);
	#elementRef = inject<ElementRef<HTMLButtonElement>>(ElementRef);

	readonly notifyError = signal(false);

	/**
	 * Change the size of the Button
	 */
	readonly size = input<'M' | 'S' | 'XS'>();

	/**
	 * Apply block display
	 */
	readonly block = input(false, { transform: booleanAttribute });

	/**
	 * Indicates an action with significant or irreversible consequences on hover and focus. Only compatible with outlined and ghost
	 */
	readonly critical = input(false, { transform: booleanAttribute });

	/**
	 * @deprecated use `critical` input instead
	 */
	readonly delete = input(false, { transform: booleanAttribute });

	/**
	 * Indicates the presence of a menu
	 */
	readonly disclosure = input(false, { transform: booleanAttribute });

	/**
	 * Applies a color palette to the Button
	 */
	readonly palette = input<Palette>('none');

	/**
	 * Modifies the state of the Button
	 */
	readonly state = input<'default' | 'loading' | 'error' | 'success'>('default');

	/**
	 * '' is the default value when you just set the `luButton` directive without a value attached to it.
	 * We just make this explicit here.
	 */
	readonly luButton = input<'' | 'outlined' | 'AI' | 'AI-invert' | 'ghost' | 'ghost-invert' | 'text' | 'text-invert'>('');

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
			} else if (this.luButton() === 'AI-invert') {
				config['mod-AI'] = true;
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
