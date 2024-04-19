import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, HostListener, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { luTransformTooltip } from '../animation';
import { Subject } from 'rxjs';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrls: ['./tooltip-panel.component.scss'],
	animations: [luTransformTooltip],
	standalone: true,
	host: {
		role: 'tooltip',
		class: 'lu-tooltip-panel',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuTooltipPanelComponent {
	@HostBinding('@transformTooltip')
	animationState = 'enter';

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

	content: string | SafeHtml;

	@HostBinding('attr.id')
	id: string;
}
