# fileentry — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-file-fileentry-angular-basic--docs)

## Angular

### Basic

Component selector : `lu-file-entry`

```js
import { provideHttpClient } from '@angular/common/http';
import { FILE_ENTRY_SIZE, FILE_ENTRY_STATE, FileEntryComponent } from '@lucca-front/ng/file-upload';
import { generateInputs, setStoryOptions } from '@/helpers/stories';
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
