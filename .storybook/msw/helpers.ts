import { HttpResponse, delay, http } from 'msw';

export type Modifier<T, TAllParams> = (entity: T, allParams: TAllParams) => T;

export type AllParsedParams<T extends Record<string, (param: string) => unknown>> = {
	[K in keyof T]: ReturnType<T[K]>;
};

export function genericHandler<T, TRawParams extends Record<string, (param: string) => unknown>>(
	baseResponse: T,
	parserByQueryParam: TRawParams,
	modifierByQueryParam: { [K in keyof TRawParams]?: Modifier<T, AllParsedParams<TRawParams>> },
	buildResponse: (items: T, allParams: AllParsedParams<TRawParams>) => unknown,
): Parameters<typeof http.get>[1] {
	return async ({ request }) => {
		await delay(300);
		const url = new URL(request.url);
		let entities = baseResponse;
		let allParams: Record<string, unknown> = {};

		for (const [paramKey, parserFn] of Object.entries(parserByQueryParam)) {
			if (!url.searchParams.has(paramKey)) {
				continue;
			}
			allParams[paramKey] = parserFn(url.searchParams.get(paramKey)!);
		}

		for (const [paramName, paramValue] of Object.entries(allParams)) {
			// Typing is a bit tricky here, the public typings of this method is OK though
			entities = modifierByQueryParam[paramName]?.(entities, allParams as AllParsedParams<TRawParams>);
		}

		return HttpResponse.json(buildResponse(entities, allParams as AllParsedParams<TRawParams>));
	};
}

export function applyV3Paging<T>(items: T[], { paging }: { paging: string }): T[] {
	const [offset, pageSize] = paging.split(',').map((v) => parseInt(v));
	return items.slice(offset, offset + pageSize);
}

export function applyV4Paging<T>(items: T[], { page, limit }: { page: number; limit: number }): T[] {
	limit ??= 10;
	return items.slice((page - 1) * limit, page * limit);
}

export function applyV4Sorting<T>(items: T[], by: string): T[] {
	const bys = by.split(',');
	const selector = (item: T, by: string) => {
		const path = by.split('.');
		let value: unknown = item;
		for (const p of path) {
			const prop = Object.keys(value).find((k) => k.toLowerCase() === p.toLowerCase());
			value = value && prop ? value[prop] : value;
		}
		return value;
	};

	return items
		.map((item) => ({
			item,
			sorting: bys.map((by) => selector(item, by)).join('__'),
		}))
		.sort((a, b) => a.sorting.localeCompare(b.sorting))
		.map((a) => a.item);
}

export function applyFilter<T, TParam>(predicate: (item: T, filterValue: TParam) => boolean): (items: T[], filterValue: TParam) => T[] {
	return (items, filterValue) => items.filter((item) => predicate(item, filterValue));
}

export function handleFieldsRoot<T>(count: number): (items: T[], params: { 'fields.root'?: string }) => { items: T[]; count?: number } {
	return (items, { 'fields.root': fieldsRoot }) => ({ items, ...(fieldsRoot?.includes('count') ? { count } : {}) });
}
