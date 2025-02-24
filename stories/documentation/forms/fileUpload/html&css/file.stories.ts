import { provideHttpClient } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { LuTooltipModule } from '@lucca-front/ng/tooltip';
import { applicationConfig, Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface FileUploadFileStory {}

export default {
	title: 'Documentation/FileUpload/HTML&CSS/File',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe, LuTooltipModule],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
} as Meta;

function getTemplate(args: FileUploadFileStory): string {
	return `
<div class="fileUploaded">
	<div class="fileUploaded-status">
		<img class="fileUploaded-status-img" src="https://dummyimage.com/360" alt="" width="56" height="56" loading="lazy" />
	</div>
	<div class="fileUploaded-informations">
		<span class="fileUploaded-informations-filename">filename.ext</span>
		<span class="fileUploaded-informations-extension">Fichier EXT</span>
		<span class="fileUploaded-informations-size">88,8 Mo</span>
	</div>
	<button class="fileUploaded-button button" type="button" luTooltip="Supprimer le fichier" luTooltipOnlyForDisplay luTooltipPosition="before">
		<span class="lucca-icon icon-trash" aria-hidden="true"></span>
		<span class="u-mask">Supprimer le fichier « filename.ext »</span>
	</button>
</div>
<div class="fileUploaded mod-S">
	<div class="fileUploaded-status">
		<img class="fileUploaded-status-img" src="https://dummyimage.com/360" alt="" width="56" height="56" loading="lazy" />
	</div>
	<div class="fileUploaded-informations">
		<span class="fileUploaded-informations-filename">filename.ext</span>
		<span class="fileUploaded-informations-extension">Fichier EXT</span>
		<span class="fileUploaded-informations-size">88,8 Mo</span>
	</div>
	<button class="fileUploaded-button button" type="button" luTooltip="Supprimer le fichier" luTooltipOnlyForDisplay luTooltipPosition="before">
		<span class="lucca-icon icon-trash" aria-hidden="true"></span>
		<span class="u-mask">Supprimer le fichier « filename.ext »</span>
	</button>
</div>
<div class="fileUploaded mod-L">
	<div class="fileUploaded-status">
		<img class="fileUploaded-status-img" src="https://dummyimage.com/360" alt="" width="56" height="56" loading="lazy" />
	</div>
	<div class="fileUploaded-informations">
		<span class="fileUploaded-informations-filename">filename.ext</span>
		<span class="fileUploaded-informations-extension">Fichier EXT</span>
		<span class="fileUploaded-informations-size">88,8 Mo</span>
	</div>
	<button class="fileUploaded-button button" type="button" luTooltip="Supprimer le fichier" luTooltipOnlyForDisplay luTooltipPosition="before">
		<span class="lucca-icon icon-trash" aria-hidden="true"></span>
		<span class="u-mask">Supprimer le fichier « filename.ext »</span>
	</button>
</div>`;
}

const Template: StoryFn<FileUploadFileStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
