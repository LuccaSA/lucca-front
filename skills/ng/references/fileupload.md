# File Upload

Component for uploading files with drag-and-drop support.

**Storybook:** [Documentation/Forms/FileUpload/Angular](https://storybook.lucca-front.com)

## Import

```typescript
import { 
  FileUploadComponent,
  FileDropzoneComponent,
  FileEntryComponent 
} from '@lucca-front/ng/file-upload';
```

## Basic Usage

```html
<lu-file-upload 
  [(files)]="files"
  [maxFileSize]="5000000"
  accept=".pdf,.doc,.docx">
</lu-file-upload>
```

## Inputs

### `files`
Type: `File[]` - Two-way binding for selected files.

### `maxFileSize`
Type: `number` - Maximum file size in bytes.

```html
<lu-file-upload [maxFileSize]="10 * 1024 * 1024"><!-- 10MB --></lu-file-upload>
```

### `accept`
Type: `string` - Accepted file types (MIME types or extensions).

```html
<lu-file-upload accept="image/*" />
<lu-file-upload accept=".pdf,.doc,.docx" />
```

### `multiple`
Type: `boolean` (default: `true`) - Allow multiple files.

```html
<lu-file-upload [multiple]="false" />
```

### `maxFiles`
Type: `number` - Maximum number of files.

```html
<lu-file-upload [maxFiles]="5" />
```

### `disabled`
Type: `boolean`

## Outputs

### `filesChange`
Emitted when files are added or removed.

### `fileError`
Emitted when a file fails validation.

```html
<lu-file-upload (fileError)="onError($event)" />
```

## Common Patterns

### Image Upload
```html
<lu-file-upload 
  [(files)]="images"
  accept="image/*"
  [maxFileSize]="5000000"
  [maxFiles]="10">
</lu-file-upload>
```

### Single Document Upload
```html
<lu-file-upload 
  [(files)]="document"
  accept=".pdf"
  [multiple]="false"
  [maxFileSize]="10000000">
</lu-file-upload>
```

### With Custom Validation
```typescript
onFileError(error: FileUploadError) {
  if (error.type === 'size') {
    this.toasts.addToast({
      message: 'File too large. Maximum size is 5MB.',
      type: 'Error'
    });
  }
}
```

### Display Uploaded Files
```html
<lu-file-upload [(files)]="files" />

@for (file of files; track file.name) {
  <lu-file-entry [file]="file" (remove)="removeFile(file)" />
}
```

## Accessibility

- Drag-and-drop zone is keyboard accessible
- File input is properly labeled
- Error messages are announced
