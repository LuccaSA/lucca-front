# daterangeinput — Code & Implementation

📖 [Storybook documentation](https://lucca-front.lucca.io/v21.1.4/storybook/?path=/docs/documentation-forms-date2-daterangeinput--docs)

## Angular

Component selector : `lu-date-range-input`

## HTML/CSS

### Range input

```css
@forward '@lucca-front/scss/src/components/date2';
shortcuts: [
{
label: 'Since start of week',
range: PremadeShortcuts['SinceStartOfWeek']('fr'),
},
{
label: 'Last week',
range: PremadeShortcuts['LastWeek']('fr'),
},
{
label: 'Last month',
range: PremadeShortcuts['LastMonth']('fr'),
},
]
```
