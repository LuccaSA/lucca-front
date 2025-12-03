import { ChangeDetectionStrategy, Component, HostBinding, input, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-fancy-box',
	templateUrl: './fancy-box.component.html',
	styleUrl: './fancy-box.component.scss',
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'fancyBox',
		'[class.mod-S]': 'size() === "S"',
	},
})
export class FancyBoxComponent {
	@Input()
	foreground?: string;
	@HostBinding('style.--components-fancyBox-foreground')
	get foregroundStyle(): string {
		return this.foreground ? `url(${this.foreground})` : ``;
	}

	@Input({ required: true })
	backgroundLeft: string;
	@HostBinding('style.--components-fancyBox-background-left')
	get backgroundLeftStyle(): string {
		return this.backgroundLeft ? `url(${this.backgroundLeft})` : ``;
	}

	@Input({ required: true })
	backgroundRight: string;
	@HostBinding('style.--components-fancyBox-background-right')
	get backgroundRightStyle(): string {
		return this.backgroundRight ? `url(${this.backgroundRight})` : ``;
	}

	size = input<null | 'S'>(null);
}
