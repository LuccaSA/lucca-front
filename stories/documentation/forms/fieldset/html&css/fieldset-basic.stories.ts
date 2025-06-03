import { Meta, StoryFn } from '@storybook/angular';

interface FieldsetBasicStory {
	horizontal: boolean;
	expandable: boolean;
	expanded: boolean;
	helper: string;
	heading: string;
	size: string;
	content: string;
}

export default {
	title: 'Documentation/Forms/Fieldset/HTML&CSS/Basic',
	argTypes: {
		horizontal: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: false },
		},
		expandable: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'horizontal', truthy: false },
		},
		expanded: {
			control: {
				type: 'boolean',
			},
			if: { arg: 'expandable', truthy: true },
		},
		size: {
			options: ['S', null],
			control: {
				type: 'select',
			},
		},
		helper: {
			control: {
				type: 'text',
			},
		},
		heading: {
			control: {
				type: 'text',
			},
		},
		content: {
			control: {
				type: 'text',
			},
		},
	},
} as Meta;

function getTemplate(args: FieldsetBasicStory): string {
	const horizontal = args.horizontal ? 'mod-horizontal' : '';
	const s = args.size === 'S' ? 'mod-S' : '';
	const helper = args.helper ? '<span class="fieldset-title-content-text-helper">{{ helper }}</span>' : '';
	const heading = args.heading;
	const content = args.content;

	if (args.expandable === true)
		return `<fieldset class="fieldset mod-expandable ${s}" aria-labelledby="fieldsetTitleContent1">
	<legend class="fieldset-title">
		<button type="button" class="fieldset-title-content" id="fieldsetTitleContent1" [attr.aria-expanded]="expanded" (click)="expanded = !expanded">
			<span class="fieldset-title-content-text">
				${heading}
				${helper}
			</span>
			<span class="lucca-icon icon-arrowChevronBottom" aria-hidden="true" ></span>
		</button>
	</legend>
	<div class="fieldset-content" [attr.hidden]="expanded ? null : 'hidden'">
		${content}
	</div>
</fieldset>`;
	else
		return `<fieldset class="fieldset ${horizontal} ${s}" aria-labelledby="fieldsetTitleContent1">
	<legend class="fieldset-title">
		<span class="fieldset-title-content" id="fieldsetTitleContent1">
			<span class="fieldset-title-content-text">
				${heading}
				${helper}
			</span>
		</span>
	</legend>
	<div class="fieldset-content">
		${content}
	</div>
</fieldset>`;
}

const Template: StoryFn<FieldsetBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	content: '<div class="grid mod-form" style="background-color: var(--palettes-neutral-50)"><div class="grid-column" style="--grid-colspan: 4">Lorem ipsum dolor sit amet.</div></div>',
	heading: 'Title',
	helper: '',
	size: null,
	expandable: false,
	expanded: false,
	horizontal: false,
};
