import { ChangeDetectionStrategy, Component, HostBinding, Input, ViewEncapsulation } from '@angular/core';

@Component({
	selector: 'lu-fancy-box',
	standalone: true,
	templateUrl: './fancy-box.component.html',
	styleUrls: ['./fancy-box.component.scss'],
	changeDetection: ChangeDetectionStrategy.OnPush,
	encapsulation: ViewEncapsulation.None,
	host: {
		class: 'fancyBox',
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
	backgroundRight?: string;
	@HostBinding('style.--components-fancyBox-background-right')
	get backgroundRightStyle(): string {
		return this.backgroundRight ? `url(${this.backgroundRight})` : ``;
	}
}
