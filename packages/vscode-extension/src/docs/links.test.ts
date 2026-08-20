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

	it('maps font-size classes to textsize, not textcolor', () => {
		for (const name of ['pr-u-bodyM', 'pr-u-textM', 'pr-u-textXS', 'pr-u-textXXXL']) {
			expect(utilityDocLinks(name, 'https://d/sb')[1].url).toContain('-textsize--docs');
		}
	});

	it('keeps colour classes whose name starts with text on textcolor', () => {
		for (const name of ['pr-u-textBrand', 'pr-u-textSubtle']) {
			expect(utilityDocLinks(name, 'https://d/sb')[1].url).toContain('-textcolor--docs');
		}
	});

	it('maps the size family, physical and logical alike', () => {
		for (const name of ['pr-u-width100%', 'pr-u-minWidth0', 'pr-u-heightFitContent', 'pr-u-inlineSize100%', 'pr-u-maxInlineSizeFitContent', 'pr-u-minBlockSize0']) {
			expect(utilityDocLinks(name, 'https://d/sb')[1].url).toContain('-sizes--docs');
		}
	});

	it('maps clearfix to reset, not float', () => {
		expect(utilityDocLinks('pr-u-clearfix', 'https://d/sb')[1].url).toContain('-reset--docs');
		expect(utilityDocLinks('pr-u-clearBoth', 'https://d/sb')[1].url).toContain('-float--docs');
	});

	it('maps the legacy radius twins to their own deprecated page', () => {
		expect(utilityDocLinks('u-borderRadiusM', 'https://d/sb')[1].url).toContain('-borderradiusdeprecated--docs');
		expect(utilityDocLinks('u-borderTopLeftRadiusXL', 'https://d/sb')[1].url).toContain('-borderradiusdeprecated--docs');
	});

	it('maps font-style alongside the rest of the text-style family', () => {
		expect(utilityDocLinks('pr-u-fontStyleItalic', 'https://d/sb')[1].url).toContain('-textstyle--docs');
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
