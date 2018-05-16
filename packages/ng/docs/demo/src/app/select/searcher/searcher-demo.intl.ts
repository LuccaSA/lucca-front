import { LuSelectSearchIntl } from '@core';

export function getOverrideLuSelectSearchIntl(): LuSelectSearchIntl {
	const luSelectSearchIntl = new LuSelectSearchIntl();
	luSelectSearchIntl.noResultsLabel = 'Aucun résultat';
	return luSelectSearchIntl;
}
