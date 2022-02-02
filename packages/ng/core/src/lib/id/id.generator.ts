const ID_LENGTH = 8;
const ID_BASE = 16;
export function generateId(): string {
	const emptyArr = Array.from(Array(ID_LENGTH));
	const randomArr = emptyArr.map((i) =>
		Math.floor(Math.random() * ID_BASE).toString(ID_BASE),
	);
	const randomId = randomArr.join('');
	return randomId;
}
