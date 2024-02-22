import { Meta, StoryFn } from '@storybook/angular';

interface FieldsetBasicStory {
	horizontal: boolean;
	expandable: boolean;
	helper?: string;
	title: string;
	content: string;
}

export default {
	title: 'Documentation/Forms/Fieldset/Basic',
	argTypes: {
		horizontal: {
			description: 'Incompatible avec les mod expandable.',
			control: {
				type: 'boolean',
			},
		},
		expandable: {
			control: {
				type: 'boolean',
			},
		},
		helper: {
			control: {
				type: 'text',
			},
		},
		title: {
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
	const expandable = args.expandable ? 'mod-expandable' : '';
	const helper = args.helper ? '<span class="fieldset-title-content-text-helper">{{ helper }}</span>' : '';
	const title = args.title;
	const content = args.content;

	if (args.expandable === true)
		return `
		<fieldset class="fieldset mod-expandable" aria-labelledby="fieldsetTitleContent1">
			<legend class="fieldset-title">
				<button type="button" class="fieldset-title-content" id="fieldsetTitleContent1" [attr.aria-expanded]="expanded" (click)="expanded = !expanded">
					<span class="fieldset-title-content-text">
						${title}
						${helper}
					</span>
					<span class="lucca-icon" aria-hidden="true" [class.icon-collapse]="expanded" [class.icon-expand]="!expanded"></span>
				</button>
			</legend>
			<div class="fieldset-content" [attr.hidden]="expanded ? null : 'hidden'">
				${content}
			</div>
		</fieldset>
	`;
	else
		return `
		<fieldset class="fieldset ${horizontal}" aria-labelledby="fieldsetTitleContent1">
			<legend class="fieldset-title">
				<span class="fieldset-title-content" id="fieldsetTitleContent1">
					<span class="fieldset-title-content-text">
						${title}
						${helper}
					</span>
				</span>
			</legend>
			<div class="fieldset-content">
				${content}
			</div>
		</fieldset>
	`;
}

const Template: StoryFn<FieldsetBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {
	horizontal: false,
	expandable: false,
	helper: '',
	title: 'Title',
	content: '<div class="grid mod-form" style="background-color: var(--palettes-neutral-50)"><div class="grid-column" style="--grid-colspan: 4">Lorem ipsum dolor sit amet.</div></div>',
};
