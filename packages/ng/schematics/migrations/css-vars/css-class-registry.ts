const classWithImports = [
	{
		cssClasses: ['u-h1', 'u-h2', 'u-h3', 'u-h4', 'u-h5', 'u-h6'],
		cssImports: ['@lucca-front/scss/src/components/title'],
		elements: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
	},
	{ cssClasses: ['actionIcon'], cssImports: ['@lucca-front/scss/src/components/actionIcon'] },
	{ cssClasses: ['box'], cssImports: ['@lucca-front/scss/src/components/box'] },
	{ cssClasses: ['breadcrumbs'], cssImports: ['@lucca-front/scss/src/components/breadcrumbs'] },
	{ cssClasses: ['button-group'], cssImports: ['@lucca-front/scss/src/components/buttonGroup'] },
	{ cssClasses: ['button'], cssImports: ['@lucca-front/scss/src/components/button'] },
	{ cssClasses: ['callout'], cssImports: ['@lucca-front/scss/src/components/callout'] },
	{ cssClasses: ['card'], cssImports: ['@lucca-front/scss/src/components/card'] },
	{ cssClasses: ['checkbox'], cssImports: ['@lucca-front/scss/src/components/checkbox'] },
	{ cssClasses: ['checkboxesfield'], cssImports: ['@lucca-front/scss/src/components/field', '@lucca-front/scss/src/components/checkbox'] },
	{ cssClasses: ['chip'], cssImports: ['@lucca-front/scss/src/components/chip'] },
	{ cssClasses: ['code'], cssImports: ['@lucca-front/scss/src/components/code'] },
	{ cssClasses: ['collapse'], cssImports: ['@lucca-front/scss/src/components/collapse'] },
	{ cssClasses: ['container'], cssImports: ['@lucca-front/scss/src/components/container'] },
	{ cssClasses: ['contentSection'], cssImports: ['@lucca-front/scss/src/components/contentSection'] },
	{ cssClasses: ['divider'], cssImports: ['@lucca-front/scss/src/components/divider'], elements: ['hr'] },
	{ cssClasses: ['emptyState'], cssImports: ['@lucca-front/scss/src/components/emptyState'] },
	{ cssClasses: ['errorPage'], cssImports: ['@lucca-front/scss/src/components/errorPage'] },
	{ cssClasses: ['file'], cssImports: ['@lucca-front/scss/src/components/file'] },
	{ cssClasses: ['filters'], cssImports: ['@lucca-front/scss/src/components/filters'] },
	{ cssClasses: ['form-group'], cssImports: ['@lucca-front/scss/src/components/form'] },
	{ cssClasses: ['gauge'], cssImports: ['@lucca-front/scss/src/components/gauge'] },
	{ cssClasses: ['grid'], cssImports: ['@lucca-front/scss/src/components/grid'] },
	{ cssClasses: ['header'], cssImports: ['@lucca-front/scss/src/components/header'] },
	{ cssClasses: ['label'], cssImports: ['@lucca-front/scss/src/components/label'] },
	{ cssClasses: ['layout'], cssImports: ['@lucca-front/scss/src/components/layout'] },
	{ cssClasses: ['link'], cssImports: ['@lucca-front/scss/src/components/link'] },
	{ cssClasses: ['list'], cssImports: ['@lucca-front/scss/src/components/list'] },
	{ cssClasses: ['loading'], cssImports: ['@lucca-front/scss/src/components/loading'] },
	{ cssClasses: ['main-content'], cssImports: ['@lucca-front/scss/src/components/main'] },
	{ cssClasses: ['menu'], cssImports: ['@lucca-front/scss/src/components/menu'] },
	{ cssClasses: ['mod-sortable', 'table-head-row-cell-sortableButton'], cssImports: ['@lucca-front/scss/src/components/tableSorted'] },
	{ cssClasses: ['mod-stickyColumn', 'mod-stickyHeader'], cssImports: ['@lucca-front/scss/src/components/tableSticked'] },
	{ cssClasses: ['navSide'], cssImports: ['@lucca-front/scss/src/components/navside'], elements: ['lucca-sitemap'] },
	{ cssClasses: ['pageHeader'], cssImports: ['@lucca-front/scss/src/components/pageHeader'] },
	{ cssClasses: ['pagination'], cssImports: ['@lucca-front/scss/src/components/pagination'] },
	{ cssClasses: ['progress'], cssImports: ['@lucca-front/scss/src/components/progress'] },
	{ cssClasses: ['radio'], cssImports: ['@lucca-front/scss/src/components/radio'] },
	{ cssClasses: ['radioButtons'], cssImports: ['@lucca-front/scss/src/components/radioButtons'] },
	{ cssClasses: ['radiosfield'], cssImports: ['@lucca-front/scss/src/components/field', '@lucca-front/scss/src/components/radio'] },
	{ cssClasses: ['section'], cssImports: ['@lucca-front/scss/src/components/section'] },
	{ cssClasses: ['switch'], cssImports: ['@lucca-front/scss/src/components/switch'] },
	{ cssClasses: ['table'], cssImports: ['@lucca-front/scss/src/components/table'] },
	{ cssClasses: ['tableOfContent'], cssImports: ['@lucca-front/scss/src/components/tableOfContent'] },
	{ cssClasses: ['tag'], cssImports: ['@lucca-front/scss/src/components/tag'] },
	{ cssClasses: ['textfield'], cssImports: ['@lucca-front/scss/src/components/field', '@lucca-front/scss/src/components/textfield'] },
	{ cssClasses: ['timeline'], cssImports: ['@lucca-front/scss/src/components/timeline'] },
	{ cssClasses: ['titleSection'], cssImports: ['@lucca-front/scss/src/components/titleSection'] },
	{ cssClasses: ['toasts'], cssImports: ['@lucca-front/scss/src/components/toast'] },
	{ cssClasses: [/^mod-layoutFixed-.*/], cssImports: ['@lucca-front/scss/src/components/tableFixed'] },
	{ cssClasses: [/^u-.*/], cssImports: ['@lucca-front/scss/src/components/util'] },
];

export function getCssImports(allVisitedClasses: string[], allVisitedElements: string[]): string[] {
	const exactCssClasses: Record<string, string[]> = {};
	const exactCssElements: Record<string, string[]> = {};
	const regexpCssTests: Array<(cssClass: string) => string[] | null> = [];

	// Pre-compute classWithImports for performance optimization
	for (const classWithImport of classWithImports) {
		for (const cssClass of classWithImport.cssClasses) {
			if (typeof cssClass === 'string') {
				exactCssClasses[cssClass] = classWithImport.cssImports;
			} else {
				regexpCssTests.push((css) => (css.match(cssClass) ? classWithImport.cssImports : null));
			}
		}

		for (const element of classWithImport.elements || []) {
			exactCssElements[element] = classWithImport.cssImports;
		}
	}

	const imports = new Set<string>();

	for (const visitedClass of allVisitedClasses) {
		(exactCssClasses[visitedClass] || regexpCssTests.map((test) => test(visitedClass)).find(Boolean))?.forEach((newImport) => imports.add(newImport));
	}

	for (const visitedElement of allVisitedElements) {
		exactCssElements[visitedElement]?.forEach((newImport) => imports.add(newImport));
	}

	return [...imports].sort();
}
