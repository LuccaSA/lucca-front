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
export const mockAxisSectionsV3 = {
	data: {
		items: [
			{
				id: 19,
				name: 'Cleemy - Deezer',
			},
			{
				id: 36,
				name: 'Cleemy - LVMH',
			},
			{
				id: 27,
				name: 'Cleemy - Mazars',
			},
		],
	},
};
export const mockAxisSectionsV4 = {
	items: [
		{
			id: 7,
			name: 'Commercial Junior',
			usersCount: 0,
			job: {
				id: 3,
				name: 'Commercial',
				jobSectorId: 1,
				isActive: true,
			},
			level: {
				id: 1,
				position: 1,
				name: 'Grade 1',
				isActive: true,
				author: {
					fullName: 'Lucca Admin',
					id: 0,
					firstName: 'Lucca',
					lastName: 'Admin',
					url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
				},
				lastModifier: {
					fullName: 'Lucca Admin',
					id: 0,
					firstName: 'Lucca',
					lastName: 'Admin',
					url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
				},
				lastModifiedAt: '2021-09-23T17:38:47.9240628',
				createdAt: '2021-09-23T17:38:47.9240628',
			},
			isActive: true,
			author: {
				fullName: 'Lucca Admin',
				id: 0,
				firstName: 'Lucca',
				lastName: 'Admin',
				url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
			},
			lastModifier: {
				fullName: 'Lucca Admin',
				id: 0,
				firstName: 'Lucca',
				lastName: 'Admin',
				url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
			},
			lastModifiedAt: '2021-09-23T17:39:09.267815',
			createdAt: '2021-09-23T17:39:09.267815',
		},
		{
			id: 8,
			name: 'Commercial Intermédiaire',
			usersCount: 0,
			job: {
				id: 3,
				name: 'Commercial',
				jobSectorId: 1,
				isActive: true,
			},
			level: {
				id: 2,
				position: 2,
				name: 'Grade 2',
				isActive: true,
				author: {
					fullName: 'Lucca Admin',
					id: 0,
					firstName: 'Lucca',
					lastName: 'Admin',
					url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
				},
				lastModifier: {
					fullName: 'Lucca Admin',
					id: 0,
					firstName: 'Lucca',
					lastName: 'Admin',
					url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
				},
				lastModifiedAt: '2021-09-23T17:38:47.9240628',
				createdAt: '2021-09-23T17:38:47.9240628',
			},
			isActive: true,
			author: {
				fullName: 'Lucca Admin',
				id: 0,
				firstName: 'Lucca',
				lastName: 'Admin',
				url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
			},
			lastModifier: {
				fullName: 'Lucca Admin',
				id: 0,
				firstName: 'Lucca',
				lastName: 'Admin',
				url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
			},
			lastModifiedAt: '2021-09-23T17:39:09.267815',
			createdAt: '2021-09-23T17:39:09.267815',
		},
		{
			id: 9,
			name: 'Commercial Sénior',
			usersCount: 0,
			job: {
				id: 3,
				name: 'Commercial',
				jobSectorId: 1,
				isActive: true,
			},
			level: {
				id: 3,
				position: 3,
				name: 'Grade 3',
				isActive: true,
				author: {
					fullName: 'Lucca Admin',
					id: 0,
					firstName: 'Lucca',
					lastName: 'Admin',
					url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
				},
				lastModifier: {
					fullName: 'Lucca Admin',
					id: 0,
					firstName: 'Lucca',
					lastName: 'Admin',
					url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
				},
				lastModifiedAt: '2021-09-23T17:38:47.9240628',
				createdAt: '2021-09-23T17:38:47.9240628',
			},
			isActive: true,
			author: {
				fullName: 'Lucca Admin',
				id: 0,
				firstName: 'Lucca',
				lastName: 'Admin',
				url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
			},
			lastModifier: {
				fullName: 'Lucca Admin',
				id: 0,
				firstName: 'Lucca',
				lastName: 'Admin',
				url: 'https://demo-ux1.ilucca.net/api/v3/users/0',
			},
			lastModifiedAt: '2021-09-23T17:39:09.267815',
			createdAt: '2021-09-23T17:39:09.267815',
		},
	],
};

export const mockProjectUsers = {
	header: {
		generated: '2022-10-26T15:26:45.507374',
		principal: 'Api key - Prisme',
	},
	data: {
		items: [
			{
				id: 10,
				firstName: 'Peter',
				lastName: 'Benton',
			},
			{
				id: 11,
				firstName: 'Jessica',
				lastName: 'Berry',
			},
			{
				id: 14,
				firstName: 'Peter',
				lastName: 'Bowen',
			},
			{
				id: 17,
				firstName: 'Chloe',
				lastName: 'Brown',
			},
			{
				id: 18,
				firstName: 'John',
				lastName: 'Carter',
			},
			{
				id: 21,
				firstName: 'Adam',
				lastName: 'Cox',
			},
			{
				id: 59,
				firstName: 'Adam',
				lastName: 'Cox',
			},
			{
				id: 23,
				firstName: 'Katie',
				lastName: 'Curtis',
			},
			{
				id: 25,
				firstName: 'Alexander',
				lastName: 'Doherty',
			},
			{
				id: 26,
				firstName: 'Rebecca',
				lastName: 'Douglas',
			},
			{
				id: 30,
				firstName: 'Lilly',
				lastName: 'Evans',
			},
		],
	},
};

export const mockUsers = {
	data: {
		items: [
			{
				relevance: 0,
				item: {
					id: 6,
					firstName: 'Chloe',
					lastName: 'Alibert',
					picture: null,
				},
			},
			{
				relevance: 0,
				item: {
					id: 7,
					firstName: 'Marie-Françoise',
					lastName: 'Archer',
					picture: {
						href: 'https://demo-ux1.ilucca.net/getFile.ashx?id=e845a0ca-dbd9-452d-adc0-c873a847a37d',
					},
				},
			},
			{
				relevance: 0,
				item: {
					id: 49,
					firstName: 'Laurence',
					lastName: 'Atali',
					picture: null,
				},
			},
		],
	},
};

export const mockMe = {
	header: {
		generated: '2022-10-26T15:41:44.8925533',
		serverTime: 23,
		queryTime: 1,
		queryCount: 4,
		principal: 'Daniel Hernandez',
		processId: 2932,
	},
	data: {
		id: 35,
		firstName: 'Daniel',
		lastName: 'Hernandez',
		mail: 'dhernandez@example.org',
		culture: {
			code: 'fr-FR',
		},
	},
	metadata: null,
};
