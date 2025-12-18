import { ButtonComponent } from '@lucca-front/ng/button';
import { ChipComponent } from '@lucca-front/ng/chip';
import { ScrollBoxComponent } from '@lucca-front/ng/scrollBox';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

interface ScrollBoxBasicStory {}

export default {
	title: 'Documentation/Structure/ScrollBox',
	decorators: [
		moduleMetadata({
			imports: [ScrollBoxComponent, ButtonComponent, TagComponent, ChipComponent],
		}),
	],
} as Meta;

function getTemplate(args: ScrollBoxBasicStory): string {
	return `<lu-scroll-box>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
	<button luButton="outlined" size="S" type="button">button</button>
</lu-scroll-box>
<lu-scroll-box [attr.style]="'--components-scrollBox-paddingBlock: var(--pr-t-spacings-200); --components-scrollBox-paddingInline: 0rem; --components-scrollBox-marginBlock: 0rem'">
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
	<lu-tag label="tag" />
</lu-scroll-box>
<div class="resize">
	<lu-scroll-box [attr.style]="'--components-scrollBox-marginBlock: var(--pr-t-spacings-300);--components-scrollBox-marginInline: 0; --components-scrollBox-paddingBlock: var(--pr-t-spacings-300); --components-scrollBox-gap: var(--pr-t-spacings-300);'">
		<lu-chip>chip</lu-chip>
		<lu-chip>chip</lu-chip>
		<lu-chip>chip</lu-chip>
		<lu-chip>chip</lu-chip>
		<lu-chip>chip</lu-chip>
		<lu-chip>chip</lu-chip>
	</lu-scroll-box>
</div>

<lu-scroll-box>
	<button luButton type="button">button</button>
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
			gap: var(--pr-t-spacings-200);
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
