import { computed, Directive } from '@angular/core';
import { LuCoreSelectUsersDirective, provideCoreSelectUsersContext } from '@lucca-front/ng/core-select/user';
import { Gardener } from './harvest-planning.data';
import { gardenersUrl } from './harvest-planning.handlers';

/**
 * People select of the scenario. Consuming applications extend the users directive this way to plug
 * their own people API, so the scenario goes through the same extension points rather than `[url]`.
 */
@Directive({
	selector: 'lu-simple-select[gardeners],lu-multi-select[gardeners]',
	exportAs: 'luGardeners',
	providers: [provideCoreSelectUsersContext(() => GardenersDirective)],
})
export class GardenersDirective extends LuCoreSelectUsersDirective<Gardener> {
	protected override readonly defaultUrl = computed(() => gardenersUrl);
}
