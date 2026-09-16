import { Component } from '@angular/core';
import { FileEntryWrapperComponent, FileEntryComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';

@Component({
	selector: 'app-simple-cases',
	imports: [SingleFileUploadComponent, FileEntryComponent, FileEntryWrapperComponent],
	template: `
		@if (file; as fileEntry) {
			<lu-file-entry-wrapper>
				<lu-file-entry [entry]="fileEntry" size="L" media [state]="state" (deleteFile)="delete()" />
			</lu-file-entry-wrapper>
		} @else {
			<lu-single-file-upload size="L" [accept]="accept" />
		}
		@if (file; as fileEntry) {
			<lu-file-entry-wrapper>
				<lu-file-entry [entry]="fileEntry" size="L" [previewUrl]="preview" />
			</lu-file-entry-wrapper>
		} @else {
			<lu-single-file-upload />
		}
		<lu-multi-file-upload [droppable]="true" />
		<lu-file-entry-wrapper>
			<lu-file-entry size="L" [entry]="file" />
		</lu-file-entry-wrapper>
		<lu-file-entry-wrapper class="pr-u-marginTop100"></lu-file-entry-wrapper>
		<lu-single-file-upload [size]="isCompact ? 'S' : null" [entry]="file" />
	`,
})
export class SimpleCasesComponent {}
