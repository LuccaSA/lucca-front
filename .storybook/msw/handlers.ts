import { rest } from 'msw';
import { mockDepartmentsTree, mockEstablishments, mockGenericCount } from './mocks';

export const handlers = [
	rest.get('/organization/structure/api/legal-units', (_, res, ctx) => res(ctx.delay(300), ctx.json(mockGenericCount))),

	rest.get('/organization/structure/api/establishments', (req, res, ctx) => {
		if (req.url.searchParams['fields.root'] === 'count') {
			return res(ctx.delay(300), ctx.json(mockGenericCount));
		}

		const search = req.url.searchParams.get('search');

		return res(
			ctx.delay(300),
			ctx.json({
				items: search ? [mockEstablishments[0]] : mockEstablishments,
			}),
		);
	}),

	rest.get('/api/v3/departments/tree', (_req, res, ctx) => {
		return res(
			ctx.delay(300),
			ctx.json({
				data: {
					node: null,
					children: mockDepartmentsTree,
				},
				metadata: null,
			}),
		);
	}),
];
