import { ChangeDetectionStrategy, Component, input, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-fancy-box',
	templateUrl: './fancy-box.component.html',
	styleUrl: './fancy-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'fancyBox',
		'[class.mod-S]': 'size() === "S"',
		'[style.--components-fancyBox-foreground]': 'foreground ? `url(${this.foreground})` : ``',
		'[style.--components-fancyBox-background-left]': 'backgroundLeft ? `url(${this.backgroundLeft})` : ``',
		'[style.--components-fancyBox-background-right]': 'backgroundRight ? `url(${this.backgroundRight})` : ``',
	},
})
export class FancyBoxComponent {
	@Input()
	foreground?: string;

	@Input({ required: true })
	backgroundLeft: string;

	@Input({ required: true })
	backgroundRight: string;

	size = input<null | 'S'>(null);
}
