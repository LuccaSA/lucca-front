import type { Rule } from '@angular-devkit/schematics';
import { CssMapper } from '../lib/css-mapper';
import { currentSchematicContext, SchematicContextOpts } from '../lib/lf-schematic-context';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

export default (options?: SchematicContextOpts): Rule => {

	return async (tree, context) => {
		await currentSchematicContext.init(context, options);

		await new CssMapper(
			tree,
			{
				classes: {
					'pr-u-textProduct': 'pr-u-colorTextProduct',
					'pr-u-textPrimary': 'pr-u-colorTextProduct',
					'pr-u-textSecondary': 'pr-u-colorTextProduct',
					'pr-u-textBrand': 'pr-u-colorTextBrand',
					'pr-u-textLucca': 'pr-u-colorTextBrand',
					'pr-u-textPlaceholder': 'pr-u-colorInputTextPlaceholder',
					'pr-u-textNeutral': 'pr-u-colorText',
					'pr-u-textDefault': 'pr-u-colorText',
					'pr-u-textGrey': 'pr-u-colorText',
					'pr-u-textLight': 'pr-u-colorTextSubtle',
					'pr-u-textSuccess': 'pr-u-colorTextSuccess',
					'pr-u-textWarning': 'pr-u-colorTextWarning',
					'pr-u-textCritical': 'pr-u-colorTextCritical',
					'pr-u-textError': 'pr-u-colorTextCritical',
					'pr-u-textSuccessContrasted': 'pr-u-colorTextSuccessContrasted',
					'pr-u-textWarningContrasted': 'pr-u-colorTextWarningContrasted',
					'pr-u-textBrandContrasted': 'pr-u-colorTextBrandContrasted',
					'pr-u-textNavigation': 'pr-u-colorTextNavigation',
					'pr-u-textAI': 'pr-u-colorTextAI',
					'pr-u-textPagga': 'pr-u-colorTextPagga',
					'pr-u-textPoplee': 'pr-u-colorTextPoplee',
					'pr-u-textCoreHR': 'pr-u-colorTextCoreHR',
					'pr-u-textTimmi': 'pr-u-colorTextTimmi',
					'pr-u-textCleemy': 'pr-u-colorTextCleemy',
					'pr-u-textCc': 'pr-u-colorTextCc',
					'pr-u-textKiwi': 'pr-u-colorTextKiwi',
					'pr-u-textLime': 'pr-u-colorTextLime',
					'pr-u-textCucumber': 'pr-u-colorTextCucumber',
					'pr-u-textMint': 'pr-u-colorTextMint',
					'pr-u-textGlacier': 'pr-u-colorTextGlacier',
					'pr-u-textLagoon': 'pr-u-colorTextLagoon',
					'pr-u-textBlueberry': 'pr-u-colorTextBlueberry',
					'pr-u-textLavender': 'pr-u-colorTextLavender',
					'pr-u-textGrape': 'pr-u-colorTextGrape',
					'pr-u-textWatermelon': 'pr-u-colorTextWatermelon',
					'pr-u-textPumpkin': 'pr-u-colorTextPumpkin',
					'pr-u-textPineapple': 'pr-u-colorTextPineapple',
				},
				variables: {},
				mixins: {}
			},
			{}
		).run();
	};
};
