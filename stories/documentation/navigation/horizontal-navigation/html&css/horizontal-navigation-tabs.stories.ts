import { Meta, StoryObj } from '@storybook/angular';

interface HorizontalNavigationBasicStory {
	noBorder: boolean;
	header: boolean;
	s: boolean;
	disabled: boolean;
	vertical: boolean;
}

export default {
	title: 'Documentation/Navigation/HorizontalNavigation/HTML&CSS/Tabs',
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
			description: 'Adapte le style de la navigation pour une utilisation dans Page header.',
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
		},
	},
} as Meta;

function getTemplate(args: HorizontalNavigationBasicStory): string {
	const noBorder = args.noBorder ? ` mod-noBorder` : '';
	const header = args.header ? ` mod-header` : '';
	const s = args.s ? ` mod-S` : '';
	const vertical = args.vertical ? ` mod-vertical` : '';
	const disabled = args.disabled ? ` disabled` : ``;

	return `<div class="horizontalNavigation${s}${noBorder}${header}${vertical}">
	<ul class="horizontalNavigation-list" role="tablist">
		<li class="horizontalNavigation-list-item" role="presentation">
			<button type="button" class="horizontalNavigation-list-item-action" role="tab" id="tab1" aria-controls="panel1" aria-selected="true">
				Tab 1
			</button>
		</li>
		<li class="horizontalNavigation-list-item" role="presentation">
			<button type="button" class="horizontalNavigation-list-item-action" role="tab" id="tab2" aria-controls="panel2" tabindex="-1">
				Tab 2
			</button>
		</li>
		<li class="horizontalNavigation-list-item" role="presentation">
			<button type="button" class="horizontalNavigation-list-item-action" role="tab" id="tab3" aria-controls="panel3" tabindex="-1"${disabled}>
				Tab 3
			</button>
		</li>
	</ul>
</div>

<div id="panel1" aria-labelledby="tab1" role="tabpanel" tabindex="0" class="horizontalNavigation_panel is-active">
	<p>Content 1</p>
</div>

<div id="panel2" aria-labelledby="tab2" role="tabpanel" tabindex="0" class="horizontalNavigation_panel">
	<p>Content 2</p>
</div>

<div id="panel3" aria-labelledby="tab3" role="tabpanel" tabindex="0" class="horizontalNavigation_panel">
	<p>Content 3</p>
</div>`;
}

const Template = (args: HorizontalNavigationBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic: StoryObj<HorizontalNavigationBasicStory> = {
	args: { noBorder: false, header: false, s: false, disabled: false, vertical: false },
	render: Template,
};
