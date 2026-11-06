import { vi } from 'vitest';
import { isMacPlatform } from './kbd.utils';

describe('kbd utils', () => {
	describe('isMacPlatform', () => {
		afterEach(() => vi.restoreAllMocks());

		it('should detect a Mac', () => {
			// Arrange
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7)');

			// Act
			const result = isMacPlatform();

			// Assert
			expect(result).toBe(true);
		});

		it('should detect an iPhone or an iPad', () => {
			// Arrange
			const userAgent = vi.spyOn(navigator, 'userAgent', 'get');

			// Act
			userAgent.mockReturnValue('Mozilla/5.0 (iPhone; CPU iPhone OS 17_0 like Mac OS X)');
			const iPhone = isMacPlatform();
			userAgent.mockReturnValue('Mozilla/5.0 (iPad; CPU OS 17_0 like Mac OS X)');
			const iPad = isMacPlatform();

			// Assert
			expect([iPhone, iPad]).toEqual([true, true]);
		});

		it('should not detect a Mac on Windows', () => {
			// Arrange
			vi.spyOn(navigator, 'userAgent', 'get').mockReturnValue('Mozilla/5.0 (Windows NT 10.0; Win64; x64)');

			// Act
			const result = isMacPlatform();

			// Assert
			expect(result).toBe(false);
		});
	});
});
