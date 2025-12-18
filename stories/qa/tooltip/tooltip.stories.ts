import { AsyncPipe, DecimalPipe } from '@angular/common';
import { ChangeDetectionStrategy, Component } from '@angular/core';
import { provideAnimations } from '@angular/platform-browser/animations';
import { ButtonComponent } from '@lucca-front/ng/button';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';
import { BehaviorSubject, combineLatest, map, shareReplay, switchMap, timer } from 'rxjs';

@Component({
	selector: 'tooltip-stories',
	standalone: true,
	imports: [LuTooltipModule, ButtonComponent, AsyncPipe, DecimalPipe],
	template: `
		<p>Ellapsed: {{ (timer$ | async) / 10 | number: '1.1-1' }}s</p>
		<p>Blocked time: {{ (diff$ | async) / 1000 | number: '1.1-1' }}s</p>

		<button luButton type="button" (click)="toggleDisplay()">Toggle dislay</button>

		@if (displayed) {
			@for (cell of cells; track $index) {
				<div class="ellipsis width200" luTooltip luTooltipWhenEllipsis>{{ cell }}</div>
			}
		}
	`,
	styles: [
		`
			.ellipsis {
				text-overflow: ellipsis;
				display: block;
				overflow: hidden;
				white-space: nowrap;
			}

			.width200 {
				inline-size: 200px;
			}

			:host {
				display: block;
			}

			[tabindex='0'] {
				color: green;
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class TooltipStory {
	reset$ = new BehaviorSubject<void>(undefined);
	timer$ = this.reset$.pipe(
		switchMap(() => timer(0, 100)),
		shareReplay(1),
	);
	from$ = this.reset$.pipe(map(() => Date.now()));
	diff$ = combineLatest({ timer: this.timer$, from: this.from$ }).pipe(map(({ from, timer }) => Date.now() - from - 100 * timer));

	displayed = false;
	cells = new Array(1_000).fill(0).map((_, i) => 'a'.repeat((i + 1) % 100));

	toggleDisplay() {
		this.displayed = !this.displayed;
		this.reset$.next();
	}
}

export default {
	title: 'QA/Tooltip/Ellipsis tests',
	component: TooltipStory,
	decorators: [applicationConfig({ providers: [provideAnimations()] })],
} as Meta;

const template = (args: TooltipStory) => ({
	props: args,
});

export const Basic: StoryObj<TooltipStory> = {
	args: {},
	render: template,
};
