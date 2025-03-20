FileUpload is a component designed to manage file uploads. It aims to standardize both the technical and visual
approaches to file uploads.

### Utilisation

For the purely visual and interactive part, you'll need `lu-single-file-upload` if you only want to manage
one file at a time, or `lu-multiple-file-upload` if you want to manage multiple files at once.

Both of these components come from `@lucca-front/ng/file-upload`.

In both components, simply connect to the `filePicked` event to retrieve the files sent by the user, these are of
the native Javascript File type, and each file will emit an event. In the case of multiple selections, an event
will be emitted per file.

Then, you'll just need to manage the upload of these files via LuccaFiles for most cases.

Once the files are sent, the display management changes depending on the approach, single or multi.

### Single File Upload

```html

<lu-form-field label="Label">
  <lu-multi-file-upload [accept]="accept" (filePicked)="fileUploadFeature.uploadFiles([$event])" />
</lu-form-field>
<div class="fileEntryDisplayWrapper">
  @for(fileUpload of fileUploadFeature.fileUploads(); track $index) {
  <lu-file-entry [entry]="fileUpload | luFileEntry" [state]="fileUpload.state"
                 [inlineMessageError]="fileUpload.error?.detail" (deleteFile)="deleteFile(fileUpload)" />
  }
</div>
```

### Multiple File Upload

```html

<lu-form-field label="Label">
  @let fileUpload = fileUploadFeature.fileUploads()[0];
  <lu-single-file-upload [accept]="accept" (filePicked)="fileUploadFeature.uploadFiles([$event])"
                         [entry]="fileUpload | luFileEntry" [state]="fileUpload?.state"
                         [previewUrl]="getPreviewUrl(fileUpload)" [inlineMessageError]="fileUpload?.error?.detail"
                         (deleteFile)="deleteFile(fileUpload)" />
</lu-form-field>
```

### Details

In both cases, `fileUploadFeature` is simply the SignalStore provided by `@lucca/cdk` for interactions with LuccaFiles,
`luFileEntry` is a pipe that transforms a `FileUpload` into a `LuccaFileEntry`.

It's also possible to specify a list of accepted files, solely for UX purposes, as the file type is not enforced by the
browser in any way, this list is an `Array<{ format: string; name?: string; }>`, `name` being used for display only.


