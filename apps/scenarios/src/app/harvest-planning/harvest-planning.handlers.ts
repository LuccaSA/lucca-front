import { delay, http, HttpResponse } from 'msw';
import { Gardener, gardeners } from './harvest-planning.data';

export const gardenersUrl = '/api/gardeners';

const normalize = (value: string): string =>
	value
		.normalize('NFD')
		.replace(/\p{Diacritic}/gu, '')
		.toLowerCase();

/** Every word of the clue must start the first or the last name, accents and case ignored, like a people search API. */
function matchesClue(gardener: Gardener, clue: string): boolean {
	const names = [gardener.firstName, gardener.lastName].map(normalize);
	return normalize(clue)
		.split(' ')
		.filter(Boolean)
		.every((word) => names.some((name) => name.startsWith(word)));
}

/**
 * People search of the scenario, answering in the API v3 format the users select reads:
 * `clue`, `id` and `paging` (`offset,limit`) filters, `fields=collection.count` for the total count.
 */
export const harvestPlanningHandlers = [
	http.get(gardenersUrl, async ({ request }) => {
		await delay(150);
		const params = new URL(request.url).searchParams;
		const clue = params.get('clue');
		const ids = params.get('id')?.split(',').map(Number);

		let items = gardeners;
		if (ids) {
			items = items.filter((gardener) => ids.includes(gardener.id));
		}
		if (clue) {
			items = items.filter((gardener) => matchesClue(gardener, clue));
		}

		if (params.get('fields') === 'collection.count') {
			return HttpResponse.json({ data: { count: items.length } });
		}

		const [offset, limit] = (params.get('paging') ?? '0,20').split(',').map(Number);
		return HttpResponse.json({ data: { items: items.slice(offset, offset + limit).map((item) => ({ item })) } });
	}),
];
