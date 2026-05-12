# fileupload — Basic _(Angular)_

Component selector : `lu-multi-file-upload`

```js
import { MultiFileUploadComponent } from '@lucca-front/ng/file-upload';
```

```html
<lu-form-field label="Label">
	<lu-multi-file-upload${…}${…} (filePicked)="fileUploadFeature.uploadFiles([$event])" />
</lu-form-field>
<div class="fileEntryDisplayWrapper">
	@for (fileUpload of fileUploadFeature.fileUploads(); track $index) {
		<lu-file-entry${…}${…}${…}
			[entry]="fileUpload | fileUploadToLFEntry"
			[state]="fileUpload.state"
			[previewUrl]="getPreviewUrl(fileUpload)"
			[inlineMessageError]="fileUpload.error?.detail"
			(deleteFile)="deleteFile(fileUpload)"
		/>
	}
</div>
```

```html
@let fileUpload = fileUploadFeature.fileUploads()[0];
<lu-form-field label="Label">
	<lu-single-file-upload
		${…}
		[accept]="accept"
		(filePicked)="fileUploadFeature.uploadFiles([$event])"
		[entry]="fileUpload | fileUploadToLFEntry"
		[state]="fileUpload?.state"
		[previewUrl]="getPreviewUrl(fileUpload)"
		[inlineMessageError]="fileUpload?.error?.detail"
		(deleteFile)="deleteFile(fileUpload)"
	/>
</lu-form-field>
```
