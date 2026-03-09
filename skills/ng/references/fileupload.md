# File Upload

Component for uploading files with drag-and-drop support.

**Storybook:** [Documentation/Forms/FileUpload/Angular](https://storybook.lucca-front.com)


## Figma Design

**Component:** [File Upload - Lucca Components v21.1](https://www.figma.com/design/PQEOcUF9CYfKNqaejAGLWP/%F0%9F%A7%A9-Lucca-components-v21.1?node-id=28445-192983)  
**Node ID:** `28445-192983`

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

## Docs Highlights

### Single vs Multiple upload

- `lu-single-file-upload` for one file at a time
- `lu-multi-file-upload` for multiple files

Both emit a `filePicked` event per selected file.

```html
<lu-form-field label="Label">
  <lu-multi-file-upload [accept]="accept" (filePicked)="upload([$event])" />
</lu-form-field>
```

```html
<lu-form-field label="Label">
  <lu-single-file-upload [accept]="accept" (filePicked)="upload([$event])" />
</lu-form-field>
```

### Accepted formats

Use `accept` for UX only; the browser does not enforce formats.

## Accessibility

- Drag-and-drop zone is keyboard accessible
- File input is properly labeled
- Error messages are announced
