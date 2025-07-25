import { Meta } from '@storybook/angular';
import { cleanupTemplate } from 'stories/helpers/stories';

interface InputFramedBasicStory {}

export default {
	title: 'Documentation/Forms/Input Framed/HTML & CSS/Grid',
	argTypes: {},
	render: (args: InputFramedBasicStory) => {
		return {
			template: cleanupTemplate(`<div class="inputFramedWrapper">
	<div class="grid mod-autoAtMediaMinXXS">
		<div class="grid-column">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioAlabel1" for="optionA1">
							Option A
						</label>
						<span class="radioField">
							<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioA1label" id="optionA1" name="radioGroup" />
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-column">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioB1label" for="optionB1">
							Option B
						</label>
						<span class="radioField">
							<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioB1label" id="optionB1" name="radioGroup" />
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>
<br />
<div class="inputFramedWrapper">
	<div class="grid" [attr.style]="'--grid-columns: 2; --grid-colspan: 2'">
		<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioAlabel" for="optionA">
							Option A
						</label>
						<span class="radioField">
							<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioAlabel" id="optionA" name="radioGroup2" />
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioBlabel" for="optionB">
							Option B
						</label>
						<span class="radioField">
							<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioBlabel" id="optionB" name="radioGroup2" />
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioClabel" for="optionC">
							Option C
						</label>
						<span class="radioField">
							<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioClabel" id="optionC" name="radioGroup2" />
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
		<div class="grid-column" [attr.style]="'--grid-colspanAtMediaMinXXS: 1'">
			<div class="inputFramed">
				<div class="inputFramed-header">
					<div class="form-field inputFramed-header-field">
						<label class="formLabel inputFramed-header-label" id="radioDlabel" for="optionD">
							Option D<br />
							Option D
						</label>
						<span class="radioField">
							<input type="radio" class="radioField-input inputFramed-header-input" aria-labelledby="radioDlabel" id="optionD" name="radioGroup2" />
							<span aria-hidden="true" class="radioField-icon">
								<span class="radioField-icon-check"></span>
							</span>
						</span>
					</div>
				</div>
			</div>
		</div>
	</div>
</div>`),
		};
	},
} as Meta;

export const Basic = {
	args: {},
};
