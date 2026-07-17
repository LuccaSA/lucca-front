import type { Rule } from '@angular-devkit/schematics';
import { currentSchematicContext, DeprecatedMapper, SchematicContextOpts } from '../lib';

// Nx need to see "@angular-devkit/schematics" in order to run this migration correctly (see https://github.com/nrwl/nx/blob/d9fed4b832bf01d1b9a44ae9e486a5e5cd2d2253/packages/nx/src/command-line/migrate/migrate.ts#L1729-L1738)
// eslint-disable-next-line @typescript-eslint/no-require-imports
require('@angular-devkit/schematics');

export default (options: SchematicContextOpts): Rule => {
	return async (tree, context) => {
		await currentSchematicContext.init(context, options);

		new DeprecatedMapper(tree, {
			modules: {
				// LuDateModule
				LuDatePickerModule: 'LuDatePickerComponent',
				LuDateSelectInputModule: 'LuDateSelectInputComponent',
				LuDateAdapterModule: 'LuDateAdapterPipe',
				// LuApiModule
				LuApiSelectInputModule: 'LuApiSelectInputComponent',
				// LuDropdownModule
				LuDropdownPanelModule: 'LuDropdownPanelComponent',
				LuDropdownItemModule: 'LuDropdownItemDirective',
				LuDropdownTriggerModule: 'LuDropdownTriggerDirective',
				// LuDepartmentModule
				LuDepartmentSelectInputModule: 'LuDepartmentSelectInputComponent',
				// LuEstablishmentModule
				LuEstablishmentSelectInputModule: 'LuEstablishmentSelectInputComponent',
				// LuUserModule
				LuUserSelectInputModule: 'LuUserSelectInputComponent',
				LuUserDisplayModule: 'LuUserDisplayPipe',
				LuUserPictureModule: 'LuUserPictureComponent',
				LuUserTileModule: 'LuUserTileComponent',
				LuUserMeOptionModule: 'LuUserMeOptionDirective',
				LuUserSearcherModule: 'LuUserPagedSearcherComponent',
				// LuOptionModule
				LuOptionItemModule: 'LuOptionItemComponent',
				LuOptionFeederModule: 'LuOptionFeederComponent',
				LuOptionPagerModule: 'LuOptionPagerComponent',
				LuOptionSearcherModule: 'LuOptionSearcherComponent',
				LuOptionSelectAllModule: 'LuOptionSelectAllComponent',
				LuForOptionsModule: 'LuForOptionsDirective',
				// LuTreeOptionModule
				LuTreeOptionItemModule: 'LuTreeOptionItemComponent',
				LuTreeOptionFeederModule: 'LuTreeOptionFeederComponent',
				LuForTreeOptionsModule: 'LuForTreeOptionsDirective',
				LuTreeOptionSearcherModule: 'LuTreeOptionSearcherComponent',
				// LuPopoverModule
				LuPopoverPanelModule: 'LuPopoverPanelComponent',
				// LuTooltipModule
				LuTooltipTriggerModule: 'LuTooltipTriggerDirective',
				// LuInputModule
				LuInputClearerModule: 'LuInputClearerComponent',
				LuInputDisplayerModule: 'LuInputDisplayerDirective',
				// NgModules simples
				LuToastsModule: 'LuToastsComponent',
				LuNumberModule: 'LuNumberPipe',
				LuScrollModule: 'LuScrollDirective',
				LuSafeContentModule: 'LuSafeHtmlPipe',
			},
			types: {
				ILuTranslation: 'LuTranslation',
			},
			inputsOutputs: {
				'lu-divider': { withRole: '' },
				'button': { delete: 'critical' },
				'lu-loading': { type: { fullpage: 'fullPage' } },
				'lu-single-file-upload': { illustration: { paper: 'invoice' }, size: { 'S': 'L' } },
				'lu-multi-file-upload': { size: { 'S': 'L' } },
				'lu-file-entry': { size: { 'S': 'L' } },
				'lu-file-dropzone': { size: { 'S': 'L' } },
				'lu-highlight-data': { icon: { 'manifying-glass': 'magnifying-glass' } },
			},
		}).run();
	};
};
