export type PageTitle = { title: string; params?: { [param: string]: string } };
export const TitleSeparator = ' – ';

export function isPageTitle(x: any): x is PageTitle {
	// eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
	return x && x.title !== undefined;
}
