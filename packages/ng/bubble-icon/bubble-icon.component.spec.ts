import { render, screen } from '@testing-library/angular';
import { LU_RANDOM } from '@lucca/prisme/core';
import { BubbleIconComponent } from './bubble-icon.component';
import { LU_BUBBLE_ICON_DEFAULT_DIRECTION } from './bubble-icon.token';

describe('BubbleIconComponent', () => {
	it('should draw the random direction from LU_RANDOM', async () => {
		await render(`<lu-bubble-icon icon="app" data-testid="bubble" />`, {
			imports: [BubbleIconComponent],
			providers: [{ provide: LU_RANDOM, useValue: () => 0.5 }],
		});

		expect(screen.getByTestId('bubble')).toHaveClass('mod-top');
	});

	it('should use the direction provided by LU_BUBBLE_ICON_DEFAULT_DIRECTION', async () => {
		await render(`<lu-bubble-icon icon="app" data-testid="bubble" />`, {
			imports: [BubbleIconComponent],
			providers: [{ provide: LU_BUBBLE_ICON_DEFAULT_DIRECTION, useValue: 'top' }],
		});

		expect(screen.getByTestId('bubble')).toHaveClass('mod-top');
	});

	it('should let the bubbleDirection input override the provided default', async () => {
		await render(`<lu-bubble-icon icon="app" bubbleDirection="right" data-testid="bubble" />`, {
			imports: [BubbleIconComponent],
			providers: [{ provide: LU_BUBBLE_ICON_DEFAULT_DIRECTION, useValue: 'top' }],
		});

		expect(screen.getByTestId('bubble')).toHaveClass('mod-right');
	});
});
