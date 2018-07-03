import { LuSelectSearchIntl } from '@lucca-front/ng';

export function getOverrideLuSelectSearchIntl(): LuSelectSearchIntl {
	const luSelectSearchIntl = new LuSelectSearchIntl();
	luSelectSearchIntl.noResultsLabel = 'Aucun résultat';
	return luSelectSearchIntl;
}
