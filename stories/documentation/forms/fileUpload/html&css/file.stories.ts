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
<div class="fileUpload_file">
<div class="fileUpload_file-status">
	<img src="https://dummyimage.com/112" alt="" width="56" height="56" loading="lazy" />
</div>
<div class="fileUpload_file-informations">
	<span class="fileUpload_file-informations-filename">filename.ext</span>
	<span class="fileUpload_file-informations-extension">Fichier EXT</span>
	<span class="fileUpload_file-informations-size">2,3 Mo</span>
</div>
<button class="fileUpload_file-button button" type="button" luTooltip="Supprimer le fichier" luTooltipOnlyForDisplay luTooltipPosition="before">
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
