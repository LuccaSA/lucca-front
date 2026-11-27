import { LuCoreSelectUser } from '@lucca-front/ng/core-select/user';
import { DateRange } from '@lucca-front/ng/date2';

// Fictional data set of the harvest planning scenario. It is generated from a fixed seed, so every
// run (and every test) gets the very same people, plots, varieties and harvests.

/** Mulberry32: a tiny seeded random generator, enough to build stable data without a dependency. */
function seededRandom(seed: number): () => number {
	let state = seed;
	return () => {
		state = (state + 0x6d2b79f5) | 0;
		let t = Math.imul(state ^ (state >>> 15), 1 | state);
		t = (t + Math.imul(t ^ (t >>> 7), 61 | t)) ^ t;
		return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
	};
}

const random = seededRandom(20261120);
const pick = <T>(items: readonly T[]): T => items[Math.floor(random() * items.length)];
const between = (min: number, max: number): number => min + Math.floor(random() * (max - min + 1));

export type Gardener = LuCoreSelectUser;

export interface Plot {
	id: number;
	name: string;
}

export type VarietyKind = 'fruit' | 'vegetable';

export interface Variety {
	id: number;
	name: string;
	kind: VarietyKind;
}

export interface Harvest {
	id: number;
	gardener: Gardener;
	plot: Plot;
	varieties: Variety[];
	period: DateRange;
	quantity: number;
	comment: string;
}

/** What the harvest form fills: a harvest before it gets an id. */
export type HarvestDraft = Omit<Harvest, 'id'>;

export const varietyNames = (harvest: Harvest): string => harvest.varieties.map((variety) => variety.name).join(', ');

// prettier-ignore
const firstNames = [
	'Adèle', 'Alix', 'Ambre', 'Basile', 'Capucine', 'Céleste', 'Côme', 'Elio', 'Esther', 'Félix', 'Garance', 'Gaspard', 'Hector',
	'Iris', 'Jules', 'Léonie', 'Lison', 'Maël', 'Mila', 'Noé', 'Octave', 'Paloma', 'Simon', 'Suzanne', 'Zoé',
];

// prettier-ignore
const lastNames = [
	'Aubépine', 'Bourrache', 'Bruyère', 'Cerfeuil', 'Chêne', 'Coquelicot', 'Érable', 'Fenouil', 'Genêt', 'Houblon',
	'Lavande', 'Mélèze', 'Mirabelle', 'Noisetier', 'Romarin', 'Saule', 'Sauge', 'Sureau', 'Tilleul', 'Valériane',
];

/**
 * 500 gardeners, every first name with every last name: the list is long enough to page through,
 * and a search by a first or a last name returns 20 or 25 people.
 */
export const gardeners: Gardener[] = lastNames.flatMap((lastName, lastNameIndex) =>
	firstNames.map((firstName, firstNameIndex) => ({ id: lastNameIndex * firstNames.length + firstNameIndex + 1, firstName, lastName })),
);

/** The person using the page, offered first by the gardener select. */
export const currentGardenerId = 42;

const plotZones = ['Serre', 'Verger', 'Potager nord', 'Potager sud', 'Jardin d’hiver', 'Carré surélevé'];

export const plots: Plot[] = plotZones.flatMap((zone, zoneIndex) => Array.from({ length: 6 }, (_, index) => ({ id: zoneIndex * 6 + index + 1, name: `${zone} ${index + 1}` })));

// prettier-ignore
const fruits = [
	'Abricot', 'Airelle', 'Amande', 'Ananas', 'Cassis', 'Cerise', 'Châtaigne', 'Citron', 'Coing', 'Fraise', 'Framboise',
	'Figue', 'Groseille', 'Kiwi', 'Melon', 'Mirabelle', 'Mûre', 'Myrtille', 'Nectarine', 'Noisette', 'Noix', 'Pastèque',
	'Pêche', 'Poire', 'Pomme', 'Prune', 'Raisin', 'Reine-claude', 'Rhubarbe', 'Sureau',
];

// prettier-ignore
const vegetables = [
	'Ail', 'Artichaut', 'Asperge', 'Aubergine', 'Bette', 'Betterave', 'Brocoli', 'Carotte', 'Céleri', 'Chou', 'Chou-fleur',
	'Ciboule', 'Concombre', 'Courge', 'Courgette', 'Cresson', 'Échalote', 'Endive', 'Épinard', 'Fenouil', 'Fève',
	'Haricot', 'Laitue', 'Lentille', 'Mâche', 'Maïs', 'Navet', 'Oignon', 'Oseille', 'Panais', 'Patate douce', 'Petit pois',
	'Piment', 'Poireau', 'Pois chiche', 'Poivron', 'Pomme de terre', 'Potiron', 'Radis', 'Roquette', 'Rutabaga',
	'Salsifis', 'Tomate', 'Topinambour',
];

const qualifiers = ['ancienne', 'rayée'];

/** About 150 varieties: each fruit and vegetable in two qualifiers, grouped by kind in the select. */
export const varieties: Variety[] = [...fruits.map((name) => ({ name, kind: 'fruit' as const })), ...vegetables.map((name) => ({ name, kind: 'vegetable' as const }))]
	.flatMap(({ name, kind }) => qualifiers.map((qualifier) => ({ name: `${name} ${qualifier}`, kind })))
	.map((variety, index) => ({ id: index + 1, ...variety }));

const varietyKindLabels: Record<VarietyKind, string> = { fruit: 'Fruits', vegetable: 'Légumes' };

export const varietyKind = (variety: Variety): VarietyKind => variety.kind;
export const varietyKindLabel = (kind: VarietyKind): string => varietyKindLabels[kind];

// prettier-ignore
const comments = [
	'', '', '', 'Prévoir des cagettes supplémentaires.', 'Arroser la veille de la récolte.', 'Récolter tôt le matin.',
	'Une partie part au marché du samedi.', 'Vérifier la maturité avant de cueillir.', 'Paillage à refaire après la récolte.',
];

const firstHarvestDay = new Date(2026, 5, 1);

/** The harvests already planned when the page opens: a page of 40 rows, as a list would load. */
export const initialHarvests: Harvest[] = Array.from({ length: 40 }, (_, index) => {
	const start = new Date(firstHarvestDay);
	start.setDate(start.getDate() + between(0, 120));
	const end = new Date(start);
	end.setDate(end.getDate() + between(2, 21));
	const harvestVarieties = Array.from({ length: between(1, 3) }, () => pick(varieties)).filter((variety, i, all) => all.indexOf(variety) === i);

	return {
		id: index + 1,
		gardener: pick(gardeners),
		plot: pick(plots),
		varieties: harvestVarieties,
		period: { start, end },
		quantity: between(2, 250),
		comment: pick(comments),
	};
});
