import { Meta, StoryObj } from '@storybook/angular';

interface ErrorBasicStory {}

export default {
	title: 'Documentation/Feedback/Error/In App Layout',
} as Meta;

function getTemplate(args: ErrorBasicStory): string {
	return `<div class="appLayout">
	<div class="appLayout-banner">
		banner
	</div>
	<div class="appLayout-navSide">
		navSide
	</div>
	<div class="appLayout-main">
			<main role="main" class="mainLayout">
					<div class="mainLayout-content">
							<div class="mainLayout-content-inside">
									<div class="errorPage">
										<section class="errorPage-section">
											<div class="errorPage-section-info">
												<h1 class="errorPage-section-info-title">Titre de l’erreur</h1>
												<p class="errorPage-section-info-text">Vous n’êtes pas autorisé à consulter cette page ou cette ressource.</p>
												<p><a href="#" class="errorPage-section-info-link">Revenir à la page précédente</a></p>
											</div>
											<img src="https://cdn.lucca.fr/errors/svg/403-lucca.svg" alt="Erreur 403" class="errorPage-section-image">
										</section>
									</div>
							</div>
					</div>
			</main>
	</div>
</div>
	`;
}

const Template = (args: ErrorBasicStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
@layer components {
	.appLayout {
		--components-appLayout-blockSize: 100%;
		--components-appLayout-inlineSize: 100%;
		resize: vertical;
		overflow: hidden;
		min-block-size: 394px;
		border-radius: var(--pr-t-border-radius-100);
		border: 1px solid var(--palettes-neutral-200);

		> * {


			&:not(.appLayout-main) {
				display: grid;
				place-items: center;
			}

			&.appLayout-banner {
				padding-block: 0;
				font-family: monospace;
			}

			&.appLayout-navSide {
				font-family: monospace;
				padding: var(--pr-t-spacings-150) var(--pr-t-spacings-400);
			}
		}
	}

	.appLayout-banner {
		background-color: var(--pr-t-elevation-surface-raised);
		box-shadow: var(--pr-t-elevation-shadow-overflow);
		position: relative;
		z-index: 2;

		&::before {
			content: '';
			position: absolute;
			inset-inline-start: var(--pr-t-spacings-100);
			width: 122px;
			height: 32px;
			background-color: var(--palettes-neutral-50);
			border-radius: var(--pr-t-border-radius-50);
		}

		&::after {
			content: '';
			position: absolute;
			inset-inline-end: var(--pr-t-spacings-100);
			width: 32px;
			height: 32px;
			background-color: var(--palettes-neutral-200);
			border-radius: var(--pr-t-border-radius-full);
		}
	}

	.appLayout-navSide {
		background-color: var(--palettes-neutral-500);
	}

	.mainLayout-sidebar {
		background-color: var(--palettes-neutral-50);
		padding: var(--pr-t-spacings-150);
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		color: var(--palettes-brand-700);
		font-family: monospace;
	}

	.mainLayout-content-inside {
		gap: var(--pr-t-spacings-100);
	}

	.container {
		--commons-container-maxWidth: 50rem;
	}

	.fakeContent {
		background-color: var(--pr-t-elevation-surface-raised);
		border: 1px solid var(--palettes-neutral-50);
		padding: var(--pr-t-spacings-150);
		align-items: center;
		justify-content: center;
		display: flex;
		flex-direction: column;
		color: var(--palettes-brand-700);
		font-family: monospace;
		white-space: nowrap;
	}
}
				`,
	],
});

export const Basic: StoryObj<ErrorBasicStory> = {
	args: {},
	render: Template,
};
