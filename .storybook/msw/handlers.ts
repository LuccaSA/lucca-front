import { rest } from 'msw';
import { mockAxisSectionsV3, mockDepartmentsTree, mockEstablishments, mockEstablishmentsCount, mockGenericCount, mockJobQualifications, mockMe, mockProjectUsers, mockUsers } from './mocks';

export const handlers = [
	rest.get('/organization/structure/api/legal-units', (_, res, ctx) => res(ctx.delay(300), ctx.json(mockGenericCount))),

	rest.get('/organization/structure/api/establishments', (req, res, ctx) => {
		if (req.url.searchParams.get('fields.root') === 'count') {
			return res(ctx.delay(300), ctx.json(mockEstablishmentsCount));
		}

		const page = req.url.searchParams.get('page');
		const legalUnitId = req.url.searchParams.get('legalUnitId');
		const search = req.url.searchParams.get('search');

		let items = [];
		if (!page || page === '1') {
			if (search) {
				items = [mockEstablishments[0]];
			} else if (legalUnitId) {
				items = mockEstablishments.filter((e) => e.legalUnitId === +legalUnitId) ?? [];
			} else {
				items = mockEstablishments;
			}
		}

		return res(
			ctx.delay(300),
			ctx.json({
				items,
			}),
		);
	}),

	rest.get('/organization/structure/api/job-qualifications', (req, res, ctx) => {
		const search = req.url.searchParams.get('search');

		return res(
			ctx.delay(300),
			ctx.json({
				items: search ? [mockJobQualifications[0]] : mockJobQualifications,
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

	rest.get('/api/v3/axisSections', (req, res, ctx) => {
		const page = req.url.searchParams.get('paging');
		const name = req.url.searchParams.get('name');

		const pageSize = page ? parseInt(page.split(',')[1]) : 10;
		const startIndex = page ? parseInt(page.split(',')[0]) : 0;
		const clue = name ? decodeURIComponent(name.replace('like,', '')) : '';

		return res(
			ctx.delay(300),
			ctx.json({
				data: {
					items: mockAxisSectionsV3.filter((as) => as.name.toLowerCase().includes(clue.toLowerCase())).slice(startIndex, startIndex + pageSize),
				},
			}),
		);
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
