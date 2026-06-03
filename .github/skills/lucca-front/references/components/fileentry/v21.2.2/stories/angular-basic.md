# fileentry — Basic _(Angular)_

Component selector : `lu-file-entry`

```js
import { FileEntry, FileEntryComponent } from '@lucca-front/ng/file-upload';
```

```html
<lu-file-entry
	(deleteFile)="deleteFile()"
	[entry]="{
		name: 'dummyimage.png',
		size: 28420,
		type: 'image/png',
	}"
	withFileSize
	withFileType
	previewUrl="https://dummyimage.com/500"
	inlineMessageError="Virus détecté dans le fichier."
/>
```
