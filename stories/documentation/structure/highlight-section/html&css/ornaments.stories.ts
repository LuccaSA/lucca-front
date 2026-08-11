import { Meta, StoryObj } from '@storybook/angular-vite';

interface OrnamentStory {}

export default {
	title: 'Documentation/Structure/Highlight section/HTML&CSS/Ornaments',
	argTypes: {},
} as Meta;

function getTemplate(args: OrnamentStory): string {
	return `<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleStart">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120" width="120" height="120">
			<path fill="var(--palettes-assets-primary, var(--palettes-assets-primary-light, #ffe0d1))" d="M66.357 83.91c8.34 51.878-36.03 65.172-54.632 58.493-18.634-6.679-56.032-47.955-21.827-70.847 34.206-22.891 71.67-17.25 76.459 12.354"/>
			<path fill="var(--palettes-assets-secondary, var(--palettes-assets-secondary-light, #c5eebe)" d="M32.621 24.645c-12.543-5.609-7.276-11.948-3.194-15.1 4.116-3.154 16.56-10.754 16.725.066.164 10.786-6.354 18.22-13.531 15.034"/>
			<path fill="var(--palettes-assets-brand, var(--palettes-assets-brand-dark, #fae999)" d="M112.885 112.652c-14.995 18.416-23.6 7.152-27.209-.886S74.39 80.06 92.958 84.206c18.57 4.113 28.5 17.941 19.927 28.446"/>
		</svg>
	</div>
	<div class="highlightSection-bubbleEnd">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120" width="120" height="120">
			<path fill="var(--palettes-assets-primary, var(--palettes-assets-primary-light, #ffe0d1))" d="M56.943 89.101c23.586 48.13-7.992 53.784-28.058 52.797-20.096-.987-76.378-9.664-49.968-42.146 26.416-32.482 64.536-38.17 78.026-10.65"/>
			<path fill="var(--palettes-assets-secondary, var(--palettes-assets-secondary-light, #c5eebe)" d="M98.885 97.36c-10.627-5.605-5.498-10.538-1.653-12.857s15.449-7.768 14.739 1.288c-.676 9.022-7.015 14.758-13.086 11.57"/>
			<path fill="var(--palettes-assets-brand, var(--palettes-assets-brand-dark, #fae999)" d="M11.234 18.363C16.173-4.898 28.88 1.742 35.681 7.56c6.84 5.814 24.28 24.223 6.003 28.384-18.278 4.132-33.289-4.297-30.45-17.578"/>
		</svg>
	</div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Both</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleStart">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120" width="120" height="120">
			<path fill="var(--palettes-assets-primary, var(--palettes-assets-primary-light, #ffe0d1))" d="M66.357 83.91c8.34 51.878-36.03 65.172-54.632 58.493-18.634-6.679-56.032-47.955-21.827-70.847 34.206-22.891 71.67-17.25 76.459 12.354"/>
			<path fill="var(--palettes-assets-secondary, var(--palettes-assets-secondary-light, #c5eebe)" d="M32.621 24.645c-12.543-5.609-7.276-11.948-3.194-15.1 4.116-3.154 16.56-10.754 16.725.066.164 10.786-6.354 18.22-13.531 15.034"/>
			<path fill="var(--palettes-assets-brand, var(--palettes-assets-brand-dark, #fae999)" d="M112.885 112.652c-14.995 18.416-23.6 7.152-27.209-.886S74.39 80.06 92.958 84.206c18.57 4.113 28.5 17.941 19.927 28.446"/>
		</svg>
	</div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">Start</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div class="highlightSection-bubbleEnd">
		<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 120 120" width="120" height="120">
			<path fill="var(--palettes-assets-primary, var(--palettes-assets-primary-light, #ffe0d1))" d="M56.943 89.101c23.586 48.13-7.992 53.784-28.058 52.797-20.096-.987-76.378-9.664-49.968-42.146 26.416-32.482 64.536-38.17 78.026-10.65"/>
			<path fill="var(--palettes-assets-secondary, var(--palettes-assets-secondary-light, #c5eebe)" d="M98.885 97.36c-10.627-5.605-5.498-10.538-1.653-12.857s15.449-7.768 14.739 1.288c-.676 9.022-7.015 14.758-13.086 11.57"/>
			<path fill="var(--palettes-assets-brand, var(--palettes-assets-brand-dark, #fae999)" d="M11.234 18.363C16.173-4.898 28.88 1.742 35.681 7.56c6.84 5.814 24.28 24.223 6.003 28.384-18.278 4.132-33.289-4.297-30.45-17.578"/>
		</svg>
	</div>
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">End</p>
		</div>
	</div>
</div>

<div class="highlightSection mod-light">
	<div class="highlightSection-content">
		<div class="highlightSection-content-slot">
			<p class="pr-u-fontWeightSemiBold">None</p>
		</div>
	</div>
</div>`;
}

const Template = (args: OrnamentStory) => ({
	props: args,
	template: getTemplate(args),
	styles: [
		`
		:host {
			display: flex;
			flex-direction: column;
			gap: var(--pr-t-spacings-200);
		}`,
	],
});

export const Ornaments: StoryObj<OrnamentStory> = {
	args: {},
	render: Template,
};
