import { HttpClientModule } from '@angular/common/http';
import { ButtonComponent } from '@lucca-front/ng/button';
import { EmptyStatePageComponent, EmptyStatePageIllustration } from '@lucca-front/ng/empty-state';
import { ListingComponent, ListingItemComponent } from '@lucca-front/ng/listing';
import { TagComponent } from '@lucca-front/ng/tag';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular';

export default {
	title: 'Documentation/Feedback/Empty State/Angular/Activation page',
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
`,
			],
			template: `<lu-empty-state-page class="palette-pagga"
	heading="${heading}"
	[slotTop]="slotTop"
	[illustration]="illustration"
	[description]="description"
	hx="${hx}"
>
	<button luButton type="button">Créer une campagne</button>
</lu-empty-state-page>

<ng-template #slotTop><span class="highlight">Inclus dans votre abonnement</span></ng-template>
<ng-template #description>
	<lu-listing ordered fancy>
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
	argTypes: {},
} as Meta;

export const Page: StoryObj<EmptyStatePageComponent & { src: string; alt: string }> = {
	args: {
		heading: 'Augmentez vos collaborateurs en 3 étapes',
		src: 'https://dummyimage.com/720x640',
		alt: '',
		hx: 1,
	},
};
