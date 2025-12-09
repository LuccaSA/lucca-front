import { HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { NgClass } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, HostListener, inject, Signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrl: './tooltip-panel.component.scss',
	host: {
		role: 'tooltip',
		'[attr.id]': 'id',
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
