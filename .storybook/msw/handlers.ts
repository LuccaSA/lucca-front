import { rest } from 'msw';
import { mockAxisSectionsV3, mockDepartmentsTree, mockEstablishments, mockGenericCount, mockMe, mockProjectUsers, mockUsers } from './mocks';

export const handlers = [
	rest.get('/organization/structure/api/legal-units', (_, res, ctx) => res(ctx.delay(300), ctx.json(mockGenericCount))),

	rest.get('/organization/structure/api/establishments', (req, res, ctx) => {
		if (req.url.searchParams.get('fields.root') === 'count') {
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

	rest.get('/api/v3/axisSections', (_req, res, ctx) => {
		return res(ctx.delay(300), ctx.json(mockAxisSectionsV3));
	}),

	rest.get('/timmi-project/api/projectusers/search', (_req, res, ctx) => {
		return res(ctx.delay(300), ctx.json(mockProjectUsers));
	}),

	rest.get('/api/v3/users/me', (_req, res, ctx) => {
		return res(ctx.delay(300), ctx.json(mockMe));
	}),

	rest.get('/api/v3/users/scopedsearch', (req, res, ctx) => {
		return res(ctx.delay(300), ctx.json(mockUsers));
	}),

	rest.get('/api/v3/users', (req, res, ctx) => {
		// hard coded
		if (req.url.searchParams.get('id') === '21,59') {
			console.log('coucou');
			return res(
				ctx.delay(300),
				ctx.json({
					data: {
						items: [
							{
								id: 21,
								department: {
									name: 'Commercial',
								},
							},
							{
								id: 59,
								department: {
									name: 'Support',
								},
							},
						],
					},
				}),
			);
		}

		return res(ctx.delay(300), ctx.json(mockUsers));
	}),

	rest.get('/api/v3/users/search', (req, res, ctx) => {
		return res(ctx.delay(300), ctx.json(mockUsers));
	}),
];
