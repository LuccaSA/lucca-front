import { provideHttpClient } from '@angular/common/http';
import { FileUploadComponent } from '@lucca-front/ng/file-upload';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
import { applicationConfig, Meta, moduleMetadata } from '@storybook/angular';
import { ButtonComponent } from 'dist/ng/button';
import { generateInputs } from 'stories/helpers/stories';

export default {
	title: 'Documentation/FileUpload/Angular/Basic',
	argTypes: {
		size: {
			options: ['S', null],
			control: {
				type: 'radio',
			},
		},
		illustration: {
			options: ['paper', 'picture'],
			control: {
				type: 'select',
			},
		},
		displayMedia: {
			if: { arg: 'multiple', truthy: true },
		},
	},
	decorators: [
		moduleMetadata({
			imports: [FileUploadComponent, FormFieldComponent, TextInputComponent, LuInputDirective, ButtonComponent],
		}),
		applicationConfig({ providers: [provideHttpClient()] }),
	],
	render: (args, { argTypes }) => {
		const { accept, ...mainArgs } = args;

		return {
			props: {
				accept,
			},
			template: `
			<lu-form-field label="Label">
				<lu-file-upload ${generateInputs(mainArgs, argTypes)} [accept]="accept"/>
			</lu-form-field>
			<!--
			<div class="box mod-withArrow mod-neutral">
				<lu-form-field label="Mot de passe">
				<div class="u-displayFlex pr-u-gap100">
					<div class="textField u-flexGrow1">
						<div class="textField-input">
							<input type="password" id="password" class="textField-input-value" />
							<div class="textField-input-affix">
								<button type="button" class="button mod-onlyIcon mod-text textField-input-affix-toggle" aria-pressed="false">
									<span aria-hidden="true" class="icon-watch lucca-icon"></span>
									<span class="u-mask">Afficher le mot de passe</span>
								</button>
							</div>
						</div>
					</div>
					<button luButton type="button">Valider le mot de passe</button>
				</div>
				</lu-form-field>
			</div>
			-->
			`,
		};
	},
} as Meta;

export const Basic = {
	args: {
		size: null,
		multiple: false,
		displayMedia: false,
		accept: [
			{
				format: '.jpg',
				name: 'JPG',
			},
			{
				format: '.jpeg',
			},
			{
				format: '.png',
				name: 'PNG',
			},
			{
				format: '.gif',
				name: 'GIF',
			},
			{
				format: '.svg',
				name: 'SVG',
			},
		],
		fileMaxSize: 5000000,
		disablePreview: false,
		illustration: 'paper',
		password: false,
	},
};
