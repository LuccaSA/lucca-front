import { provideHttpClient } from '@angular/common/http';
import { LuSafeExternalSvgPipe } from '@lucca-front/ng/safe-content';
import { applicationConfig, Meta, moduleMetadata, StoryFn } from '@storybook/angular';

interface FileUploadBasicStory {}

export default {
	title: 'Documentation/FileUpload/HTML&CSS/Basic',
	argTypes: {},
	decorators: [
		moduleMetadata({
			imports: [LuSafeExternalSvgPipe],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
} as Meta;

function getTemplate(args: FileUploadBasicStory): string {
	return `<div class="fileUpload is-success">
		<input class="fileUpload-input" type="file" title="" accept=".xls,.xlsx,.csv" />
		<!--
		<div class="fileUpload-status" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPaperAction.svg' | luSafeExternalSvg"></div>
		<div class="fileUpload-status"><div class="loading mod-L"></div></div>
		<div class="fileUpload-status is-critical" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPaperActionError.svg' | luSafeExternalSvg"></div>
		-->
		<div class="fileUpload-status" [innerHtml]="'https://cdn.lucca.fr/transverse/prisme/visuals/empty-states/icons/iconPaperActionSuccess.svg' | luSafeExternalSvg"></div>
		<div class="fileUpload-instruction">
			<!--<span class="fileUpload-instruction-action">Déposez le fichier ici ou <span class="fileUpload-instruction-action-click">cliquez pour le sélectionner</span>. </span>-->
			<span class="fileUpload-instruction-filename">filename.ext</span>
			<span class="fileUpload-instruction-action">Remplacez-le en cliquant ou en déposant un nouveau fichier. </span>
			<span class="fileUpload-instruction-formats">Formats acceptés : PDF, PNG, JPG, JPEG, DOC, XLS. </span>
			<span class="fileUpload-instruction-size">Poids maximum : 5 Mo. </span>
		</div>
		<!--
		<span class="fileUpload-button button">Sélectionner un fichier</span>
		-->
	</div>`;
}

const Template: StoryFn<FileUploadBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
