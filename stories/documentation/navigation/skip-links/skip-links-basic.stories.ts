import { Component } from '@angular/core';
import { LuSkipLinksComponent } from '@lucca-front/ng/a11y';
import { componentWrapperDecorator, Meta, moduleMetadata, Story } from '@storybook/angular';

@Component({
	selector: 'skip-links-story',
	standalone: true,
	imports: [LuSkipLinksComponent],
	template: `
		<button autofocus class="u-mask"></button> <!-- Only for documentation: set focus inside iframe  -->
		<lu-skip-links></lu-skip-links>
		<div id="lucca-banner-solutions-container">
			<button type="button" class="actionIcon" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-apps"></span></button>
			<button type="button" class="actionIcon" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-userGroup"></span></button>
			<button type="button" class="actionIcon" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-rocket"></span></button>
			<button type="button" class="actionIcon" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-info"></span></button>
			<button type="button" class="actionIcon" luTooltip="Modifier"><span aria-hidden="true" class="lucca-icon icon-notification"></span></button>
		</div>
		<div id="navSide">
			<button type="button" class="button mod-icon palette-secondary"><span aria-hidden="true" class="lucca-icon icon-send"></span>Internal navigation</button>
			<button type="button" class="button mod-icon palette-secondary"><span aria-hidden="true" class="lucca-icon icon-clock"></span>Internal navigation</button>
			<button type="button" class="button mod-icon palette-secondary"><span aria-hidden="true" class="lucca-icon icon-watch"></span>Internal navigation</button>
		</div>
		<div id="main-content">
			<a href="#" class="link">Content link</a>
			<a href="#" class="link">Content link</a>
			<a href="#" class="link">Content link</a>
			<a href="#" class="link">Content link</a>
		</div>
	`,
	styles: [`
		#navSide {
			margin-top: var(--spacings-smaller);
		}

		#main-content {
			margin-top: var(--spacings-smaller);
		}

		.link {
			margin-right: var(--spacings-smaller);
		}
	`]
})
class SkipLinksStory {}

export default {
	title: 'Documentation/Navigation/SkipLinks/Basic',
	component: LuSkipLinksComponent,
	decorators: [
		componentWrapperDecorator(SkipLinksStory),
		moduleMetadata({
			imports: [SkipLinksStory],
		}),
	],
} as Meta;

const Template: Story<SkipLinksStory> = (props) => ({ props });

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
	styles: [`
		.button {opacity: .4;}`,
	],
};
