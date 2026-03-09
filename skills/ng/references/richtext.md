# RichText

Components for user data input and validation.

**Storybook:** `Documentation/Forms/Fields/RichTextInput/Angular`

### Imports

```typescript
import { ButtonComponent } from '@lucca-front/ng/button';
import { DividerComponent } from '@lucca-front/ng/divider';
import { FormFieldComponent } from '@lucca-front/ng/form-field';
import { RichTextInputComponent, RichTextInputToolbarComponent, RichTextPluginTagComponent } from '@lucca-front/ng/forms/rich-text-input';
import { HtmlFormatterDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/html';
import { DEFAULT_MARKDOWN_TRANSFORMERS, MarkdownFormatterDirective, MarkdownFormatterWithTagsDirective, TAGS } from '@lucca-front/ng/forms/rich-text-input/formatters/markdown';
import { PLAINTEXT_TAGS, PlainTextFormatterWithTagsDirective } from '@lucca-front/ng/forms/rich-text-input/formatters/plain-text';
```


### When to use

- Data entry
- Forms
- Configuration
- Filters

### When not to use

- Read-only data display
- Navigation

### Accessibility

- Associate each field with a label using for/id
- Provide explicit error messages
- Support keyboard navigation
- Indicate required fields
