import { NgClass } from '@angular/common';
import { booleanAttribute, ChangeDetectionStrategy, Component, computed, effect, HostBinding, inject, input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LuClass } from '@lucca-front/ng/core';
import { IconComponent } from '@lucca-front/ng/icon';
@Component({
	selector: 'lu-highlight-data',
	standalone: true,
	templateUrl: './highlight-data.component.html',
	styleUrls: ['./highlight-data.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, NgClass, RouterLink],
	providers: [LuClass],
	host: {
		class: 'highlightData',
	},
})
export class HighlightDataComponent {
	#luClass = inject(LuClass);
	/**
	 * ...
	 */
	heading = input.required<string>();
	value = input.required<string>();
	bubble = input<'01' | '02' | '03' | 'O4'>();
	theme = input<'white' | 'light' | 'dark'>('white');

	bubbleTheme = computed(() => {
		if (this.theme() === 'dark') {
			return 'dark';
		}
		return 'light';
	});

	@HostBinding('class.mod-light')
	get lightClass() {
		return this.theme() === 'light';
	}

	@HostBinding('class.mod-dark')
	get darkClass() {
		return this.theme() === 'dark';
	}

	illustration = input<
		'calculator' | 'calendar' | 'cleemy-card' | 'coffee' | 'headphone' | 'mail' | 'manifying-glass' | 'medallon' | 'piggy-bank' | 'polaroid-female' | 'polaroid-male' | 'polaroids'
	>();
	size = input<'S' | 'M' | null>(null);
	infos = input(false, { transform: booleanAttribute });

	constructor() {
		effect(() => {
			this.#luClass.setState({
				[`mod-${this.size()}`]: !!this.size(),
				'mod-infos': this.infos(),
			});
		});
	}

	// @Input()
	// /**
	//  * Which size should the callout be? Defaults to medium
	//  */
	// size: 'M' | 'L' = 'M';
	// @Input()
	// /**
	//  * Which palette should be used for the entire callout.
	//  * Defaults to none (inherits parent palette)
	//  */
	// palette: Palette | DecorativePalette = 'none';
	// @Input({ transform: booleanAttribute })
	// /**
	//  * Should display be outlined?
	//  */
	// outlined = false;
	// @Input()
	// /**
	//  * For routerLink usage
	//  */
	// link: string;
	// @Input()
	// /**
	//  * Which icon should we display in the callout if any?
	//  * Defaults to no icon.
	//  */
	// icon: LuccaIcon | undefined;
	// get highlightDataClasses() {
	// 	return {
	// 		[`mod-${this.theme}`]: !!this.theme,
	// 		//[`palette-${this.palette}`]: !!this.palette,
	// 	};
	// }
}
