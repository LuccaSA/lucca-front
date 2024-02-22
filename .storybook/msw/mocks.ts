export const mockGenericCount = { items: [], count: 3 };
export const mockEstablishmentsCount = { items: [], count: 4 };

const usCities = ['New York', 'Los Angeles', 'Chicago', 'Houston', 'Philadelphia', 'Phoenix', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
const frCities = ['Paris', 'Marseille', 'Lyon', 'Toulouse', 'Nice', 'Nantes', 'Strasbourg', 'Montpellier', 'Bordeaux', 'Lille'];

export const mockEstablishments = [
	...frCities.map((city, index) => ({
		id: index + 1,
		name: `Lucca ${city}`,
		code: `LUCCA_${city.toUpperCase()}`,
		legalUnitId: 1,
		legalUnit: { id: 1, name: 'Lucca FR', code: 'LUCCA_FR' },
		legalIdentificationNumber: null,
		activityCode: null,
		calendarId: 52,
		address: null,
		timeZoneId: 'Europe/Paris',
		usersCount: 40,
		createdAt: '2020-08-13T22:23:09.59',
		isArchived: false,
	})),
	...usCities.map((city, index) => ({
		id: index + frCities.length + 1,
		name: `Lucca ${city}`,
		code: `LUCCA_${city.toUpperCase()}`,
		legalUnitId: 3,
		legalUnit: { id: 2, name: 'Lucca US', code: 'LUCCA_US' },
		legalIdentificationNumber: null,
		activityCode: null,
		calendarId: null,
		address: null,
		timeZoneId: 'America/New_York',
		usersCount: 0,
		createdAt: '2020-08-13T22:23:09.59',
		isArchived: false,
	})),
];
export const mockLegalUnits = [
	{
		id: 1,
		name: 'Lucca FR',
		code: 'LUCCA_FR',
		countryId: 1,
	},
	{
		id: 2,
		name: 'Lucca US',
		code: 'LUCCA_US',
		countryId: 2,
	},
	{
		id: 3,
		name: 'Lucca UK',
		code: 'LUCCA_UK',
		countryId: 3,
	},
];
export const mockJobQualifications = [
	{
		id: 19,
		name: 'Sales manager',
		usersCount: 0,
		job: {
			id: 8,
			name: 'Technical sales engineer',
			jobSectorId: 2,
		},
		level: {
			id: 3,
			position: 3,
			name: 'Grade 3',
		},
	},
	{
		id: 20,
		name: 'Junior business developer',
		usersCount: 0,
		job: {
			id: 9,
			name: 'Business developer',
			jobSectorId: 2,
		},
		level: {
			id: 2,
			position: 2,
			name: 'Grade 2',
		},
	},
	{
		id: 21,
		name: 'Senior business developer',
		usersCount: 0,
		job: {
			id: 9,
			name: 'Business developer',
			jobSectorId: 2,
		},
		level: {
			id: 3,
			position: 3,
			name: 'Grade 3',
		},
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

const softs = ['Cleemy', 'Timmi', 'Pagga', 'Poplee', 'Talent', 'Engagement'];
const clients = ['Deezer', 'LVMH', 'Mazars', 'Orange', 'SFR', 'Sodexo', 'Vinci', 'Vivendi', 'Walmart', 'Wavestone', 'Wipro', 'Xerox', 'Zalando', 'Zara', 'Zurich'];

export const mockAxisSectionsV3 = softs
	.flatMap((soft) => clients.map((client) => `${soft} - ${client}`))
	.map((name, index) => ({
		id: index,
		name,
	}));

export const mockAxisSectionsV4 = [
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
];

export const mockProjectUsers = [
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
];

export const mockUsers = [
	{
		id: 6,
		firstName: 'Chloe',
		lastName: 'Alibert',
		picture: null,
		department: {
			id: 1,
			name: 'Direction',
		},
	},
	{
		id: 7,
		firstName: 'Marie-Françoise',
		lastName: 'Archer',
		picture: {
			href: 'https://demo-ux1.ilucca.net/getFile.ashx?id=e845a0ca-dbd9-452d-adc0-c873a847a37d',
		},
		department: {
			id: 1,
			name: 'Direction',
		},
	},
	{
		id: 49,
		firstName: 'Laurence',
		lastName: 'Atali',
		picture: null,
		department: {
			id: 2,
			name: 'Support',
		},
	},
	{
		id: 66,
		firstName: 'Chloe',
		lastName: 'Alibert',
		picture: null,
		department: {
			id: 3,
			name: 'Commercial',
		},
	},
];

export const mockMe = {
	id: 35,
	firstName: 'Daniel',
	lastName: 'Hernandez',
	mail: 'dhernandez@example.org',
	culture: {
		code: 'fr-FR',
	},
};
