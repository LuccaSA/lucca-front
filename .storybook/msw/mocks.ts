export const mockGenericCount = { items: [], count: 3 };
export const mockEstablishments = [
	{
		id: 3,
		name: 'Lucca USA',
		code: 'LUCCA_USA',
		legalUnitId: 3,
		legalUnit: { id: 3, name: 'Demo Ux1 - US', code: 'DEMO_UX1_US' },
		legalIdentificationNumber: null,
		activityCode: null,
		calendarId: null,
		address: null,
		timeZoneId: 'America/New_York',
		usersCount: 0,
		createdAt: '2020-08-13T22:23:09.59',
		isArchived: false,
	},
	{
		id: 1,
		name: 'Lucca FR',
		code: 'Lucca FR',
		legalUnitId: 1,
		legalUnit: { id: 1, name: 'Lucca FR', code: 'Lucca FR' },
		legalIdentificationNumber: null,
		activityCode: null,
		calendarId: 52,
		address: null,
		timeZoneId: 'Europe/Paris',
		usersCount: 40,
		createdAt: '2020-08-13T22:23:09.59',
		isArchived: false,
	},
	{
		id: 2,
		name: 'Lucca UK',
		code: 'LUCCA_UK',
		legalUnitId: 2,
		legalUnit: { id: 2, name: 'Lucca UK', code: 'LUCCA_UK' },
		legalIdentificationNumber: null,
		activityCode: null,
		calendarId: 13,
		address: null,
		timeZoneId: 'Europe/London',
		usersCount: 11,
		createdAt: '2020-08-13T22:23:09.59',
		isArchived: false,
	},
];
export const mockDepartmentsTree = [
	{
		node: { id: 17, name: 'Lucca France' },
		children: [
			{
				node: { id: 14, name: 'Administration' },
				children: [
					{ node: { id: 8, name: 'Comptabilité / Finances' }, children: [] },
					{ node: { id: 11, name: 'Secrétariat' }, children: [] },
				],
			},
			{ node: { id: 13, name: 'Direction commerciale' }, children: [] },
			{ node: { id: 12, name: 'R&D' }, children: [] },
			{ node: { id: 6, name: 'SAV' }, children: [] },
			{ node: { id: 7, name: 'Production' }, children: [] },
		],
	},
	{
		node: { id: 18, name: 'Lucca UK' },
		children: [
			{ node: { id: 10, name: 'Commercial' }, children: [] },
			{ node: { id: 9, name: 'Support' }, children: [] },
		],
	},
];
