import { LuSelectIntl } from '../../../../src/app/select/';

export function getOverrideLuSelectIntl(): LuSelectIntl {
	const luSelectIntl = new LuSelectIntl();
	luSelectIntl.allTypeLabel = 'colors';
	luSelectIntl.typeLabel = 'Colors';
	luSelectIntl.noLabel = 'No colors';
	return luSelectIntl;
}
