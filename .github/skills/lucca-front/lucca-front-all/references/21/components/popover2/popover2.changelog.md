# popover2 — Changelog

> Diff structurel de l'API (selectors, inputs, outputs, models) entre versions stables, jusqu'à `v21.3.1`. Les versions sans changement d'API sont omises.

## 21.3.0

`PopoverDirective` :
  + `luPopoverMaxBlockSize` : string | null
  + `luPopoverMaxInlineSize` : string | null

## 21.2.0

`PopoverDirective` :
  ~ `luPopoverPosition` : 'above' | 'below' | 'before' | 'after' → PopoverPosition | null, défaut 'above' → null

## 21.1.0

`PopoverDirective` :
  + `intl` : unknown
`PopoverContentComponent` :
  + `intl` : unknown

## 21.0.4

`PopoverDirective` :
  ~ `luPopoverPosition` : PopoverPosition → 'above' | 'below' | 'before' | 'after'

## 21.0.3

`PopoverDirective` :
  + `overlayScrollStrategy` : 'reposition' | 'block' | 'close'

## 21.0.0

Composant introduit (`PopoverDirective`, `PopoverContentComponent`).

