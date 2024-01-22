import { Meta, Story } from '@storybook/angular';

interface GridsResponsiveStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Responsive',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsResponsiveStory): string {
	return `<div class="grid mod-form" [attr.style]="'--grid-colspan: 4'">
	<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 2; --grid-colspanAtMediaMinS: 4;'"><div class="demo">1</div></div>
	<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 2; --grid-rowspanAtMediaMinS: 2;'"><div class="demo">2</div></div>
	<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 2;'"><div class="demo">3</div></div>
	<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 2; --grid-colspanAtMediaMinS: 2; --grid-columnAtMediaMinS: 3;'"><div class="demo">4</div></div>
</div>`;
}

const Template: Story<GridsResponsiveStory> = (args: GridsResponsiveStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: #FFFFFF;
			padding: var(--spacings-S);
			border-radius: 1rem;
			text-align: center;
			height: 100%;
			display: flex;
			align-items: center;
			justify-content: center;
		}

		.grid + .grid {
			margin-top: var(--spacings-L);
		}
		`,
	],
});

export const Basic = Template.bind({});
Basic.args = {};
