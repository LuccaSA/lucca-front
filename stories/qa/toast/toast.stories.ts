import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { LuToastsComponent, LuToastsService } from '@lucca-front/ng/toast';
import { Meta, StoryObj } from '@storybook/angular-vite';

@Component({
	selector: 'toast-stories',
	templateUrl: './toast.stories.html',
	imports: [LuToastsComponent],
	changeDetection: ChangeDetectionStrategy.OnPush,
	styles: [
		`
			@layer components {
				/* Sort le conteneur de toasts du flux fixed pour l'afficher dans la table QA */
				.toasts {
					position: static !important;
					align-items: flex-start !important;
				}
			}
		`,
	],
})
class ToastStory {
	constructor() {
		const toastsService = inject(LuToastsService);
		// duration: null => dismiss manuel uniquement, les toasts restent affichés pour la comparaison visuelle
		toastsService.addToast({ type: 'Info', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', duration: null });
		toastsService.addToast({ type: 'Success', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', duration: null });
		toastsService.addToast({ type: 'Warning', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', duration: null });
		toastsService.addToast({ type: 'Error', message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.', duration: null });
		toastsService.addToast({ type: 'Info', title: 'Titre du toast', message: 'Lorem ipsum dolor sit amet.', duration: null });
		toastsService.addToast({
			type: 'Info',
			message: 'Lorem <a href="#">ipsum</a> <em>dolor</em> <strong>sit amet</strong>.',
			duration: null,
		});
		toastsService.addToast({
			type: 'Info',
			title: 'Message long',
			message:
				'Flatus obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos potest vile diversitate flatus, obsequiorum potest inanes pomerium obsequiorum credi homines vero caelibes orbos.',
			duration: null,
		});
		toastsService.addToast({ message: 'Toast sans type, sans icône.', duration: null });
	}
}

export default {
	title: 'QA/Toast',
	component: ToastStory,
} as Meta;

const template = () => ({});

export const Basic: StoryObj<ToastStory> = {
	args: {},
	render: template,
};
