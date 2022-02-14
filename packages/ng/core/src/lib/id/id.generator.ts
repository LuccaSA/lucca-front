const ID_LENGTH = 8;
const ID_BASE = 16;
export function generateId(): string {
	return Array(ID_LENGTH)
		.fill(0)
		.map(() => Math.floor(Math.random() * ID_BASE).toString(ID_BASE))
		.join('');
}
