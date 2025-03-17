/* eslint-disable no-console */
import { SchematicContext } from '@angular-devkit/schematics';
import { installLocalDependencies } from './local-deps/installer';

// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
export type AngularCompilerLib = typeof import('@angular/compiler');

export interface SchematicContextOpts {
	dryRun?: boolean;
	skipInstall?: boolean;
	verbose?: boolean;
}

type Required<T> = {
	// TIL You can remove optional modifier from properties using -?
	[P in keyof T]-?: T[P];
};

const defaultSchematicContextOpts: Required<SchematicContextOpts> = {
	dryRun: false,
	skipInstall: false,
	verbose: false
};

export class LfSchematicContext {
	dryRun = false;

	skipInstall = false;

	verbose = false;

	// Can't use JS private here because it creates a conflict with CommonJS and await import
	private _angularCompiler!: AngularCompilerLib;

	async init(context: SchematicContext, opts?: SchematicContextOpts): Promise<void> {
		if (opts) {
			this.dryRun = opts.dryRun ?? defaultSchematicContextOpts.dryRun;
			this.skipInstall = opts.skipInstall ?? defaultSchematicContextOpts.skipInstall;
			this.verbose = opts.verbose ?? defaultSchematicContextOpts.verbose;
		}
		if (!this.skipInstall) {
			installLocalDependencies(context);
		}
		this._angularCompiler = await import('@angular/compiler');
	}

	get angularCompiler(): AngularCompilerLib {
		if (!this._angularCompiler) {
			throw new Error('Angular compiler library not initialized, make sure to call init() before using it.');
		}
		return this._angularCompiler;
	}

	error(message: string): void {
		console.error(message);
	}

	warn(message: string): void {
		console.warn(message);
	}

	logSuccess(message: string): void {
		if (this.verbose) {
			console.log(`\x1b[36m${message}\x1b[0m`);
		}
	}

	logFailure(message: string): void {
		if (this.verbose) {
			console.log(`\x1b[31m${message}\x1b[0m`);
		}
	}
}

export const currentSchematicContext = new LfSchematicContext();
