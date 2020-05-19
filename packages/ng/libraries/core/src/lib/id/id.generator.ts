const ID_LENGTH = 8;
const ID_BASE = 16
export function generateId(): string {
	return new Array(ID_LENGTH).map(() => Math.floor(Math.random() * ID_BASE).toString(ID_BASE)).join('');
}
