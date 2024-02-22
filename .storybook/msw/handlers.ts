import { delay, http, HttpResponse } from 'msw';
import { applyFilter, applyV3Paging, applyV4Paging, genericHandler, handleFieldsRoot } from './helpers';
import { mockAxisSectionsV3, mockDepartmentsTree, mockEstablishments, mockJobQualifications, mockLegalUnits, mockMe, mockProjectUsers, mockUsers } from './mocks';

const usersSearchHandler = genericHandler(
	mockUsers,
	// Get and parse params from query params
	{
		paging: (p) => p,
		search: (search) => search.toLowerCase(),
		id: (ids) => ids.split(',').map((id) => parseInt(id)),
	},
	// Apply filters to items
	{
		paging: applyV3Paging,
		search: applyFilter((user, { search }) => `${user.firstName} ${user.lastName}`.includes(search)),
		id: applyFilter((user, { id }) => id.includes(user.id)),
	},
	(items) => ({
		data: {
			items: items.map((item) => ({ relevance: 1, item })),
		},
	}),
);

export const handlers = [
	http.get(
		'/organization/structure/api/legal-units',
		genericHandler(
			mockLegalUnits,
			// Get and parse params from query params
			{
				page: (p) => parseInt(p),
				limit: (l) => parseInt(l),
				search: (s) => s.toLowerCase(),
				'fields.root': (f) => f,
			},
			// Apply filters to items
			{
				page: applyV4Paging,
				limit: (items, { limit }) => items.slice(0, limit),
				search: applyFilter((lu, { search }) => lu.name.toLowerCase().includes(search)),
			},
			handleFieldsRoot(mockLegalUnits.length),
		),
	),

	http.get(
		'/organization/structure/api/establishments',
		genericHandler(
			mockEstablishments,
			// Get and parse params from query params
			{
				page: (p) => parseInt(p),
				limit: (l) => parseInt(l),
				legalUnitId: (l) => parseInt(l),
				search: (s) => s.toLowerCase(),
				'fields.root': (f) => f,
			},
			// Apply filters to items
			{
				page: applyV4Paging,
				limit: (items, { limit }) => items.slice(0, limit),
				legalUnitId: (items, { legalUnitId }) => items.filter((e) => e.legalUnitId === legalUnitId),
				search: applyFilter((e, { search }) => e.name.toLowerCase().includes(search)),
			},
			handleFieldsRoot(mockEstablishments.length),
		),
	),

	http.get(
		'/organization/structure/api/job-qualifications',
		genericHandler(
			mockJobQualifications,
			// Get and parse params from query params
			{
				page: (p) => parseInt(p),
				limit: (l) => parseInt(l),
				search: (s) => s.toLowerCase(),
				'fields.root': (f) => f,
			},
			// Apply filters to items
			{
				page: applyV4Paging,
				search: applyFilter((jq, { search }) => jq.name.toLowerCase().includes(search)),
				limit: (items, { limit }) => items.slice(0, limit),
			},
			handleFieldsRoot(mockJobQualifications.length),
		),
	),

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

	http.get(
		'/api/v3/axisSections',
		genericHandler(
			mockAxisSectionsV3,
			// Get and parse params from query params
			{
				paging: (p) => p,
				name: (n) => decodeURIComponent(n.replace('like,', '')),
			},
			// Apply filters to items
			{
				paging: applyV3Paging,
				name: applyFilter((as, { name }) => as.name.toLowerCase().includes(name.toLowerCase())),
			},
			(items) => ({ data: { items } }),
		),
	),

	http.get(
		'/timmi-project/api/projectusers/search',
		genericHandler(
			mockProjectUsers,
			// Get and parse params from query params
			{
				paging: (p) => p,
				search: (s) => s.toLowerCase(),
			},
			// Apply filters to items
			{
				paging: applyV3Paging,
				search: applyFilter((user, { search }) => `${user.firstName} ${user.lastName}`.includes(search)),
			},
			(items) => ({ data: { items } }),
		),
	),

	http.get('/api/v3/users/me', async () => {
		await delay(300);
		return HttpResponse.json(mockMe);
	}),

	http.get('/api/v3/users/scopedsearch', usersSearchHandler),

	http.get(
		'/api/v3/users',
		genericHandler(
			mockUsers,
			// Get and parse params from query params
			{
				paging: (p) => p,
				id: (ids) => ids.split(',').map((id) => parseInt(id)),
			},
			// Apply filters to items
			{
				paging: applyV3Paging,
				id: applyFilter((user, { id }) => id.includes(user.id)),
			},
			(items) => ({ data: { items } }),
		),
	),

	http.get('/api/v3/users/search', usersSearchHandler),
];
