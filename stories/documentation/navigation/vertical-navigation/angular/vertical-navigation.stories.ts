import { VerticalNavigationComponent, VerticalNavigationGroupComponent, VerticalNavigationItemComponent, VerticalNavigationLinkComponent } from '@lucca-front/ng/vertical-navigation';
import { Meta, moduleMetadata } from '@storybook/angular-vite';
import { IconsList } from '@/stories/icons-list';

interface VerticalNavigationStories {
	heading: string;
	level: number;
	label: string;
	icon: string;
	expanded: boolean;
}

export default {
	title: 'Documentation/Navigation/VerticalNavigation/Angular/Basic',
	argTypes: {
		heading: {
			control: {
				type: 'text',
			},
			description: 'Titre de la section. [PortalContent]',
			table: { category: 'inputs' },
		},
		level: {
			control: {
				type: 'number',
				min: 1,
				max: 6,
			},
			description: 'Niveau sémantique (`aria-level`) du titre de la section.',
			table: { category: 'inputs', defaultValue: { summary: '3' } },
		},
		label: {
			control: {
				type: 'text',
			},
			description: 'Modifie le texte du groupe. [PortalContent]',
			table: { category: 'inputs (vertical-navigation-group)' },
		},
		icon: {
			options: IconsList.map((i) => i.icon),
			control: {
				type: 'select',
			},
			description: 'Ajoute une icône au groupe.',
			table: { category: 'inputs (vertical-navigation-group)' },
		},
		expanded: {
			control: {
				type: 'boolean',
			},
			description: 'Déplie le groupe. Two-way.',
			table: { category: 'models (vertical-navigation-group)', defaultValue: { summary: 'true' } },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [VerticalNavigationComponent, VerticalNavigationLinkComponent, VerticalNavigationItemComponent, VerticalNavigationGroupComponent],
		}),
	],
	render: (args: VerticalNavigationStories) => {
		const heading = ` heading="${args.heading ? args.heading : ''}"`;
		const level = args.level && args.level !== 3 ? ` level="${args.level}"` : '';
		const icon = args.icon ? ` icon="${args.icon}"` : '';
		const expanded = args.expanded === false ? ` [expanded]="false"` : '';
		return {
			template: `<lu-vertical-navigation${heading}${level}>
	<lu-vertical-navigation-group label="${args.label}"${icon}${expanded}>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 1</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#" aria-current="page">Item 2</a>
		</lu-vertical-navigation-item>
		<lu-vertical-navigation-item>
			<a luVerticalNavigationLink href="#">Item 3</a>
		</lu-vertical-navigation-item>
	</lu-vertical-navigation-group>
 	<lu-vertical-navigation-item>
		<a luVerticalNavigationLink href="#" icon="heartFilled">Item 4</a>
	</lu-vertical-navigation-item>
</lu-vertical-navigation>`,
		};
	},
} as Meta;
export const Basic = {
	args: {
		heading: 'Section',
		level: 3,
		label: 'Group 1',
		icon: 'heart',
		expanded: true,
	},
};
