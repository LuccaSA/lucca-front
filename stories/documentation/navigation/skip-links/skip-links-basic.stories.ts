import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSkipLinksComponent, SkipLinkDirective, SkipLinksService } from '@lucca-front/ng/a11y';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'skip-links-story',
	imports: [LuSkipLinksComponent, SkipLinkDirective],
	template: `
		<div><input id="showSkipLinks" type="checkbox" />&ngsp;<label for="showSkipLinks">Show skip links</label></div>
		<lu-skip-links />
		<div id="lucca-banner-solutions-container" class="skipLinks_target" tabindex="-1">Banner <a href="#">Banner</a> Banner</div>
		<div id="navSide" class="skipLinks_target" tabindex="-1">NavSide <a href="#">NavSide</a> NavSide</div>
		<div id="main-content" class="skipLinks_target" tabindex="-1">Content <a href="#">Content</a> Content</div>

		<div luSkipLinkTarget luSkipLinkLabel="A – Go to custom element (without ID)">A – Custom <a href="#">element</a> (without ID)</div>

		<div class="skipLinks_target" tabindex="-1" luSkipLinkTarget="customElementWithIDAsParameter" luSkipLinkLabel="B – Go to custom element (with ID as parameter)">
			B – Custom <a href="#">element</a> (with ID as parameter)
		</div>

		<div id="customElementWithIDInHTML" luSkipLinkTarget luSkipLinkLabel="C – Go to custom element (with ID in HTML)">C – Custom <a href="#">element</a> (with ID in HTML)</div>

		<div
			class="skipLinks_target"
			tabindex="-1"
			id="elementWithDifferentIDinTheHTMLandParameter"
			luSkipLinkTarget="customElementWithDifferentIDinTheHTMLandParameter"
			luSkipLinkLabel="D – Go to custom element (with different ID in the HTML and parameter)"
		>
			D – Custom <a href="#">element</a> (with different ID in the HTML and parameter)
		</div>

		<div
			id="customElementWithIdenticalIDinTheHTMLandParameter"
			luSkipLinkTarget="customElementWithIdenticalIDinTheHTMLandParameter"
			luSkipLinkLabel="E – Go to custom element (with identical ID in the HTML and parameter)"
		>
			E – Custom <a href="#">element</a> (with identical ID in the HTML and parameter)
		</div>

		<div class="pr-u-inlineSizeFitContent" tabindex="0" luSkipLinkTarget="customElementWithTabindex" luSkipLinkLabel="F – Go to custom element with tabindex">
			F – Custom <a href="#">element</a> with tabindex
		</div>

		<button class="button mod-outlined pr-u-inlineSizeFitContent" type="button" luSkipLinkTarget="customElementFocusable" luSkipLinkLabel="G – Go to custom element focusable">
			G – Custom element focusable
		</button>
	`,
	styles: [
		`
			:host:has(#showSkipLinks:checked) ::ng-deep .skipLinks {
				position: static;
			}

			:host:has(#showSkipLinks:checked) ::ng-deep .skipLinks-action {
				position: unset;
				inline-size: unset;
				block-size: unset;
				padding-block: var(--pr-t-spacings-50);
				padding-inline: var(--pr-t-spacings-100);
				margin: 0;
				opacity: 0.25;
				pointer-events: none;

				&:focus-visible {
					opacity: 1;
				}
			}

			:host {
				display: flex;
				flex-direction: column;
				gap: var(--pr-t-spacings-200);
			}
		`,
	],
	changeDetection: ChangeDetectionStrategy.OnPush,
})
class SkipLinksStory {}

export default {
	title: 'Documentation/Navigation/SkipLinks/Basic',
	component: SkipLinksStory,
	decorators: [
		applicationConfig({
			providers: [SkipLinksService],
		}),
	],
} as Meta;

const Template = (props: SkipLinksStory) => ({ props });

const code = `
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
@Component({
	imports: [LuSkipLinksComponent],
	selector: 'app-component',
	template: \`<lu-skip-links />\`,
})
class AppComponent {
}`;

export const Basic: StoryObj<SkipLinksStory> = {
	args: {},
	render: Template,
};
Basic.parameters = {
	// Disable controls as they are not modifiable because of ComponentWrapper
	controls: { include: [] },
	docs: {
		source: {
			language: 'ts',
			type: 'code',
			code,
		},
	},
};
