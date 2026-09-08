# fileupload — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-file-fileupload-angular-basic--docs)

## Angular

### Basic

Component selector : `lu-multi-file-upload`

```js
import { HttpErrorResponse, HttpStatusCode, provideHttpClient } from '@angular/common/http';
import { Injectable, LOCALE_ID, Pipe, PipeTransform, signal } from '@angular/core';
import { ButtonComponent } from '@lucca-front/ng/button';
import { FILE_UPLOAD_SIZE, FileEntry, FileEntryComponent, FileEntryWrapperComponent, MultiFileUploadComponent, SingleFileUploadComponent } from '@lucca-front/ng/file-upload';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { TextInputComponent } from '@lucca-front/ng/forms';
import { LuInputDirective } from '@lucca-front/ng/input';
import { TagComponent } from '@lucca-front/ng/tag';
import { map, Observable, switchMap, throwError, timer } from 'rxjs';
import { generateInputs, setStoryOptions } from '@/helpers/stories';
```

```html
<lu-form-field label="Label">
	<lu-multi-file-upload
		fileMaxSize="5000000"
		illustration="paper"
		(filePicked)="fileUploadFeature.uploadFiles([$event])"
	/>
</lu-form-field>
<lu-file-entry-wrapper>
	@for (fileUpload of fileUploadFeature.fileUploads(); track $index) {
		<lu-file-entry
			[entry]="fileUpload | fileUploadToLFEntry"
			[state]="fileUpload.state"
			[previewUrl]="getPreviewUrl(fileUpload)"
			[inlineMessageError]="fileUpload.error?.detail"
			(deleteFile)="deleteFile(fileUpload)"
		/>
	}
</lu-file-entry-wrapper>
```

```html
@let fileUpload = fileUploadFeature.fileUploads()[0];
<lu-form-field label="Label">
	@if (fileUpload) {
		<lu-file-entry-wrapper>
			<lu-file-entry
				size="L"
				[entry]="fileUpload | fileUploadToLFEntry"
				[state]="fileUpload.state"
				[previewUrl]="getPreviewUrl(fileUpload)"
				[inlineMessageError]="fileUpload.error?.detail"
				(deleteFile)="deleteFile(fileUpload)"
			/>
		</lu-file-entry-wrapper>
	} @else {
		<lu-single-file-upload
			fileMaxSize="5000000"
			illustration="invoice"
			[accept]="accept"
			(filePicked)="fileUploadFeature.uploadFiles([$event])"
		/>
	}
</lu-form-field>
```
