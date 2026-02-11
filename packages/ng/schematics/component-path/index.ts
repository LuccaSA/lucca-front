import type { Rule } from '@angular-devkit/schematics';
import { ComponentMapper, currentSchematicContext, SchematicContextOpts } from '../lib';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

export default (options: SchematicContextOpts): Rule => {
	return async (tree, context) => {
		await currentSchematicContext.init(context, options);

		new ComponentMapper(
			tree,
			{
				paths: {
					"@lucca-front/ng/scrollBox": "@lucca-front/ng/scroll-box",
					"@lucca-front/ng/segmentedControl": "@lucca-front/ng/segmented-control",
					"@lucca-front/ng/segmentedControlTabs": "@lucca-front/ng/segmented-control-tabs",
					"@lucca-front/ng/statusBadge": "@lucca-front/ng/status-badge"
				},
				components: {},
				selectors: {}
			}
		).run()
	}
}
