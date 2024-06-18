import { delay, http, HttpResponse } from 'msw';
import { applyFilter, applyV3Paging, applyV4Paging, applyV4Sorting, genericHandler, handleFieldsRoot } from './helpers';
import { mockAxisSectionsV3, mockDepartmentsTree, mockEstablishments, mockJobQualifications, mockLegalUnits, mockMe, mockProjectUsers, mockUserPopover, mockUsers } from './mocks';

const usersSearchHandler = genericHandler(
	mockUsers,
	// Get and parse params from query params
	{
		paging: (p) => p,
		clue: (clue) => clue.toLowerCase(),
		id: (ids) => ids.split(',').map((id) => parseInt(id)),
	},
	{
		// Apply filters to items
		clue: applyFilter((user, { clue }) => `${user.firstName.toLowerCase()} ${user.lastName.toLowerCase()}`.includes(clue)),
		id: applyFilter((user, { id }) => id.includes(user.id)),
		// Then paging/limiting
		paging: applyV3Paging,
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
				sort: (s) => s,
				'fields.root': (f) => f,
			},
			{
				// Apply filters to items
				search: applyFilter((lu, { search }) => lu.name.toLowerCase().includes(search)),
				// Then sorting
				sort: (items, { sort }) => applyV4Sorting(items, sort),
				// Then paging/limiting
				page: applyV4Paging,
				limit: (items, { limit }) => items.slice(0, limit),
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
				sort: (s) => s,
				'fields.root': (f) => f,
			},
			{
				// Apply filters to items
				legalUnitId: (items, { legalUnitId }) => items.filter((e) => e.legalUnitId === legalUnitId),
				search: applyFilter((e, { search }) => e.name.toLowerCase().includes(search)),
				// Then sorting
				sort: (items, { sort }) => applyV4Sorting(items, sort),
				// Then paging/limiting
				page: applyV4Paging,
				limit: (items, { limit }) => items.slice(0, limit),
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
				sort: (s) => s,
				'fields.root': (f) => f,
			},
			{
				// Apply filters to items
				search: applyFilter((jq, { search }) => jq.name.toLowerCase().includes(search)),
				// Then sorting
				sort: (items, { sort }) => applyV4Sorting(items, sort),
				// Then paging/limiting
				page: applyV4Paging,
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
			{
				// Apply filters to items
				name: applyFilter((as, { name }) => as.name.toLowerCase().includes(name.toLowerCase())),
				// Then paging/limiting
				paging: applyV3Paging,
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
			{
				// Apply filters to items
				search: applyFilter((user, { search }) => `${user.firstName} ${user.lastName}`.includes(search)),
				// Then paging/limiting
				paging: applyV3Paging,
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
			{
				// Apply filters to items
				id: applyFilter((user, { id }) => id.includes(user.id)),
				// Then paging/limiting
				paging: applyV3Paging,
			},
			(items) => ({ data: { items } }),
		),
	),

	http.get('/api/v3/users/search', usersSearchHandler),
	http.get('/work-locations/api/employee-profile-card/:id', async () => {
		await delay(300);
		return HttpResponse.json(mockUserPopover);
	}),

	http.get('/lucca-banner/meta/api/feature-flag-statuses/user-popover-is-activated', async () => {
		await delay(300);
		return HttpResponse.json({ key: 'user-popover-is-activated', status: 'Enabled' });
	}),
	http.get(
		'/api/legumes',
		genericHandler(
			[
				{ id: 1, name: 'Carotte', color: 'orange' },
				{ id: 2, name: 'Haricot', color: 'green' },
				{ id: 3, name: 'Poireau', color: 'white' },
				{ id: 4, name: 'Radis', color: 'red' },
				{ id: 5, name: 'Salade', color: 'green' },
			],
			// Get and parse params from query params
			{
				page: (p) => parseInt(p),
				limit: (l) => parseInt(l),
				search: (s) => s.toLowerCase(),
			},
			{
				// Apply filters to items
				search: applyFilter((legume, { search }) => legume.name.toLowerCase().includes(search)),
				// Then paging/limiting
				page: applyV4Paging,
				limit: (items, { limit }) => items.slice(0, limit),
			},
			(items) => ({ items }),
		),
	),
];
