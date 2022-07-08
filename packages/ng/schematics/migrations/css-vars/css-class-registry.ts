const classWithImports = [
	{ cssClass: 'actionIcon', cssImport: '@lucca-front/scss/src/components/actionIcon' },
	{ cssClass: 'box', cssImport: '@lucca-front/scss/src/components/box' },
	{ cssClass: 'breadcrumbs', cssImport: '@lucca-front/scss/src/components/breadcrumbs' },
	{ cssClass: 'button', cssImport: '@lucca-front/scss/src/components/button' },
	{ cssClass: 'button-group', cssImport: '@lucca-front/scss/src/components/buttonGroup' },
	{ cssClass: 'callout', cssImport: '@lucca-front/scss/src/components/callout' },
	{ cssClass: 'card', cssImport: '@lucca-front/scss/src/components/card' },
	{ cssClass: 'checkbox', cssImport: '@lucca-front/scss/src/components/checkbox' },
	{ cssClass: 'chip', cssImport: '@lucca-front/scss/src/components/chip' },
	{ cssClass: 'code', cssImport: '@lucca-front/scss/src/components/code' },
	{ cssClass: 'collapse', cssImport: '@lucca-front/scss/src/components/collapse' },
	{ cssClass: 'container', cssImport: '@lucca-front/scss/src/components/container' },
	{ cssClass: 'contentSection', cssImport: '@lucca-front/scss/src/components/contentSection' },
	{ cssClass: 'titleSection', cssImport: '@lucca-front/scss/src/components/titleSection' },
	{ cssClass: 'divider', cssImport: '@lucca-front/scss/src/components/divider' },
	{ cssClass: 'emptyState', cssImport: '@lucca-front/scss/src/components/emptyState' },
	{ cssClass: 'errorPage', cssImport: '@lucca-front/scss/src/components/errorPage' },
	{ cssClass: 'textfield', cssImport: '@lucca-front/scss/src/components/field' },
	{ cssClass: 'radiosfield', cssImport: '@lucca-front/scss/src/components/field' },
	{ cssClass: 'checkboxesfield', cssImport: '@lucca-front/scss/src/components/field' },
	{ cssClass: 'file', cssImport: '@lucca-front/scss/src/components/file' },
	{ cssClass: 'filters', cssImport: '@lucca-front/scss/src/components/filters' },
	{ cssClass: 'form-group', cssImport: '@lucca-front/scss/src/components/form' },
	{ cssClass: 'gauge', cssImport: '@lucca-front/scss/src/components/gauge' },
	{ cssClass: 'grid', cssImport: '@lucca-front/scss/src/components/grid' },
	{ cssClass: 'header', cssImport: '@lucca-front/scss/src/components/header' },
	{ cssClass: 'label', cssImport: '@lucca-front/scss/src/components/label' },
	{ cssClass: 'layout', cssImport: '@lucca-front/scss/src/components/layout' },
	{ cssClass: 'link', cssImport: '@lucca-front/scss/src/components/link' },
	{ cssClass: 'list', cssImport: '@lucca-front/scss/src/components/list' },
	{ cssClass: 'loading', cssImport: '@lucca-front/scss/src/components/loading' },
	{ cssClass: 'main-content', cssImport: '@lucca-front/scss/src/components/main' },
	{ cssClass: 'menu', cssImport: '@lucca-front/scss/src/components/menu' },
	{ cssClass: 'navSide', cssImport: '@lucca-front/scss/src/components/navside' },
	{ cssClass: 'pageHeader', cssImport: '@lucca-front/scss/src/components/pageHeader' },
	{ cssClass: 'pagination', cssImport: '@lucca-front/scss/src/components/pagination' },
	{ cssClass: 'progress', cssImport: '@lucca-front/scss/src/components/progress' },
	{ cssClass: 'radio', cssImport: '@lucca-front/scss/src/components/radio' },
	{ cssClass: 'radioButtons', cssImport: '@lucca-front/scss/src/components/radioButtons' },
	{ cssClass: 'section', cssImport: '@lucca-front/scss/src/components/section' },
	{ cssClass: 'switch', cssImport: '@lucca-front/scss/src/components/switch' },
	{ cssClass: 'table', cssImport: '@lucca-front/scss/src/components/table' },
	{ cssClass: /^mod-layoutFixed-.*/, cssImport: '@lucca-front/scss/src/components/tableFixed' },
	{ cssClass: 'mod-sortable', cssImport: '@lucca-front/scss/src/components/tableSorted' },
	{ cssClass: 'table-head-row-cell-sortableButton', cssImport: '@lucca-front/scss/src/components/tableSorted' },
	{ cssClass: 'mod-stickyColumn', cssImport: '@lucca-front/scss/src/components/tableSticked' },
	{ cssClass: 'mod-stickyHeader', cssImport: '@lucca-front/scss/src/components/tableSticked' },
	{ cssClass: 'tag', cssImport: '@lucca-front/scss/src/components/tag' },
	{ cssClass: 'textfield', cssImport: '@lucca-front/scss/src/components/textfield' },
	{ cssClass: 'timeline', cssImport: '@lucca-front/scss/src/components/timeline' },
	{ cssClass: 'title', cssImport: '@lucca-front/scss/src/components/title' },
	{ cssClass: 'toasts', cssImport: '@lucca-front/scss/src/components/toast' },
	{ cssClass: 'tableOfContent', cssImport: '@lucca-front/scss/src/components/tableOfContent' },
	{ cssClass: /^u-.*/, cssImport: '@lucca-front/scss/src/components/util' },
];

export function getCssImports(allVisitedClasses: string[]): string[] {
	const exactCssClasses: Record<string, string> = {};
	const regexpCssTests: Array<(cssClass: string) => string | null> = [];

	// Pre-compute classWithImports for performance optimization
	for (const classWithImport of classWithImports) {
		if (typeof classWithImport.cssClass === 'string') {
			exactCssClasses[classWithImport.cssClass] = classWithImport.cssImport;
		} else {
			regexpCssTests.push((cssClass) => (cssClass.match(classWithImport.cssClass) ? classWithImport.cssImport : null));
		}
	}

	const imports = new Set<string>();

	for (const visitedClass of allVisitedClasses) {
		const newImport = exactCssClasses[visitedClass] || regexpCssTests.map((test) => test(visitedClass)).find(Boolean);

		if (newImport) {
			imports.add(newImport);
		}
	}

	return [...imports].sort();
}
