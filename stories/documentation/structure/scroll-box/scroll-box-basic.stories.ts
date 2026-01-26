import { ScrollBoxComponent } from '@lucca-front/ng/scroll-box';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ScrollBoxBasicStory {}

export default {
	title: 'Documentation/Structure/ScrollBox',
	decorators: [
		moduleMetadata({
			imports: [ScrollBoxComponent],
		}),
	],
} as Meta;

function getTemplate(args: ScrollBoxBasicStory): string {
	return `<lu-scroll-box>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
</lu-scroll-box>
<lu-scroll-box [attr.style]="'--components-scrollBox-paddingBlock: var(--pr-t-spacings-200); --components-scrollBox-paddingInline: 0rem; --components-scrollBox-marginBlock: 0rem'">
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
	<div class="box">box</div>
</lu-scroll-box>
<div class="resize">
	<lu-scroll-box [attr.style]="'--components-scrollBox-marginBlock: var(--pr-t-spacings-300);--components-scrollBox-marginInline: 0; --components-scrollBox-paddingBlock: var(--pr-t-spacings-300); --components-scrollBox-gap: var(--pr-t-spacings-300);'">
		<div class="box">box</div>
		<div class="box">box</div>
		<div class="box">box</div>
	</lu-scroll-box>
</div>
<lu-scroll-box>
	<div style="width: 200vw" class="box">box</div>
</lu-scroll-box>
<lu-scroll-box>
	<div class="box">box</div>
</lu-scroll-box>
`;
}

const Template = (args: ScrollBoxBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			flex-direction: column;
			gap: var(--pr-t-spacings-400);
		}

		.resize {
			resize: horizontal;
			overflow: scroll;
			width: fit-content;
		}
	`,
	],
});

export const Basic: StoryObj<ScrollBoxBasicStory> = {
	args: {},
	render: Template,
};
