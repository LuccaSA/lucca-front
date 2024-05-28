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
					'u-margin{tshirt}': 'pr-u-margin{tshirt}',
					'u-marginTop{tshirt}': 'pr-u-marginTop{tshirt}',
					'u-marginBottom{tshirt}': 'pr-u-marginBottom{tshirt}',
					'u-marginLeft{tshirt}': 'pr-u-marginLeft{tshirt}',
					'u-marginRight{tshirt}': 'pr-u-marginRight{tshirt}',
					'u-marginInline{tshirt}': 'pr-u-marginInline{tshirt}',
					'u-marginBlock{tshirt}': 'pr-u-marginBlock{tshirt}',
					'u-padding{tshirt}': 'pr-u-padding{tshirt}',
					'u-paddingTop{tshirt}': 'pr-u-paddingTop{tshirt}',
					'u-paddingBottom{tshirt}': 'pr-u-paddingBottom{tshirt}',
					'u-paddingLeft{tshirt}': 'pr-u-paddingLeft{tshirt}',
					'u-paddingRight{tshirt}': 'pr-u-paddingRight{tshirt}',
					'u-paddingInline{tshirt}': 'pr-u-paddingInline{tshirt}',
					'u-paddingBlock{tshirt}': 'pr-u-paddingBlock{tshirt}',
					'u-gap{tshirt}': 'pr-u-gap{tshirt}',
					'u-rowGap{tshirt}': 'pr-u-rowGap{tshirt}',
					'u-columnGap{tshirt}': 'pr-u-columnGap{tshirt}',
				},
				variables: {
					'--spacings-{tshirt}': `--pr-t-spacings-{tshirt}`,
				},
				mixins: {},
			},
			{
				tshirt: {
					Auto: 'Auto',
					0: '0',
					XXS: '50',
					XS: '100',
					S: '200',
					M: '300',
					L: '400',
					XL: '600',
					XXL: '800',
				},
			},
		).run();
	};
};
