# input-framed

## Import

```typescript
import { LuInputClearerComponent, LuInputDisplayerDirective, LuInputDirective } from '@lucca-front/ng/input';
```

## Basic Usage

```html
<lu-form-field label="Label" errorInlineMessage="Error inline message"> <lu-radio-group-input [(ngModel)]="example" framed required> <lu-radio value="A"> Option A </lu-radio> <lu-radio value="B"> Option B </lu-radio> <lu-radio value="C" disabled> Option C </lu-radio> <lu-radio value="D"> Option D </lu-radio> </lu-radio-group-input> </lu-form-field>
```

## API Reference

### LuInputClearerComponent (component)

**Selector:** `lu-input-clearer`

**exportAs:** `luClearer`

### LuInputDisplayerDirective (directive)

**Selector:** `[luDisplayer]`

### LuInputDirective (directive)

**Selector:** `[luInput]`

## Related files

- 📝 [Code & implementation](./input-framed.component.md)
- 🎨 [Design guidelines](./design/_index.md)
- 🎯 [Figma design tokens](./input-framed.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v21.2.1/storybook/?path=/docs/documentation-forms-input-framed-angular-basic--docs)
- 📋 [Changelog](./input-framed.changelog.md)
