import {LuSelectSearchIntl} from '../../../../src/app/select/searcher/';

export function getOverrideLuSelectSearchIntl(): LuSelectSearchIntl {
	const luSelectSearchIntl = new LuSelectSearchIntl();
	luSelectSearchIntl.noResultsLabel = 'Aucun résultat';
	return luSelectSearchIntl;
}
