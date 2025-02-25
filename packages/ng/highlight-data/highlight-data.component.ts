import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, HostBinding, input, Input, ViewEncapsulation } from '@angular/core';
import { RouterLink } from '@angular/router';
import { IconComponent } from '@lucca-front/ng/icon';
@Component({
	selector: 'lu-highlight-data',
	standalone: true,
	templateUrl: './highlight-data.component.html',
	styleUrls: ['./highlight-data.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	imports: [IconComponent, NgClass, RouterLink],

	host: {
		class: 'highlightData',
	},
})
export class HighlightDataComponent {
	@Input({ required: true })
	heading: string;

	@Input()
	/**
	 * ...
	 */
	bubble: '01' | '02' | '03' | 'O4';

	/**
	 * ...
	 */
	theme = input<'white' | 'light' | 'dark'>('white');

	@HostBinding('class.mod-light')
	get lightClass() {
		return this.theme() === 'light';
	}

	@HostBinding('class.mod-dark')
	get darkClass() {
		return this.theme() === 'dark';
	}

	@Input()
	/**
	 * ...
	 */
	illustration: 'calculator' | 'calendar' | 'cleemy-card' | 'coffee' | 'headphone' | 'mail' | 'manifying-glass' | 'medallon' | 'piggy-bank' | 'polaroid-female' | 'polaroid-male' | 'polaroids';

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
	get highlightDataClasses() {
		return {
			[`mod-${this.theme}`]: !!this.theme,
			//[`palette-${this.palette}`]: !!this.palette,
		};
	}
}
