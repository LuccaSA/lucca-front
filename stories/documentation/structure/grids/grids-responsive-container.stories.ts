import { Meta, StoryFn } from '@storybook/angular';

interface GridsResponsiveStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/ResponsiveContainer',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsResponsiveStory): string {
	return `<div class="grid-containerWrapper">
	<div class="grid mod-form" [attr.style]="'--grid-colspan: 4'">
		<div class="grid-column" [attr.style]="'--grid-colspanAtContainerMinXXS: 2; --grid-colspanAtContainerMinS: 4;'"><div class="demo">1</div></div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtContainerMinXXS: 2; --grid-rowspanAtContainerMinS: 2;'"><div class="demo">2</div></div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtContainerMinXXS: 2;'"><div class="demo">3</div></div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtContainerMinXXS: 2; --grid-colspanAtContainerMinS: 2; --grid-columnAtContainerMinS: 3;'"><div class="demo">4</div></div>
	</div>
</div>`;
}

const Template: StoryFn<GridsResponsiveStory> = (args) => ({
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
