import { render, screen } from '@testing-library/angular';
import { LU_RANDOM } from '@lucca/prisme/core';
import { SkeletonCardComponent } from './skeleton-card.component';

describe('SkeletonCardComponent', () => {
	it('should compute the text widths from LU_RANDOM', async () => {
		await render(`<lu-skeleton-card />`, {
			imports: [SkeletonCardComponent],
			providers: [{ provide: LU_RANDOM, useValue: () => 0.5 }],
		});

		expect(screen.getByRole('heading').style.getPropertyValue('--components-skeleton-text-width')).toBe('49%');
	});
});
