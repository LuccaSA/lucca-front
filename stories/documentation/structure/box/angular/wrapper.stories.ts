import { BoxComponent, BoxWrapperComponent } from '@lucca-front/ng/box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { generateInputs } from '@/helpers/stories';

export default {
	title: 'Documentation/Structure/Box/Angular/Wrapper',
	component: BoxWrapperComponent,
	decorators: [
		moduleMetadata({
			imports: [BoxComponent],
		}),
	],
	argTypes: {
		columns: {
			control: { type: 'number', min: 1 },
			table: { category: 'inputs' },
		},
	},
	render: (args, { argTypes }) => ({
		props: args,
		template: `<lu-box-wrapper${generateInputs(args, argTypes)}>
	<lu-box heading="Title" subtitle="Subtitle">Custom content</lu-box>
	<lu-box heading="Title" subtitle="Subtitle">Jujubes topping oat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll.</lu-box>
	<lu-box heading="Title" subtitle="Subtitle">Jujubes topping oat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.</lu-box>
	<lu-box heading="Title" subtitle="Subtitle">Jujubes topping oat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll. Pie gingerbread jelly beans cotton candy tart lollipop bonbon candy. Bonbon chocolate gingerbread pastry.</lu-box>
	<lu-box heading="Title" subtitle="Subtitle">Custom content</lu-box>
	<lu-box heading="Title" subtitle="Subtitle">Jujubes topping oat cake cake lemon drops chupa chups sweet roll. Macaroon icing tootsie roll bonbon dragée carrot cake sweet roll.</lu-box>
</lu-box-wrapper>`,
	}),
} as Meta;

export const Basic: StoryObj<BoxWrapperComponent> = {
	args: {
		columns: 3,
	},
};
