import { HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, signal } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { Subject } from 'rxjs';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrl: './tooltip-panel.component.scss',
	host: {
		role: 'tooltip',
		'[attr.id]': 'id',
		'(mouseenter)': 'mouseEnter$.next()',
		'(mouseleave)': 'mouseLeave$.next()',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuTooltipPanelComponent {
	readonly destroyRef = inject(DestroyRef);

	readonly mouseEnter$ = new Subject<void>();
	readonly mouseLeave$ = new Subject<void>();

	readonly content = signal<string | SafeHtml | null>(null);

	readonly id = signal<string>(null);

	readonly contentPositionClasses = signal<Record<string, boolean>>({});

	setPanelPosition(posX: HorizontalConnectionPos, posY: VerticalConnectionPos): void {
		this.contentPositionClasses.set({
			'is-before': posX === 'end',
			'is-after': posX === 'start',
			'is-above': posY === 'bottom',
			'is-below': posY === 'top',
		});
	}
}
