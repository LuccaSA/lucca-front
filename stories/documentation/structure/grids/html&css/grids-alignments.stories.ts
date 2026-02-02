import { Meta, StoryObj } from '@storybook/angular';

interface GridsAlignmentsStory {
	reverse: boolean;
}

export default {
	title: 'Documentation/Structure/Grids/HTML&CSS/Alignments',
} as Meta;

function getTemplate(): string {
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

const Template = () => ({
	template: getTemplate(),
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

		.grid + .grid {
			margin-block-start: var(--pr-t-spacings-400);
		}
		`,
	],
});

export const Basic: StoryObj = {
	args: {},
	render: Template,
};
