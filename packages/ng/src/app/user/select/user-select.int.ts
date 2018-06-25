import { LuSelectIntl } from '../../../../src/app/select/';

export function getOverrideLuSelectIntl(): LuSelectIntl {
	const luSelectIntl = new LuSelectIntl();
	luSelectIntl.allTypeLabel = 'the users';
	luSelectIntl.typeLabel = 'users';
	return luSelectIntl;
}
