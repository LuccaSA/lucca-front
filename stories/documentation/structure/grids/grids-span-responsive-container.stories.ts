import { Meta, StoryFn } from '@storybook/angular';

interface GridsSpanStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/ResponsiveSpanContainer',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsSpanStory): string {
	return `
<div class="grid-containerWrapper">
	<div class="grid" [attr.style]="'--grid-columns: 4; --grid-colspan: 4'">
		<div class="grid-column" [attr.style]="'--grid-colspanAtContainerMinXS: 2; --grid-rowspanAtContainerMinS: 2'"><div class="demo">columns 4<br />colspan 4<br />container > XS colspan 2<br />container > S rowspan 2</div></div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtContainerMinXS: 2'"><div class="demo">columns 4<br />colspan 4<br />container > XS colspan 2</div></div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtContainerMinXS: 2'"><div class="demo">columns 4<br />colspan 4<br />container > XS colspan 2</div></div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtContainerMinXS: 2; --grid-colspanAtContainerMinS: 4'"><div class="demo">columns 4<br />colspan 4<br />container > XS colspan 2<br />container > S colspan 4</div></div>
	</div>
</div>
`;
}

const Template: StoryFn<GridsSpanStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: var(--colors-white-color);
			padding: var(--spacings-S);
			border-radius: 1rem;
			text-align: center;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
