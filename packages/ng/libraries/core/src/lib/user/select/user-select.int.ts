import { LuSelectIntl } from '../../select/index';

export function getOverrideLuSelectIntl(): LuSelectIntl {
	const luSelectIntl = new LuSelectIntl();
	luSelectIntl.allTypeLabel = 'the users';
	luSelectIntl.typeLabel = 'users';
	return luSelectIntl;
}
