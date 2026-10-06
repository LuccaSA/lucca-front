# text-flow

## Import

```typescript
import { TextFlowComponent } from '@lucca-front/ng/text-flow';
```

## Basic Usage

```html
<lu-text-flow> <h1>Heading 1</h1> <h2>Heading 2</h2> <p>Paragraph</p> <p>Paragraph</p> <h2>Heading 2</h2> <p>Paragraph</p> <ul> <li>List item</li> <li>List item</li> <li>List item</li> </ul> <h3>Heading 3</h3> <p>Paragraph</p> <h4>Heading 4</h4> <ol> <li>List item</li> <li>List item</li> <li>List item</li> </ol>
</lu-text-flow>
```

## API Reference

### TextFlowComponent (component)

**Selector:** `lu-text-flow`

## Related files

- 📝 [Code & implementation](./text-flow.component.md)
- 🎨 [Design guidelines](./text-flow.design.md)
- 🎯 [Figma design tokens](./text-flow.figma.md)
- 📖 [Storybook documentation](https://lucca-front.lucca.io/v22.0.0/storybook/?path=/docs/documentation-texts-text-flow-angular-basic--docs)

## Changelog

_Aucun changement d'API entre v21.4.2 et v22.0.0._

### Notes de release (ZeroHeight)

#### 21.3.0

##### Changed

- Long words now wrap (`overflow-wrap`) instead of overflowing their container.

#### 21.1.0

##### Added

- `lu-text-flow` component (`textFlow`) wrapping the `textFlow` CSS component.

#### 19.3.0

##### Changed

- Margins on both ends of `.textFlow` are removed.

#### 19.2.3

##### Added

- `ol` lists support.

#### 19.2.0

##### Changed

- Titles no longer add their own spacing and inner margins were harmonized.
