import { Meta, StoryFn } from '@storybook/angular';

interface MobilePushBasicStory {}

export default {
	title: 'Documentation/Feedback/Mobile Push/HTML & CSS/Basic',
	argTypes: {},
} as Meta;

function getTemplate(args: MobilePushBasicStory): string {
	return `<div class="mobilePush-containerWrapper">
		<div class="mobilePush">
			<div class="mobilePush-icons">
				<span aria-hidden="true" class="mobilePush-icons-front lucca-icon icon-deviceMobile mod-S"></span>
				<img class="mobilePush-icons-back" alt="" src="https://cdn.lucca.fr/transverse/prisme/visuals/plg-push/shape.svg" />
			</div>
			<div class="mobilePush-content">
				<div class="mobilePush-content-description">Posez une absence depuis n’importe où avec l’application Lucca.</div>
					<div class="mobilePush-content-downloadApps">
						<a href="#" class="mobilePush-content-downloadApps-link">
							<img class="mobilePush-content-downloadApps-link-badge" src="https://cdn.lucca.fr/transverse/prisme/visuals/mobile-push/badge-app-store-us-uk.svg" />
						</a>
						<a href="#" class="mobilePush-content-downloadApps-link">
							<img class="mobilePush-content-downloadApps-link-badge" alt="Get it on Google" src="https://cdn.lucca.fr/transverse/prisme/visuals/mobile-push/badge-google-play-store-us-uk.svg" />
						</a>
					</div>
				</div>
			</div>
		</div>`;
}

const Template: StoryFn<MobilePushBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
