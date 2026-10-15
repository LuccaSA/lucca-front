import { render, screen } from '@testing-library/angular';
import { LU_RANDOM } from '@lucca/prisme/core';
import { BubbleIconComponent } from './bubble-icon.component';

describe('BubbleIconComponent', () => {
	it('should draw the random direction from LU_RANDOM', async () => {
		await render(`<lu-bubble-icon icon="app" data-testid="bubble" />`, {
			imports: [BubbleIconComponent],
			providers: [{ provide: LU_RANDOM, useValue: () => 0.5 }],
		});

		expect(screen.getByTestId('bubble')).toHaveClass('mod-top');
	});
});
