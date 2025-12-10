export function getRandomPercent(min: number = 33, max: number = 66): string {
	return `${Math.floor(Math.random() * (max - min) + min).toString()}%`;
}
