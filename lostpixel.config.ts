import type { CustomProjectConfig } from 'lost-pixel';
import { chromium } from 'playwright-core';

export const config: CustomProjectConfig = {
	browserLaunchOptions: {
		chromium: {
			executablePath: chromium.executablePath(),
			headless: false,
			args: ['--headless'],
		},
	},
	storybookShots: {
		storybookUrl: './storybook-static',
	},
	imagePathBaseline: './baseline-images',
	imagePathCurrent: './current-images',
	imagePathDifference: './difference-images',
	generateOnly: true,
	shotConcurrency: 10,
};
