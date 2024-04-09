import type { Rule } from '@angular-devkit/schematics';
import { spawnSync } from 'child_process';
import * as path from 'path';
import { CssMapper } from '../lib/css-mapper';

export default (options?: { skipInstallation?: boolean }): Rule => {
	const skipInstallation = options?.skipInstallation ?? false;

	return async (tree, context) => {
		if (!skipInstallation) {
			context.logger.info('Installing dependencies...');

			try {
				spawnSync('npm', ['ci'], {
					cwd: path.join(__dirname, '../../lib/local-deps'),
				});
				context.logger.info('Installing dependencies... Done!');
			} catch (e) {
				// eslint-disable-next-line
				context.logger.error('Failed to install dependencies', (e as any).toString());
			}
		}

		await new CssMapper(
			tree,
			{
				classes: {
					'palette-grey': 'palette-neutral',
					'palette-primary': 'palette-product',
					'palette-secondary': 'palette-product',
					'palette-lucca': 'palette-brand',
				},
				variables: {
					'--palettes-grey-{val}': `--palettes-neutral-{val}`,
					'--palettes-primary-{val}': `--palettes-product-{val}`,
					'--palettes-secondary-{val}': `--palettes-product-{val}`,
					'--palettes-lucca-{val}': `--palettes-brand-{val}`,
					'--colors-grey-{val}': `--colors-neutral-{val}`,
				},
				mixins: {},
			},
			{
				val: {
					25: '25',
					50: '50',
					100: '100',
					200: '200',
					300: '300',
					400: '400',
					500: '500',
					600: '600',
					700: '700',
					800: '800',
					900: '900',
				},
			},
		).run();
	};
};
