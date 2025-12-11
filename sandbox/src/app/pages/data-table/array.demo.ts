//
// Map
//

const source = [1, 2, 3];

const plus1: number[] = [];

for (const item of source) {
	plus1.push(item + 1);
}

// plus1 = [2, 3, 4]

const plus1Bis = source.map((item) => item + 1);

// plus1Bis = [2, 3, 4]

//
// Filter
//
const greaterThan1: number[] = [];

for (const item of source) {
	if (item > 1) {
		greaterThan1.push(item);
	}
}

// greaterThan1 = [2, 3]

const greaterThan1Bis = source.filter((item) => item > 1);
// greaterThan1Bis = [2, 3]

//
// Reduce
//
let sum = 0;

for (const item of source) {
	sum += item;
}

// Sum 6

const sumBis = source.reduce((acc, item) => acc + item, 0);
