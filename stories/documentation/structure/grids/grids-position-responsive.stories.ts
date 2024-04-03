import { Meta, StoryFn } from '@storybook/angular';

interface GridsPositionStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/ResponsivePosition',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsPositionStory): string {
	return `<div class="grid" [attr.style]="'--grid-columns: 3; --grid-colspan: 2'">
	<div class="grid-column" [attr.style]="'--grid-colspan: 1; --grid-rowspan: 2; --grid-columnAtMediaMinS: 3'"><div class="demo">columns 3<br />colspan 1<br />rowspan 2<br />media > S column 3</div></div>
	<div class="grid-column" [attr.style]="'--grid-rowAtMediaMinS: 2; --grid-columnAtMediaMinS: 1'"><div class="demo">columns 3<br />colspan 2<br />media > S column 1<br />media > S row 2</div></div>
	<div class="grid-column" [attr.style]="'--grid-rowAtMediaMinS: 1'"><div class="demo">columns 3<br />colspan 2<br />media > S row 1</div></div>
</div>`;
}

const Template: StoryFn<GridsPositionStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: var(--colors-white-color);
			padding: var(--pr-t-spacings-200);
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
