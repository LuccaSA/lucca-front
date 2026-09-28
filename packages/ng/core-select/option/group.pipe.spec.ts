import { generateGroups, LuOptionGroupPipe } from './group.pipe';

interface Person {
	name: string;
	team: string;
}

const alice: Person = { name: 'Alice', team: 'Design' };
const bob: Person = { name: 'Bob', team: 'Design' };
const carol: Person = { name: 'Carol', team: 'Tech' };
const dave: Person = { name: 'Dave', team: 'Design' };

const byTeam = (person: Person) => person.team;

describe(generateGroups.name, () => {
	it('should group consecutive options sharing the same key', () => {
		// Act
		const result = generateGroups([alice, bob, carol], byTeam);

		// Assert
		expect(result).toEqual([
			{ key: 'Design', options: [alice, bob] },
			{ key: 'Tech', options: [carol] },
		]);
	});

	it('should return a single group when every option shares the same key', () => {
		// Act
		const result = generateGroups([alice, bob], byTeam);

		// Assert
		expect(result).toEqual([{ key: 'Design', options: [alice, bob] }]);
	});

	it('should create a new group for each key change, even for a key already seen', () => {
		// Act
		const result = generateGroups([alice, carol, dave], byTeam);

		// Assert
		expect(result).toEqual([
			{ key: 'Design', options: [alice] },
			{ key: 'Tech', options: [carol] },
			{ key: 'Design', options: [dave] },
		]);
	});

	it('should preserve the order of the options inside a group', () => {
		// Act
		const result = generateGroups([bob, alice], byTeam);

		// Assert
		expect(result[0].options).toEqual([bob, alice]);
	});

	it('should handle a single option', () => {
		// Act
		const result = generateGroups([alice], byTeam);

		// Assert
		expect(result).toEqual([{ key: 'Design', options: [alice] }]);
	});

	it('should support non-string keys', () => {
		// Act
		const result = generateGroups([1, 1, 2], (n: number) => n % 2 === 0);

		// Assert
		expect(result).toEqual([
			{ key: false, options: [1, 1] },
			{ key: true, options: [2] },
		]);
	});

	it('should group options with a nullish key together', () => {
		// Act
		const result = generateGroups([alice, bob], () => null);

		// Assert
		expect(result).toEqual([{ key: null, options: [alice, bob] }]);
	});

	it('should return an empty array for an empty list', () => {
		// Act
		const result = generateGroups([], byTeam);

		// Assert
		expect(result).toEqual([]);
	});

	it('should return an empty array when options are nullish', () => {
		// Act
		const result = generateGroups(null as unknown as Person[], byTeam);

		// Assert
		expect(result).toEqual([]);
	});

	it('should not mutate the input list', () => {
		// Arrange
		const options = [alice, carol];

		// Act
		generateGroups(options, byTeam);

		// Assert
		expect(options).toEqual([alice, carol]);
	});
});

describe(LuOptionGroupPipe.name, () => {
	let pipe: LuOptionGroupPipe<Person, string>;

	beforeEach(() => {
		pipe = new LuOptionGroupPipe<Person, string>();
	});

	it('should return the groups of an array of options', () => {
		// Act
		const result = pipe.transform([alice, bob, carol], byTeam);

		// Assert
		expect(result).toEqual([
			{ key: 'Design', options: [alice, bob] },
			{ key: 'Tech', options: [carol] },
		]);
	});

	it('should return a single group when given a single option', () => {
		// Act
		const result = pipe.transform(alice, byTeam);

		// Assert
		expect(result).toEqual({ key: 'Design', options: [alice] });
	});

	it('should return an empty array when given an empty array', () => {
		// Act
		const result = pipe.transform([], byTeam);

		// Assert
		expect(result).toEqual([]);
	});
});
