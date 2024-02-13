import { Meta, StoryFn } from '@storybook/angular';

interface FramedBasicStory {}

export default {
	title: 'Documentation/Forms/Framed/Basic',
} as Meta;

function getTemplate(args: FramedBasicStory): string {
	return `
	<div class="form mod-framed">
		<fieldset class="form-group">
			<legend class="form-group-legend">Titre Groupe 1</legend>
			<div class="form-group-line">
				<div class="form-group-line-col">
					<label class="textfield is-required">
						<input class="textfield-input is-error" type="text" placeholder="placeholder" aria-required="required" />
						<span class="textfield-label">Label textfield</span>
					</label>
				</div>
				<div class="form-group-line-col">
					<label class="textfield">
						<input class="textfield-input" type="text" placeholder="placeholder" value="Test disabled" disabled="disabled" />
						<span class="textfield-label">Label textfield</span>
					</label>
				</div>
			</div>
			<div class="form-group-line">
				<div class="form-group-line-col">
					<label class="textfield palette-success">
						<input class="textfield-input" type="text" placeholder="placeholder" />
						<span class="textfield-label">Label textfield</span>
					</label>
				</div>
			</div>
			<div class="form-group-line">
				<div class="form-group-line-col">
					<label class="textfield mod-withSuffix">
						<input class="textfield-input" type="text" placeholder="Money Money" />
						<span class="textfield-label">Label textfield</span>
						<span class="textfield-suffix">
							€
						</span>
					</label>
				</div>
			</div>
			<div class="form-group-line">
				<div class="form-group-line-col mod-overlay-top">
					<label class="textfield mod-multiline mod-withSuffix">
						<textarea class="textfield-input" type="text" placeholder="Money Money"></textarea>
						<span class="textfield-label">Label textfield</span>
						<span class="textfield-suffix">
							€
						</span>
					</label>
					<label class="select">
						<select>
							<option>Option 1</option>
						</select>
						<span class="select-label u-mask">Select label</span>
					</label>
				</div>
			</div>
		</fieldset>
		<fieldset class="form-group">
			<legend class="form-group-legend">Titre Groupe 2</legend>
			<div class="form-group-line">
				<div class="form-group-line-col mod-overlay-top">
					<label class="textfield mod-multiline mod-withSuffix palette-secondary is-required">
						<textarea class="textfield-input" type="text" placeholder="Money Money"></textarea>
						<span class="textfield-label">Label textfield</span>
						<span class="textfield-suffix">
							€
						</span>
					</label>
					<label class="select">
						<select>
							<option>Option 1</option>
						</select>
						<span class="select-label u-mask">Select label</span>
					</label>
				</div>
			</div>
			<div class="form-group-line">
				<div class="form-group-line-col">
					<label id="autocomplete-framed" class="textfield mod-search">
						<input class="textfield-input" type="search" />
						<span class="textfield-label">Utilisateur</span>
						<ul class="textfield-options">
							<li class="textfield-options-entry">
								<mark>va</mark>lue A</li>
							<li class="textfield-options-entry is-focus">
								<mark>va</mark>lue B</li>
							<li class="textfield-options-entry">
								<mark>va</mark>lue C</li>
						</ul>
					</label>
				</div>
			</div>
			<div class="form-group-line">
				<div class="form-group-line-col">
					<label id="autocomplete-framed-select" class="textfield mod-select">
						<input class="textfield-input" type="text" />
						<span class="textfield-label">Utilisateur</span>
						<ul class="textfield-options">
							<li class="textfield-options-entry">
								<mark>va</mark>lue A</li>
							<li class="textfield-options-entry is-focus">
								<mark>va</mark>lue B</li>
							<li class="textfield-options-entry">
								<mark>va</mark>lue C</li>
						</ul>
					</label>
				</div>
			</div>
			<div class="form-group-line">
				<div class="form-group-line-col mod-XS6">
					<label id="autocomplete-framed-select2" class="textfield mod-select">
						<input class="textfield-input" type="text" />
						<span class="textfield-label">Utilisateur</span>
						<ul class="textfield-options">
							<li class="textfield-options-entry">
								<mark>va</mark>lue A</li>
							<li class="textfield-options-entry is-focus">
								<mark>va</mark>lue B</li>
							<li class="textfield-options-entry">
								<mark>va</mark>lue C</li>
						</ul>
					</label>
				</div>
				<div class="form-group-line-col mod-XS6">
					<label class="textfield is-required">
						<input class="textfield-input is-error" type="text" placeholder="placeholder" aria-required="true" />
						<span class="textfield-label">Label textfield</span>
						<span class="textfield-messages">
							<span class="textfield-messages-error">Ce champs est requis</span>
						</span>
					</label>
				</div>
			</div>
			<div class="form-group-line">
				<div class="form-group-line-col mod-selection">
					<div class="checkboxesfield">
						<label class="checkbox mod-field">
							<input class="checkbox-input" type="checkbox" />
							<span class="checkbox-label">Checkbox</span>
						</label>
					</div>
				</div>
			</div>
			<div class="form-group-line">
				<div class="form-group-line-col mod-XS8 mod-selection">
					<fieldset class="radiosfield">
						<legend class="radiosfield-label">Radios textfield</legend>
						<div class="radiosfield-input">
							<div>
								<label class="radio">
									<input class="radio-input" type="radio" name="radioframedlist" />
									<span class="radio-label">Radio</span>
								</label>
							</div>
							<div>
								<label class="radio">
									<input class="radio-input" type="radio" name="radioframedlist" />
									<span class="radio-label">Radio</span>
								</label>
							</div>
							<div>
								<label class="radio">
									<input class="radio-input" type="radio" name="radioframedlist" />
									<span class="radio-label">Radio</span>
								</label>
							</div>
						</div>
					</fieldset>
				</div>
				<div class="form-group-line-col mod-selection">
					<div class="checkboxesfield">
						<label class="checkbox mod-field is-offset">
							<input class="checkbox-input" type="checkbox" />
							<span class="checkbox-label">Checkbox</span>
						</label>
					</div>
				</div>
			</div>
		</fieldset>
	</div>
	`;
}

const Template: StoryFn<FramedBasicStory> = (args) => ({
	props: args,
	template: getTemplate(args),
});

export const Basic = Template.bind({});
Basic.args = {};
