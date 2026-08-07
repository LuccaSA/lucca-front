import { propertyDocLinks, PRISME_DOCS_URL, utilityDocLinks, versionSegment } from './links';

describe('utilityDocLinks', () => {
	it('always includes the Prisme link', () => {
		const links = utilityDocLinks('pr-u-displayFlex', '');
		expect(links[0].url).toBe(PRISME_DOCS_URL);
	});

	it('adds a Storybook family link when a base URL is set and the family maps', () => {
		const links = utilityDocLinks('pr-u-displayFlex', 'https://docs.example/v21.1/storybook');
		expect(links).toHaveLength(2);
		expect(links[1].url).toBe('https://docs.example/v21.1/storybook/?path=/docs/documentation-integration-utilities-display--docs');
	});

	it('trims a trailing slash on the base URL', () => {
		const links = utilityDocLinks('pr-u-displayFlex', 'https://docs.example/storybook/');
		expect(links[1].url).toContain('storybook/?path=');
	});

	it('maps text-colour classes to the textcolor family', () => {
		const links = utilityDocLinks('pr-u-colorTextBrand', 'https://d/sb');
		expect(links[1].url).toContain('-textcolor--docs');
	});

	it('maps border-radius corner classes to borderradius (not border)', () => {
		const links = utilityDocLinks('pr-u-borderTopLeftRadiusM', 'https://d/sb');
		expect(links[1].url).toContain('-borderradius--docs');
	});

	it('omits the Storybook link for unmapped families (e.g. spacing)', () => {
		const links = utilityDocLinks('pr-u-marginInlineStart100', 'https://d/sb');
		expect(links).toHaveLength(1);
	});

	it('omits the Storybook link when no base URL is configured', () => {
		expect(utilityDocLinks('pr-u-displayFlex', '')).toHaveLength(1);
	});

	it('fills a {version} placeholder from the installed version (minor level)', () => {
		const links = utilityDocLinks('pr-u-displayFlex', 'https://lucca-front.lucca.io/{version}/storybook', '21.0.5');
		expect(links[1].url).toBe('https://lucca-front.lucca.io/v21.0/storybook/?path=/docs/documentation-integration-utilities-display--docs');
	});

	it('drops the placeholder link when the version is unparseable or the dev sentinel', () => {
		expect(utilityDocLinks('pr-u-displayFlex', 'https://host/{version}/storybook', '0.0.0')).toHaveLength(1);
		expect(utilityDocLinks('pr-u-displayFlex', 'https://host/{version}/storybook', 'override')).toHaveLength(1);
		expect(utilityDocLinks('pr-u-displayFlex', 'https://host/{version}/storybook', undefined)).toHaveLength(1);
	});
});

describe('versionSegment', () => {
	it('keeps major.minor and drops the patch', () => {
		expect(versionSegment('21.0.5')).toBe('v21.0');
		expect(versionSegment('21.2.0')).toBe('v21.2');
	});

	it('returns undefined for the dev sentinel and non-semver versions', () => {
		expect(versionSegment('0.0.0')).toBeUndefined();
		expect(versionSegment('override')).toBeUndefined();
		expect(versionSegment(undefined)).toBeUndefined();
	});
});

describe('propertyDocLinks', () => {
	it('returns only the Prisme link (tokens are not deep-linkable)', () => {
		expect(propertyDocLinks()).toEqual([{ label: '📘 Prisme docs', url: PRISME_DOCS_URL }]);
	});
});
