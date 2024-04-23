import { HorizontalConnectionPos, VerticalConnectionPos } from '@angular/cdk/overlay';
import { ChangeDetectionStrategy, Component, DestroyRef, HostBinding, HostListener, inject } from '@angular/core';
import { SafeHtml } from '@angular/platform-browser';
import { LuClass } from '@lucca-front/ng/core';
import { Subject } from 'rxjs';

@Component({
	selector: 'lu-tooltip-panel',
	templateUrl: './tooltip-panel.component.html',
	styleUrls: ['./tooltip-panel.component.scss'],
	standalone: true,
	providers: [LuClass],
	host: {
		role: 'tooltip',
		class: 'lu-tooltip-panel',
	},
	changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LuTooltipPanelComponent {
	#luClass = inject(LuClass);

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

	setPanelPosition(posX: HorizontalConnectionPos, posY: VerticalConnectionPos): void {
		this.#luClass.setState({
			'is-before': posX === 'end',
			'is-after': posX === 'start',
			'is-above': posY === 'bottom',
			'is-below': posY === 'top',
		});
	}
}
