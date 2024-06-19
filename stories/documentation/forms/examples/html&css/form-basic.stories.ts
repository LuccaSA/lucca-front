import { Meta, StoryFn } from '@storybook/angular';

interface FieldsetBasicStory {}

export default {
	title: 'Documentation/Forms/Examples/HTML&CSS',
	argTypes: {},
} as Meta;

function getTemplate(args: FieldsetBasicStory): string {
	return `<form class="form mod-maxWidth">
	<header class="form-header">
		<h1 class="form-header-title">Form title</h1>
		<span class="form-header-mandatory" aria-hidden="true"><sup class="form-header-mandatory-asterisk">*</sup> Champs obligatoires</span>
	</header>
	<fieldset class="fieldset" aria-labelledby="fieldsetTitleContent1">
		<legend class="fieldset-title">
			<span class="fieldset-title-content" id="fieldsetTitleContent1">
				<span class="fieldset-title-content-text">
					Fieldset title
					<span class="fieldset-title-content-text-helper">Helper message</span>
				</span>
			</span>
		</legend>
		<div class="fieldset-content">
			<div class="grid mod-form" style="--grid-colspan: 4">
				<div class="grid-column">
					<div class="form-field">
						<label class="formLabel" id="IDlabel1" for="ID1">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID1" class="textField-input-value" aria-labelledby="IDlabel1" aria-describedby="IDmessage1" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
						<div class="inlineMessage" id="IDmessage1"><span aria-hidden="true" class="lucca-icon"></span>Helper text</div>
					</div>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
					<div class="form-field">
						<label class="formLabel" id="IDlabel2" for="ID2">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID2" class="textField-input-value" aria-labelledby="IDlabel2" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
					</div>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
					<div class="form-field">
						<label class="formLabel" id="IDlabel3" for="ID3">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID3" class="textField-input-value" aria-labelledby="IDlabel3" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
					</div>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 1">
					<div class="form-field">
						<label class="formLabel" id="IDlabel4" for="ID4">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID4" class="textField-input-value" aria-labelledby="IDlabel4" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
					</div>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 1">
					<div class="form-field">
						<label class="formLabel" id="IDlabel5" for="ID5">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID5" class="textField-input-value" aria-labelledby="IDlabel5" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
					</div>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 1">
					<div class="form-field">
						<label class="formLabel" id="IDlabel6" for="ID6">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID6" class="textField-input-value" aria-labelledby="IDlabel6" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
					</div>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 1">
					<div class="form-field">
						<label class="formLabel" id="IDlabel7" for="ID7">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID7" class="textField-input-value" aria-labelledby="IDlabel7" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
	<hr class="divider" />
	<fieldset class="fieldset" aria-labelledby="fieldsetTitleContent2">
		<legend class="fieldset-title">
			<span class="fieldset-title-content" id="fieldsetTitleContent2">
				<span class="fieldset-title-content-text">
					Fieldset title
					<span class="fieldset-title-content-text-helper">Helper message</span>
				</span>
			</span>
		</legend>
		<div class="fieldset-content">
			<div class="grid mod-form" style="--grid-colspan: 4">
				<div class="grid-column">
					<div class="form-field">
						<label class="formLabel" id="IDlabel8" for="ID8">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID8" class="textField-input-value" aria-labelledby="IDlabel8" aria-describedby="IDmessage8" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
						<div class="inlineMessage" id="IDmessage8"><span aria-hidden="true" class="lucca-icon"></span>Helper text</div>
					</div>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
					<div class="form-field">
						<label class="formLabel" id="IDlabel10" for="ID9">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID9" class="textField-input-value" aria-labelledby="IDlabel10" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
					</div>
				</div>
				<div class="grid-column" style="--grid-colspanAtMediaMinXXS: 2">
					<div class="form-field">
						<label class="formLabel" id="IDlabel11" for="ID11">Label</label>
						<div class="textField">
							<div class="textField-input">
								<input type="text" id="ID11" class="textField-input-value" aria-labelledby="IDlabel11" placeholder="Placeholder" aria-invalid="false" />
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	</fieldset>
</form>`;
}

const Template: StoryFn<FieldsetBasicStory> = (args: FieldsetBasicStory) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
