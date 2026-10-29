import { IconComponent } from '@lucca-front/ng/icon';
import { Meta, moduleMetadata, StoryObj } from '@storybook/angular-vite';

interface ThemesStory {}

export default {
	title: 'Documentation/Structure/BoxDisclosure/HTML&CSS/Themes',
	decorators: [
		moduleMetadata({
			imports: [IconComponent],
		}),
	],
	argTypes: {},
} as Meta;

function getTemplate(args: ThemesStory): string {
	return `<details class="boxDisclosure">
	<summary class="boxDisclosure-summary">
		<span class="boxDisclosure-summary-text">
			<span class="boxDisclosure-summary-title">Title</span>
			<span class="boxDisclosure-summary-subtitle">Subtitle</span>
		</span>
		<span class="boxDisclosure-summary-metadata">
			<ul class="listing mod-inline mod-divider">
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
			</ul>
		</span>
		<lu-icon class="boxDisclosure-summary-chevron" icon="arrowChevronBottom" />
	</summary>
	<div class="boxDisclosure-details">Custom content</div>
</details>
<details class="boxDisclosure mod-neutral">
	<summary class="boxDisclosure-summary">
		<span class="boxDisclosure-summary-text">
			<span class="boxDisclosure-summary-title">Title</span>
			<span class="boxDisclosure-summary-subtitle">Subtitle</span>
		</span>
		<span class="boxDisclosure-summary-metadata">
			<ul class="listing mod-inline mod-divider">
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
			</ul>
		</span>
		<lu-icon class="boxDisclosure-summary-chevron" icon="arrowChevronBottom" />
	</summary>
	<div class="boxDisclosure-details">Custom content</div>
</details>
<details class="boxDisclosure mod-sunken">
	<summary class="boxDisclosure-summary">
		<span class="boxDisclosure-summary-text">
			<span class="boxDisclosure-summary-title">Title</span>
			<span class="boxDisclosure-summary-subtitle">Subtitle</span>
		</span>
		<span class="boxDisclosure-summary-metadata">
			<ul class="listing mod-inline mod-divider">
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
			</ul>
		</span>
		<lu-icon class="boxDisclosure-summary-chevron" icon="arrowChevronBottom" />
	</summary>
	<div class="boxDisclosure-details">Custom content</div>
</details>
<details class="boxDisclosure mod-fancyLight">
	<summary class="boxDisclosure-summary">
		<span class="boxDisclosure-summary-text">
			<span class="boxDisclosure-summary-title">Title</span>
			<span class="boxDisclosure-summary-subtitle">Subtitle</span>
		</span>
		<span class="boxDisclosure-summary-metadata">
			<ul class="listing mod-inline mod-divider">
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
			</ul>
		</span>
		<lu-icon class="boxDisclosure-summary-chevron" icon="arrowChevronBottom" />
	</summary>
	<div class="boxDisclosure-details">Custom content</div>
</details>
<details class="boxDisclosure mod-fancyDark">
	<summary class="boxDisclosure-summary">
		<span class="boxDisclosure-summary-text">
			<span class="boxDisclosure-summary-title">Title</span>
			<span class="boxDisclosure-summary-subtitle">Subtitle</span>
		</span>
		<span class="boxDisclosure-summary-metadata">
			<ul class="listing mod-inline mod-divider">
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
				<li class="listing-item"><div class="listing-item-content">Metadata</div></li>
			</ul>
		</span>
		<lu-icon class="boxDisclosure-summary-chevron" icon="arrowChevronBottom" />
	</summary>
	<div class="boxDisclosure-details">Custom content</div>
</details>`;
}

const Template = (args: ThemesStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			flex-direction: column;
			gap: var(--pr-t-spacings-100);
		}`,
	],
});

export const Themes: StoryObj<ThemesStory> = {
	args: {},
	render: Template,
};
