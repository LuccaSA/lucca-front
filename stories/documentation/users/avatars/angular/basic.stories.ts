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
	render: ({ user, sizes, placeholder, displayFormat, AI }) => {
		const argAI = AI ? ` AI` : ``;
		const argSize = sizes ? ` size="${sizes}"` : ``;
		return {
			template: `<button class="userPopover_trigger" type="button" [luUserPopover]="user">
	<lu-user-picture
		[user]="user"
		[displayFormat]="displayFormat"
		data-testid="lu-user-picture"
		[class.mod-placeholder]="placeholder"
		${argSize}${argAI}/>
</button>`,
			props: {
				user,
				sizes,
				placeholder,
				displayFormat,
				AI,
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
		},
		sizes: {
			description: "Taille de l'avatar.",
			options: setStoryOptions(USER_PICTURE_SIZE),
			control: {
				type: 'select',
			},
		},
		displayFormat: {
			description: 'Format d’affichage des initiales. F pour prénom (firstname) L pour nom (lastname).',
		},
		placeholder: {
			description: 'Applique un placeholder d’avatar.',
			control: {
				type: 'boolean',
			},
		},
		AI: {
			description: 'Avatar utilisé pour une réponse faite par IA.',
			control: {
				type: 'boolean',
			},
		},
	},
} as Meta;

export const Basic: StoryObj<LuUserPictureComponent & { sizes: string; placeholder: boolean; AI: boolean }> = {
	args: {
		user: finn,
		sizes: '',
		placeholder: false,
		displayFormat: LuDisplayInitials.firstlast,
		AI: false,
	},
};
