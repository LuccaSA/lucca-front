export const stylesScss = `
$noCssVar: true;

@import '~@lucca-front/scss/src/main.overridable'
	, '~@lucca-front/ng/src/main.overridable.scss'
	, 'scss/shame';

:root {
	@include generateCSSVarsFromTheme($theme);
}
`;

export const shameScss = `// 'My room is not messy; it is an obstable course designed to keep me fit'
// Put here the CSS which will need a refactor, or some code that you want to see in Lucca Front.
`;
