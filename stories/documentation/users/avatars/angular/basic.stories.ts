import { setStoryOptions } from '@/helpers/stories';
import { provideHttpClient } from '@angular/common/http';
import { provideAnimations } from '@angular/platform-browser/animations';
import { LuDisplayInitials, LuUserPictureComponent, USER_PICTURE_SIZE } from '@lucca-front/ng/user';
import { LuUserPopoverDirective } from '@lucca-front/ng/user-popover';
import { applicationConfig, Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';
import { finn, georges, jake } from '../../user.mocks';

export default {
	title: 'Documentation/Users/Avatar/Angular/Basic',
	decorators: [
		moduleMetadata({
			imports: [LuUserPictureComponent, LuUserPopoverDirective],
		}),
		applicationConfig({
			providers: [provideAnimations(), provideHttpClient()],
		}),
	],
	render: ({ user, size, placeholder, softRounded, imageLoadingAttribute, displayFormat, AI }) => {
		const argAI = AI ? ` AI` : ``;
		const argSize = size ? ` size="${size}"` : ``;
		const argPlaceholder = placeholder ? ` placeholder` : ``;
		const argSoftRounded = softRounded ? ` softRounded` : ``;
		const argImageLoading = imageLoadingAttribute && imageLoadingAttribute !== 'lazy' ? ` imageLoadingAttribute="${imageLoadingAttribute}"` : ``;
		return {
			template: `<button class="userPopover_trigger" type="button" [luUserPopover]="user">
	<lu-user-picture
		[user]="user"
		[displayFormat]="displayFormat"
		data-testid="lu-user-picture"
		${argSize}${argPlaceholder}${argSoftRounded}${argImageLoading}${argAI}/>
</button>`,
			props: {
				user,
				displayFormat,
			},
		};
	},
	argTypes: {
		user: {
			description: '[Story] Affiche la photo de l’utilisateur ou ses initiales.',
			options: ['Avec image', 'Avec image erronée', 'Sans image'],
			mapping: {
				'Avec image': finn,
				'Avec image erronée': georges,
				'Sans image': jake,
			},
			table: { category: 'inputs' },
		},
		size: {
			description: "Taille de l'avatar.",
			options: setStoryOptions(USER_PICTURE_SIZE),
			control: {
				type: 'select',
			},
			table: { category: 'inputs', defaultValue: { summary: 'M' } },
		},
		displayFormat: {
			description: 'Format d’affichage des initiales. F pour prénom (firstname) L pour nom (lastname).',
			options: Object.values(LuDisplayInitials),
			control: {
				type: 'select',
			},
			table: { category: 'inputs', type: { summary: 'LuDisplayInitials' } },
		},
		placeholder: {
			description: 'Applique un placeholder d’avatar.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		softRounded: {
			description: 'Applique des coins légèrement arrondis à la place de la forme circulaire.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
		imageLoadingAttribute: {
			description: 'Valeur de l’attribut `loading` de l’image.',
			options: ['lazy', 'eager'],
			control: {
				type: 'select',
			},
			table: { category: 'inputs', defaultValue: { summary: 'lazy' } },
		},
		AI: {
			description: 'Avatar utilisé pour une réponse faite par IA.',
			control: {
				type: 'boolean',
			},
			table: { category: 'inputs', defaultValue: { summary: 'false' } },
		},
	},
} as Meta;

export const Basic: StoryObj<Omit<LuUserPictureComponent, 'size'> & { size: string }> = {
	args: {
		user: finn,
		size: '',
		placeholder: false,
		softRounded: false,
		imageLoadingAttribute: 'lazy',
		displayFormat: LuDisplayInitials.firstlast,
		AI: false,
	},
};
