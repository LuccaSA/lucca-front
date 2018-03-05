import {LuSelectSearchIntl} from '../../../../src/app/select/searcher/';

import {Injectable} from '@angular/core';

export function getOverrideLuSelectSearchIntl(): LuSelectSearchIntl {
	const luSelectSearchIntl = new LuSelectSearchIntl();
	luSelectSearchIntl.noResultsLabel = 'Aucun résultat';
	return luSelectSearchIntl;
}
