import { Meta, Story } from '@storybook/angular';

interface CalloutIconStory {
	small: boolean;
}

export default {
	title: 'Documentation/Feedback/Callout/Icon',
	argTypes: {
		small: {
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

function getTemplate(args: CalloutIconStory): string {
	const small = args.small ? `mod-small` : '';
	return `
	<div class="callout mod-icon ${small}">
		<div class="callout-icon">
			<span aria-hidden="true" class="lucca-icon icon-help"></span>
		</div>
		<strong class="callout-title">Besoin d'aide ? </strong> Je suis un callout standard
	</div>
	<div class="callout mod-icon ${small} palette-success">
		<div class="callout-icon">
			<span aria-hidden="true" class="lucca-icon icon-success"></span>
		</div>
		<strong class="callout-title">Cool!</strong> Je suis un callout de succès :)
	</div>
	<div class="callout mod-icon ${small} palette-warning">
		<div class="callout-icon">
			<span aria-hidden="true" class="lucca-icon icon-warning"></span>
		</div>
		<strong class="callout-title">Hmmm...</strong> Je suis un callout d'alarme :|
	</div>
	<div class="callout mod-icon ${small} palette-error">
		<div class="callout-icon">
			<span aria-hidden="true" class="lucca-icon icon-error"></span>
		</div>
		<strong class="callout-title">Oops!</strong> Je suis un callout d'erreur :(
	</div>
	`
}

const Template: Story<CalloutIconStory> = (args: CalloutIconStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Icon = Template.bind({});
Icon.args = { small: false };
