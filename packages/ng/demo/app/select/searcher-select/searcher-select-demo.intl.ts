import { LuSelectSearchIntl } from '../../../../src/app/select/';

export function getOverrideLuSelectSearchIntl(): LuSelectSearchIntl {
	const luSelectSearchIntl = new LuSelectSearchIntl();
	luSelectSearchIntl.noResultsLabel = 'Aucun résultat';
	return luSelectSearchIntl;
}
