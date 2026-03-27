import { Meta, StoryObj } from '@storybook/angular';

interface HorizontalNavigationCountStory {
	noBorder: boolean;
	header: boolean;
	s: boolean;
	disabled: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/HTML&CSS/Count',
	argTypes: {
		noBorder: {
			control: {
				type: 'boolean',
			},
			description: 'Supprime la bordure inférieure de la navigation.',
		},
		header: {
			control: {
				type: 'boolean',
			},
			description: 'Adapte le style de la navigation pour une utilisation dans un Page header.',
		},
		s: {
			control: {
				type: 'boolean',
			},
			description: 'Modifie la taille du composant.',
		},
		disabled: {
			control: {
				type: 'boolean',
			},
			description: 'Désactive un élément de navigation.',
		},
		vertical: {
			control: {
				type: 'boolean',
			},
			table: { disable: true },
		},
	},
} as Meta;

function getTemplate(args: HorizontalNavigationCountStory): string {
	const noBorder = args.noBorder ? ` mod-noBorder` : '';
	const header = args.header ? ` mod-header` : '';
	const s = args.s ? ` mod-S` : '';
	const vertical = args.vertical ? ` mod-vertical` : '';
	if (args.disabled)
		return `<div class="horizontalNavigation${s}${noBorder}${header}${vertical}">
	<ul class="horizontalNavigation-list">
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a class="horizontalNavigation-list-item-action is-disabled">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
	</ul>
</div>`;
	else {
		return `<div class="horizontalNavigation${s}${noBorder}${header}${vertical}">
	<ul class="horizontalNavigation-list">
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action" aria-current="page">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
		<li class="horizontalNavigation-list-item">
			<a href="#" class="horizontalNavigation-list-item-action">
				Page
				<span class="numericBadge">9</span>
			</a>
		</li>
	</ul>
</div>`;
	}
}

const Template = (args: HorizontalNavigationCountStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Count: StoryObj<HorizontalNavigationCountStory> = {
	args: { noBorder: false, header: false, s: false, disabled: false, vertical: false },
	render: Template,
};
