import { Meta, StoryFn } from '@storybook/angular';

interface GridsAlignmentsStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/Alignments',
	argTypes: {},
} as Meta;

function getTemplate(args: GridsAlignmentsStory): string {
	return `<div class="grid">
	<div class="grid-column" style="--grid-align: start"><div class="demo">start</div></div>
	<div class="grid-column" style="--grid-align: center"><div class="demo">center</div></div>
	<div class="grid-column" style="--grid-align: end"><div class="demo">end</div></div>
	<div class="grid-column"><div class="demo">auto</div></div>
	<div class="grid-column"><div class="demo">a<br />tall<br />col</div></div>
</div>

<div class="grid" style="--grid-columns: 1">
	<div class="grid-column" style="--grid-justify: start"><div class="demo">start</div></div>
	<div class="grid-column" style="--grid-justify: center"><div class="demo">center</div></div>
	<div class="grid-column" style="--grid-justify: end"><div class="demo">end</div></div>
	<div class="grid-column"><div class="demo">auto</div></div>	
	<div class="grid-column"><div class="demo">a large col</div></div>
</div>`;
}

const Template: StoryFn<GridsAlignmentsStory> = (args) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		.demo {
			background-color: #F3F5FC;
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
