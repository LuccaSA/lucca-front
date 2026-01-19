import { Meta, StoryObj } from '@storybook/angular';

interface GridsSpanStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/HTML & CSS/ResponsiveSpan',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsSpanStory): string {
	return `<div class="grid" [attr.style]="'--grid-columns: 4; --grid-colspan: 4'">
	<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXS: 2; --grid-rowspanAtMediaMinS: 2'"><div class="demo">columns 4<br />colspan 4<br />media > XS colspan 2<br />media > S rowspan 2</div></div>
	<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXS: 2'"><div class="demo">columns 4<br />colspan 4<br />media > XS colspan 2</div></div>
	<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXS: 2'"><div class="demo">columns 4<br />colspan 4<br />media > XS colspan 2</div></div>
	<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXS: 2; --grid-colspanAtMediaMinS: 4'"><div class="demo">columns 4<br />colspan 4<br />media > XS colspan 2<br />media > S colspan 4</div></div>
</div>`;
}

const Template = (args: GridsSpanStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: var(--palettes-neutral-0);
			padding: var(--pr-t-spacings-200);
			border-radius: 1rem;
			text-align: center;
			block-size: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		`,
	],
});

export const Basic: StoryObj<GridsSpanStory> = {
	args: {},
	render: Template,
};
