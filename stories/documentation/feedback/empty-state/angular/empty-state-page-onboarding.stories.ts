import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent, EmptyStatePageIllustration } from '@lucca-front/ng/empty-state';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Empty State/Angular/Onboarding page',
	component: EmptyStatePageComponent,
	decorators: [
		moduleMetadata({
			imports: [EmptyStatePageComponent, ButtonComponent, HttpClientModule, TagComponent, ListingComponent, ListingItemComponent, EmptyStatePageIllustration],
		}),
	],
	render: (args) => {
		const { heading, hx } = args;
		const paramIllustrationUrl = args['src'] === '' ? `` : ` src="${args['src']}"`;
		const paramIllustrationAlt = args['alt'] === '' ? `` : ` alt="${args['alt']}"`;
		return {
			styles: [
				`
:host{
	display: flex;
	flex-direction: column;
	min-block-size: 30rem;
}
lu-empty-state-page {
	--palettes-text: var(--palettes-pagga-text);
	--palettes-0: var(--palettes-pagga-0);
	--palettes-25: var(--palettes-pagga-25);
	--palettes-50: var(--palettes-pagga-50);
	--palettes-100: var(--palettes-pagga-100);
	--palettes-200: var(--palettes-pagga-200);
	--palettes-300: var(--palettes-pagga-300);
	--palettes-400: var(--palettes-pagga-400);
	--palettes-500: var(--palettes-pagga-500);
	--palettes-600: var(--palettes-pagga-600);
	--palettes-700: var(--palettes-pagga-700);
	--palettes-800: var(--palettes-pagga-800);
	--palettes-900: var(--palettes-pagga-900);
}
`,
			],
			template: `<lu-empty-state-page
	heading="${heading}"
	[slotTop]="slotTop"
	[illustration]="illustration"
	[description]="description"
	hx="${hx}"
>
	<button luButton type="button">Créer une campagne</button>
</lu-empty-state-page>

<ng-template #slotTop><lu-tag label="Inclus dans votre abonnement" /></ng-template>
<ng-template #description>
	<lu-listing orderedFancy>
		<lu-listing-item>Les responsables proposent les augmentations.</lu-listing-item>
		<lu-listing-item>Les augmentations sont commentées, révisées.</lu-listing-item>
		<lu-listing-item>Vous contrôlez, validez ces augmentations et décidez de leur mise en œuvre.</lu-listing-item>
	</lu-listing>
</ng-template>
<ng-template #illustration>
	<lu-empty-state-page-illustration${paramIllustrationUrl}${paramIllustrationAlt} />
</ng-template>`,
		};
	},
	argTypes: {
		heading: {
			description: 'Titre de l’empty state.',
		},
		hx: {
			control: {
				type: 'number',
				min: 1,
				max: 6,
			},
			description: 'Définit le niveau sémantique du titre.',
		},
		src: {
			description: 'URL de l’illustration.',
		},
		alt: {
			description: 'Texte alternatif de l’illustration restitué par les lecteurs d’écran.',
		},
	},
} as Meta;

export const Page: StoryObj<EmptyStatePageComponent & { src: string; alt: string }> = {
	args: {
		heading: 'Augmentez vos collaborateurs en 3 étapes',
		src: 'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/pagga/mealvoucher-icecream.svg',
		alt: '',
		hx: 1,
	},
};
