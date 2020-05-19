export function generateId(): string {
	return 'xxxxxxxx'.replace(/[x]/g, () => Math.floor(Math.random() * 16).toString(16));
}