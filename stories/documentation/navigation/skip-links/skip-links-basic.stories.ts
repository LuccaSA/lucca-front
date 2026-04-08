import { ChangeDetectionStrategy, Component } from '@angular/core';
import { LuSkipLinksComponent, SkipLinkDirective, SkipLinksService } from '@lucca-front/ng/a11y';
import { applicationConfig, Meta, StoryObj } from '@storybook/angular';

@Component({
	selector: 'skip-links-story',
	imports: [LuSkipLinksComponent, SkipLinkDirective],
	template: `
		<lu-skip-links />
		<div id="lucca-banner-solutions-container" class="pr-u-focusVisible" tabindex="0">Banner <a href="#" class="link">Banner</a> Banner</div>
		<div id="navSide" class="pr-u-focusVisible" tabindex="0">NavSide <a href="#" class="link">NavSide</a> NavSide</div>
		<div id="main-content" class="pr-u-focusVisible" tabindex="0">Content <a href="#" class="link">Content</a> Content</div>

		<div class="pr-u-focusVisible" tabindex="0" id="customElementWithIDInHTML" luSkipLinkTarget luSkipLinkLabel="Go to custom element (with ID in HTML)">Custom element (with ID in HTML)</div>

		<div class="pr-u-focusVisible" tabindex="0" luSkipLinkTarget="customElementWithIDAsParameter" luSkipLinkLabel="Go to custom element (with ID as parameter)">
			Custom element (with ID as parameter)
		</div>

		<div
			class="pr-u-focusVisible"
			tabindex="0"
			id="customElementWithIdenticalIDinTheHTMLandParameter"
			luSkipLinkTarget="customElementWithIdenticalIDinTheHTMLandParameter"
			luSkipLinkLabel="Go to custom element (with identical ID in the HTML and parameter)"
		>
			Custom element (with identical ID in the HTML and parameter)
		</div>

		<div
			class="pr-u-focusVisible"
			tabindex="0"
			id="elementWithDifferentIDinTheHTMLandParameter"
			luSkipLinkTarget="customElementWithDifferentIDinTheHTMLandParameter"
			luSkipLinkLabel="Go to custom element (with different ID in the HTML and parameter)"
		>
			Custom element (with different ID in the HTML and parameter)
		</div>

		<div class="pr-u-focusVisible" tabindex="0" luSkipLinkTarget luSkipLinkLabel="Go to custom element (without ID)">Custom element (without ID)</div>
	`,
	styles: [
		`
			:host ::ng-deep .skipLinks {
				position: static;
			}

			:host ::ng-deep .skipLinks-action {
				position: unset;
				inline-size: unset;
				block-size: unset;
				padding-block: var(--pr-t-spacings-50);
				padding-inline: var(--pr-t-spacings-100);
				margin: 0;
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
