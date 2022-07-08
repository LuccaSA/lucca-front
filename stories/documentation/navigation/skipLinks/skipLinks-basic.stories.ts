import { Meta, Story } from '@storybook/angular';

interface SkipLinksBasicStory {
	disabled: boolean;
}

export default {
	title: 'Documentation/Navigation/SkipLinks/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: SkipLinksBasicStory): string {
	return `
		<nav id="top" class="skipLinks" aria-label="Menu d’évitement">
			<ul class="skipLinks-list">
				<li class="skipLinks-list-item"><a href="#lucca-banner" class="skipLinks-list-item-action palette-grey">Aller à l’entête de la page</a></li>
				<li class="skipLinks-list-item"><a href="#navSide" class="skipLinks-list-item-action palette-grey">Aller à la navigation principale</a></li>
				<li class="skipLinks-list-item"><a href="#main-content" class="skipLinks-list-item-action palette-grey">Aller au contenu principal</a></li>
			</ul>
		</nav>
	`;
}

const Template: Story<SkipLinksBasicStory> = (args: SkipLinksBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
