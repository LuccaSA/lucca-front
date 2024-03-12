import { Component } from '@angular/core';
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
import { Meta, StoryFn } from '@storybook/angular';

@Component({
	selector: 'skip-links-story',
	standalone: true,
	imports: [LuSkipLinksComponent],
	template: `
		<lu-skip-links></lu-skip-links>
		<div id="lucca-banner-solutions-container">
			<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-app"></span></button>
			<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-peopleGroup"></span></button>
			<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-transportRocket"></span></button>
			<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-signInfo"></span></button>
			<button type="button" class="button mod-onlyIcon mod-text" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-bell"></span></button>
		</div>
		<div id="navSide">
			<button type="button" class="button mod-withIcon palette-product"><span aria-hidden="true" class="lucca-icon icon-mailPaperPlane"></span>Internal navigation</button>
			<button type="button" class="button mod-withIcon palette-product"><span aria-hidden="true" class="lucca-icon icon-timeClock"></span>Internal navigation</button>
			<button type="button" class="button mod-withIcon palette-product"><span aria-hidden="true" class="lucca-icon icon-eye"></span>Internal navigation</button>
		</div>
		<div id="main-content">
			<a href="#" class="link">Content link</a>
			<a href="#" class="link">Content link</a>
			<a href="#" class="link">Content link</a>
			<a href="#" class="link">Content link</a>
		</div>
	`,
	styles: [
		`
			#navSide {
				margin-top: var(--pr-t-spacings-XS);
			}

			#main-content {
				margin-top: var(--pr-t-spacings-XS);
			}

			.link {
				margin-right: var(--pr-t-spacings-XS);
			}
		`,
	],
})
class SkipLinksStory {}

export default {
	title: 'Documentation/Navigation/SkipLinks/Basic',
	component: SkipLinksStory,
} as Meta;

const Template: StoryFn<SkipLinksStory> = (props) => ({ props });

const code = `
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
@Component({
	standalone: true,
	imports: [LuSkipLinksComponent],
	selector: 'app-component',
	template: \`<lu-skip-links></lu-skip-links>\`,
})
class AppComponent {
}`;

export const Basic = Template.bind({});
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
