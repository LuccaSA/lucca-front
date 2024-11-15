import { HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy,	Component,	DestroyRef,	HostBinding,	HostListener,	inject,	Signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { NgClass } from '@angular/common';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrls: ['./tooltip-panel.component.scss'],
	standalone: true,
	host: {
		role: 'tooltip',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
	imports: [NgClass],
})
export class LuTooltipPanelComponent {
	destroyRef = inject(DestroyRef);

	mouseEnter$ = new Subject<void>();

	@HostListener('mouseenter')
	mouseEnter(): void {
		this.mouseEnter$.next();
	}

	mouseLeave$ = new Subject<void>();

	@HostListener('mouseleave')
	mouseLeave(): void {
		this.mouseLeave$.next();
	}

	content: Signal<string | SafeHtml>;

	@HostBinding('attr.id')
	id: string;

	contentPositionClasses: Record<string, boolean> = {};

	setPanelPosition(posX: HorizontalConnectionPos, posY: VerticalConnectionPos): void {
		this.contentPositionClasses = {
			'is-before': posX === 'end',
			'is-after': posX === 'start',
			'is-above': posY === 'bottom',
			'is-below': posY === 'top',
		};
	}
}
