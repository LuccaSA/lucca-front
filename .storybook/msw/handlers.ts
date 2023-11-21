import { delay, http, HttpResponse } from 'msw';
import { mockAxisSectionsV3, mockDepartmentsTree, mockEstablishments, mockEstablishmentsCount, mockGenericCount, mockJobQualifications, mockMe, mockProjectUsers, mockUsers } from './mocks';

export const handlers = [
	http.get('/organization/structure/api/legal-units', async () => {
		await delay(300);
		return HttpResponse.json(mockGenericCount);
	}),

	http.get('/organization/structure/api/establishments', async ({ request }) => {
		await delay(300);
		const url = new URL(request.url);
		if (url.searchParams.get('fields.root') === 'count') {
			// Need to cast so the type inference won't screw up
			return HttpResponse.json(mockEstablishmentsCount) as any;
		}

		const pageParam = url.searchParams.get('page');
		const page = pageParam ? parseInt(pageParam) : 1;
		const limitParam = url.searchParams.get('limit');
		const limit = limitParam ? parseInt(limitParam) : 10;
		const legalUnitId = url.searchParams.get('legalUnitId');
		const search = url.searchParams.get('search');

		let items = mockEstablishments;
		if (search) {
			items = mockEstablishments.filter((e) => e.name.toLowerCase().includes(search.toLowerCase()));
		}
		if (legalUnitId) {
			items = mockEstablishments.filter((e) => e.legalUnitId === +legalUnitId) ?? [];
		}

		items = items.slice((page - 1) * limit, page * limit);

		return HttpResponse.json({ items });
	}),

	http.get('/organization/structure/api/job-qualifications', async ({ request }) => {
		await delay(300);
		const url = new URL(request.url);
		const search = url.searchParams.get('search');

		return HttpResponse.json(search ? [mockJobQualifications[0]] : mockJobQualifications);
	}),

	http.get('/api/v3/departments/tree', async () => {
		await delay(300);
		return HttpResponse.json({
			data: {
				node: null,
				children: mockDepartmentsTree,
			},
			metadata: null,
		});
	}),

	http.get('/api/v3/axisSections', async ({ request }) => {
		await delay(300);
		const url = new URL(request.url);
		const page = url.searchParams.get('paging');
		const name = url.searchParams.get('name');

		const pageSize = page ? parseInt(page.split(',')[1]) : 10;
		const startIndex = page ? parseInt(page.split(',')[0]) : 0;
		const clue = name ? decodeURIComponent(name.replace('like,', '')) : '';

		return HttpResponse.json({
			data: {
				items: mockAxisSectionsV3.filter((as) => as.name.toLowerCase().includes(clue.toLowerCase())).slice(startIndex, startIndex + pageSize),
			},
		});
	}),

	http.get('/timmi-project/api/projectusers/search', async () => {
		await delay(300);
		return HttpResponse.json(mockProjectUsers);
	}),

	http.get('/api/v3/users/me', async () => {
		await delay(300);
		return HttpResponse.json(mockMe);
	}),

	http.get('/api/v3/users/scopedsearch', async () => {
		await delay(300);
		return HttpResponse.json(mockUsers);
	}),

	http.get('/api/v3/users', async ({ request }) => {
		await delay(300);
		const url = new URL(request.url);
		// hard coded
		if (url.searchParams.get('id') === '21,59') {
			// Need to cast so the type inference won't screw up
			return HttpResponse.json({
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
			}) as any;
		}

		return HttpResponse.json(mockUsers);
	}),

	http.get('/api/v3/users/search', async () => {
		await delay(300);
		return HttpResponse.json(mockUsers);
	}),
];
