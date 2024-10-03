import type { SchematicContext } from '@angular-devkit/schematics';
import { spawnSync } from 'child_process';

export function installLocalDependencies(context: SchematicContext): void {
	context.logger.info('Installing dependencies...');

	try {
		spawnSync('npm', ['ci'], {
			cwd: __dirname,
		});
		context.logger.info('Installing dependencies... Done!');
	} catch (e) {
		// eslint-disable-next-line
		context.logger.error('Failed to install dependencies', (e as any).toString());
	}
}
