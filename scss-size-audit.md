# SCSS deprecation refactor — size & inventory audit

- **Base** (before): `aa6d5185301a8bd7167a34537a440ad49cf63e9b`
- **Head** (after): `e8c04524eebd2b483aee10c07df55ca1c6279208`

## Compiled + compressed size

**125/125 comparable outputs are byte-identical** (sha256); 1 module(s) do not compile standalone in one of the trees and are excluded.

| Module | Before (B) | After (B) | Δ raw | gzip before | gzip after | Status |
| --- | ---: | ---: | ---: | ---: | ---: | :---: |
| `bundle (lucca-front.min.css)` | 1,242,368 | 1,242,368 | 0 | 120,200 | 120,200 | ✅ |
| `bundle (maximal config)` | 1,248,519 | 1,248,519 | 0 | 121,334 | 121,334 | ✅ |
| `commons (main.scss)` | 122,149 | 122,149 | 0 | 16,679 | 16,679 | ✅ |
| `components/activityFeed` | 6,887 | 6,887 | 0 | 1,376 | 1,376 | ✅ |
| `components/appLayout` | 1,645 | 1,645 | 0 | 497 | 497 | ✅ |
| `components/avatar` | 8,109 | 8,109 | 0 | 1,381 | 1,381 | ✅ |
| `components/box` | 2,239 | 2,239 | 0 | 653 | 653 | ✅ |
| `components/breadcrumbs` | 4,239 | 4,239 | 0 | 927 | 927 | ✅ |
| `components/bubbleIcon` | 4,698 | 4,698 | 0 | 781 | 781 | ✅ |
| `components/bubbleIllustration` | 2,528 | 2,528 | 0 | 438 | 438 | ✅ |
| `components/button` | 21,360 | 21,360 | 0 | 2,846 | 2,846 | ✅ |
| `components/buttonGroup` | 2,122 | 2,122 | 0 | 546 | 546 | ✅ |
| `components/calendar` | 24,737 | 24,737 | 0 | 2,610 | 2,610 | ✅ |
| `components/callout` | 8,703 | 8,703 | 0 | 1,582 | 1,582 | ✅ |
| `components/calloutAccordion` | 2,986 | 2,986 | 0 | 706 | 706 | ✅ |
| `components/calloutDisclosure` | 4,340 | 4,340 | 0 | 924 | 924 | ✅ |
| `components/calloutFeedbackList` | 3,372 | 3,372 | 0 | 610 | 610 | ✅ |
| `components/calloutPopover` | 3,636 | 3,636 | 0 | 809 | 809 | ✅ |
| `components/card` | 3,687 | 3,687 | 0 | 942 | 942 | ✅ |
| `components/checkbox` | 5,239 | 5,239 | 0 | 1,184 | 1,184 | ✅ |
| `components/checkboxField` | 10,442 | 10,442 | 0 | 1,388 | 1,388 | ✅ |
| `components/chip` | 3,943 | 3,943 | 0 | 1,151 | 1,151 | ✅ |
| `components/clear` | 3,106 | 3,106 | 0 | 961 | 961 | ✅ |
| `components/code` | 396 | 396 | 0 | 249 | 249 | ✅ |
| `components/collapse` | 937 | 937 | 0 | 461 | 461 | ✅ |
| `components/color` | 3,849 | 3,849 | 0 | 1,132 | 1,132 | ✅ |
| `components/comment` | 4,715 | 4,715 | 0 | 1,015 | 1,015 | ✅ |
| `components/container` | 1,094 | 1,094 | 0 | 282 | 282 | ✅ |
| `components/contentSection` | 149 | 149 | 0 | 104 | 104 | ✅ |
| `components/dataTable` | 27,689 | 27,689 | 0 | 2,582 | 2,582 | ✅ |
| `components/dataTableSticked` | 9,221 | 9,221 | 0 | 1,108 | 1,108 | ✅ |
| `components/dateField` | 1,849 | 1,849 | 0 | 381 | 381 | ✅ |
| `components/dateRangeField` | 5,142 | 5,142 | 0 | 918 | 918 | ✅ |
| `components/dialog` | 18,422 | 18,422 | 0 | 2,712 | 2,712 | ✅ |
| `components/divider` | 4,079 | 4,079 | 0 | 915 | 915 | ✅ |
| `components/dropdown` | 5,453 | 5,453 | 0 | 1,047 | 1,047 | ✅ |
| `components/emptyState` | 5,626 | 5,626 | 0 | 1,161 | 1,161 | ✅ |
| `components/errorPage` | 1,760 | 1,760 | 0 | 542 | 542 | ✅ |
| `components/fancyBox` | 3,298 | 3,298 | 0 | 755 | 755 | ✅ |
| `components/field` | 134,868 | 134,868 | 0 | 8,351 | 8,351 | ✅ |
| `components/fieldset` | 4,961 | 4,961 | 0 | 1,170 | 1,170 | ✅ |
| `components/file` | 5,956 | 5,956 | 0 | 1,240 | 1,240 | ✅ |
| `components/fileEntry` | 7,567 | 7,567 | 0 | 1,564 | 1,564 | ✅ |
| `components/fileToolbar` | 2,669 | 2,669 | 0 | 659 | 659 | ✅ |
| `components/fileUpload` | 8,230 | 8,230 | 0 | 1,566 | 1,566 | ✅ |
| `components/filterBar` | 3,645 | 3,645 | 0 | 903 | 903 | ✅ |
| `components/filterBarDeprecated` | 2,277 | 2,277 | 0 | 661 | 661 | ✅ |
| `components/filterPill` | 12,905 | 12,905 | 0 | 2,070 | 2,070 | ✅ |
| `components/filters` | 1,467 | 1,467 | 0 | 525 | 525 | ✅ |
| `components/footer` | 4,181 | 4,181 | 0 | 782 | 782 | ✅ |
| `components/form` | 48,180 | 48,180 | 0 | 4,603 | 4,603 | ✅ |
| `components/formLabel` | 3,736 | 3,736 | 0 | 762 | 762 | ✅ |
| `components/gauge` | 3,943 | 3,943 | 0 | 895 | 895 | ✅ |
| `components/grid` | 20,395 | 20,395 | 0 | 1,572 | 1,572 | ✅ |
| `components/header` | 3,304 | 3,304 | 0 | 1,101 | 1,101 | ✅ |
| `components/highlightData` | 4,754 | 4,754 | 0 | 995 | 995 | ✅ |
| `components/highlightText` | 2,356 | 2,356 | 0 | 417 | 417 | ✅ |
| `components/horizontalNavigation` | 19,319 | 19,319 | 0 | 2,470 | 2,470 | ✅ |
| `components/impersonation` | 3,339 | 3,339 | 0 | 797 | 797 | ✅ |
| `components/indexTable` | 43,411 | 43,411 | 0 | 4,754 | 4,754 | ✅ |
| `components/inlineMessage` | 1,967 | 1,967 | 0 | 482 | 482 | ✅ |
| `components/inputFramed` | 6,511 | 6,511 | 0 | 1,089 | 1,089 | ✅ |
| `components/label` | 1,751 | 1,751 | 0 | 439 | 439 | ✅ |
| `components/layout` | 5,018 | 5,018 | 0 | 973 | 973 | ✅ |
| `components/link` | 1,946 | 1,946 | 0 | 642 | 642 | ✅ |
| `components/list` | 2,286 | 2,286 | 0 | 820 | 820 | ✅ |
| `components/listboxOption` | 24,042 | 24,042 | 0 | 2,064 | 2,064 | ✅ |
| `components/listing` | 6,176 | 6,176 | 0 | 1,274 | 1,274 | ✅ |
| `components/loading` | 3,575 | 3,575 | 0 | 850 | 850 | ✅ |
| `components/main` | 813 | 813 | 0 | 307 | 307 | ✅ |
| `components/mainLayout` | 4,498 | 4,498 | 0 | 847 | 847 | ✅ |
| `components/mobileHeader` | 970 | 970 | 0 | 397 | 397 | ✅ |
| `components/mobileNavigation` | 1,287 | 1,287 | 0 | 521 | 521 | ✅ |
| `components/mobilePush` | 1,770 | 1,770 | 0 | 585 | 585 | ✅ |
| `components/multiSelect` | 7,283 | 7,283 | 0 | 1,432 | 1,432 | ✅ |
| `components/navside` | 15,008 | 15,008 | 0 | 2,590 | 2,590 | ✅ |
| `components/newBadge` | 600 | 600 | 0 | 252 | 252 | ✅ |
| `components/notchBox` | 14,021 | 14,021 | 0 | 1,443 | 1,443 | ✅ |
| `components/numericBadge` | 2,628 | 2,628 | 0 | 775 | 775 | ✅ |
| `components/pageHeader` | 5,407 | 5,407 | 0 | 1,116 | 1,116 | ✅ |
| `components/pagination` | 846 | 846 | 0 | 344 | 344 | ✅ |
| `components/phoneNumber` | 412 | 412 | 0 | 240 | 240 | ✅ |
| `components/plgPush` | 1,176 | 1,176 | 0 | 450 | 450 | ✅ |
| `components/popover` | 3,485 | 3,485 | 0 | 893 | 893 | ✅ |
| `components/presentation` | 1,228 | 1,228 | 0 | 456 | 456 | ✅ |
| `components/progress` | 2,234 | 2,234 | 0 | 672 | 672 | ✅ |
| `components/progressStepper` | 15,974 | 15,974 | 0 | 1,677 | 1,677 | ✅ |
| `components/radio` | 3,862 | 3,862 | 0 | 861 | 861 | ✅ |
| `components/radioButtons` | 3,264 | 3,264 | 0 | 786 | 786 | ✅ |
| `components/radioField` | 3,553 | 3,553 | 0 | 787 | 787 | ✅ |
| `components/readMore` | 2,999 | 2,999 | 0 | 845 | 845 | ✅ |
| `components/resourceCard` | 17,815 | 17,815 | 0 | 2,251 | 2,251 | ✅ |
| `components/richText` | 6,650 | 6,650 | 0 | 1,213 | 1,213 | ✅ |
| `components/scrollBox` | 4,664 | 4,664 | 0 | 910 | 910 | ✅ |
| `components/section` | 431 | 431 | 0 | 221 | 221 | ✅ |
| `components/segmentedControl` | 7,400 | 7,400 | 0 | 1,363 | 1,363 | ✅ |
| `components/simpleSelect` | 6,296 | 6,296 | 0 | 1,177 | 1,177 | ✅ |
| `components/skeleton` | 5,977 | 5,977 | 0 | 907 | 907 | ✅ |
| `components/skipLinks` | 1,188 | 1,188 | 0 | 535 | 535 | ✅ |
| `components/softwareIcon` | 6,124 | 6,124 | 0 | 1,086 | 1,086 | ✅ |
| `components/sortableList` | 5,728 | 5,728 | 0 | 1,132 | 1,132 | ✅ |
| `components/statusBadge` | 1,693 | 1,693 | 0 | 557 | 557 | ✅ |
| `components/suggestion` | 798 | 798 | 0 | 282 | 282 | ✅ |
| `components/switch` | 5,111 | 5,111 | 0 | 1,126 | 1,126 | ✅ |
| `components/switchField` | 4,711 | 4,711 | 0 | 980 | 980 | ✅ |
| `components/table` | 16,467 | 16,467 | 0 | 2,143 | 2,143 | ✅ |
| `components/tableFixed` | 4,664 | 4,664 | 0 | 390 | 390 | ✅ |
| `components/tableFixedDeprecated` | 45,055 | 45,055 | 0 | 2,403 | 2,403 | ✅ |
| `components/tableOfContent` | 4,420 | 4,420 | 0 | 712 | 712 | ✅ |
| `components/tableSortable` | 3,950 | 3,950 | 0 | 819 | 819 | ✅ |
| `components/tableSticked` | 8,315 | 8,315 | 0 | 1,003 | 1,003 | ✅ |
| `components/tableStickedDeprecated` | 146,155 | 146,155 | 0 | 5,703 | 5,703 | ✅ |
| `components/tag` | 3,751 | 3,751 | 0 | 930 | 930 | ✅ |
| `components/textField` | 12,177 | 12,177 | 0 | 1,907 | 1,907 | ✅ |
| `components/textfields` | 40,211 | 40,211 | 0 | 4,315 | 4,315 | ✅ |
| `components/textFlow` | 618 | 618 | 0 | 191 | 191 | ✅ |
| `components/timeline` | 11,802 | 11,802 | 0 | 1,820 | 1,820 | ✅ |
| `components/timepicker` | 7,558 | 7,558 | 0 | 1,462 | 1,462 | ✅ |
| `components/timepickerDeprecated` | n/a | n/a | n/a | — | — | ⓘ does not compile standalone (Can't find stylesheet to import.) |
| `components/title` | 1,335 | 1,335 | 0 | 387 | 387 | ✅ |
| `components/titleSection` | 1,283 | 1,283 | 0 | 350 | 350 | ✅ |
| `components/toast` | 3,906 | 3,906 | 0 | 977 | 977 | ✅ |
| `components/tooltip` | 1,670 | 1,670 | 0 | 548 | 548 | ✅ |
| `components/userPopover` | 2,110 | 2,110 | 0 | 629 | 629 | ✅ |
| `components/userTile` | 2,656 | 2,656 | 0 | 551 | 551 | ✅ |
| `components/verticalNavigation` | 3,562 | 3,562 | 0 | 781 | 781 | ✅ |

## Deprecated elements — before vs after

- **Before**: 210 legacy comment markers found by heuristic scan (no single machine-readable source).
- **After**: 684 exact registry entries in `deprecations.json`.

### After — registry entries by kind

| Kind | Count |
| --- | ---: |
| class | 477 |
| css-variable | 140 |
| sass-api | 18 |
| selector | 49 |

### After — full deprecated inventory

| Kind | Name | Replacement | Scope |
| --- | --- | --- | --- |
| sass-api | `config palette: grey` | — | commons/config |
| sass-api | `config palette: lucca` | — | commons/config |
| sass-api | `config palette: primary` | — | commons/config |
| sass-api | `config palette: secondary` | — | commons/config |
| sass-api | `config.$borderRadius` | `config.$borderRadiusVars` | commons/config |
| sass-api | `config.$colors` | — | commons/config |
| sass-api | `config.$colorsRgb` | — | commons/config |
| sass-api | `config.$deprecatedCardBoxMargin` | — | commons/config |
| sass-api | `config.$deprecatedSpacings` | — | commons/config |
| sass-api | `config.$deprecatedUtilityPrefix` | — | commons/config |
| sass-api | `core.borderRadius` | `core.borderRadiusTokens` | commons/core |
| sass-api | `core.sizes` | — | commons/core |
| class | `pr-u-borderBottom0` | `pr-u-borderBlockEnd0` | commons/utils |
| class | `pr-u-borderBottomLeftRadiusFull` | — | commons/utils |
| class | `pr-u-borderBottomLeftRadiusL` | — | commons/utils |
| class | `pr-u-borderBottomLeftRadiusM` | — | commons/utils |
| class | `pr-u-borderBottomLeftRadiusXL` | — | commons/utils |
| class | `pr-u-borderBottomRightRadiusFull` | — | commons/utils |
| class | `pr-u-borderBottomRightRadiusL` | — | commons/utils |
| class | `pr-u-borderBottomRightRadiusM` | — | commons/utils |
| class | `pr-u-borderBottomRightRadiusXL` | — | commons/utils |
| class | `pr-u-borderEndEndRadiusFull` | — | commons/utils |
| class | `pr-u-borderEndEndRadiusL` | — | commons/utils |
| class | `pr-u-borderEndEndRadiusM` | — | commons/utils |
| class | `pr-u-borderEndEndRadiusXL` | — | commons/utils |
| class | `pr-u-borderEndStartRadiusFull` | — | commons/utils |
| class | `pr-u-borderEndStartRadiusL` | — | commons/utils |
| class | `pr-u-borderEndStartRadiusM` | — | commons/utils |
| class | `pr-u-borderEndStartRadiusXL` | — | commons/utils |
| class | `pr-u-borderLeft0` | `pr-u-borderInlineStart0` | commons/utils |
| class | `pr-u-borderRadiusL` | — | commons/utils |
| class | `pr-u-borderRadiusM` | — | commons/utils |
| class | `pr-u-borderRadiusXL` | — | commons/utils |
| class | `pr-u-borderRight0` | `pr-u-borderInlineEnd0` | commons/utils |
| class | `pr-u-borderStartEndRadiusFull` | — | commons/utils |
| class | `pr-u-borderStartEndRadiusL` | — | commons/utils |
| class | `pr-u-borderStartEndRadiusM` | — | commons/utils |
| class | `pr-u-borderStartEndRadiusXL` | — | commons/utils |
| class | `pr-u-borderStartStartRadiusFull` | — | commons/utils |
| class | `pr-u-borderStartStartRadiusL` | — | commons/utils |
| class | `pr-u-borderStartStartRadiusM` | — | commons/utils |
| class | `pr-u-borderStartStartRadiusXL` | — | commons/utils |
| class | `pr-u-borderTop0` | `pr-u-borderBlockStart0` | commons/utils |
| class | `pr-u-borderTopLeftRadiusFull` | — | commons/utils |
| class | `pr-u-borderTopLeftRadiusL` | — | commons/utils |
| class | `pr-u-borderTopLeftRadiusM` | — | commons/utils |
| class | `pr-u-borderTopLeftRadiusXL` | — | commons/utils |
| class | `pr-u-borderTopRightRadiusFull` | — | commons/utils |
| class | `pr-u-borderTopRightRadiusL` | — | commons/utils |
| class | `pr-u-borderTopRightRadiusM` | — | commons/utils |
| class | `pr-u-borderTopRightRadiusXL` | — | commons/utils |
| class | `pr-u-bottom0` | `pr-u-insetBlockEnd0` | commons/utils |
| class | `pr-u-bottomReset` | `pr-u-insetBlockEnd0` | commons/utils |
| class | `pr-u-clear` | `pr-u-clearBoth` | commons/utils |
| class | `pr-u-clearLeft` | `pr-u-clearInlineStart` | commons/utils |
| class | `pr-u-clearRight` | `pr-u-clearInlineEnd` | commons/utils |
| class | `pr-u-floatLeft` | `pr-u-floatInlineStart` | commons/utils |
| class | `pr-u-floatRight` | `pr-u-floatInlineEnd` | commons/utils |
| class | `pr-u-h5` | — | commons/utils |
| class | `pr-u-h6` | — | commons/utils |
| class | `pr-u-insetReset` | `pr-u-inset0` | commons/utils |
| class | `pr-u-left0` | `pr-u-insetInlineStart0` | commons/utils |
| class | `pr-u-leftReset` | `pr-u-insetInlineStart0` | commons/utils |
| class | `pr-u-marginBottom0` | `pr-u-marginBlockEnd0` | commons/utils |
| class | `pr-u-marginBottom100` | `pr-u-marginBlockEnd100` | commons/utils |
| class | `pr-u-marginBottom150` | `pr-u-marginBlockEnd150` | commons/utils |
| class | `pr-u-marginBottom200` | `pr-u-marginBlockEnd200` | commons/utils |
| class | `pr-u-marginBottom25` | `pr-u-marginBlockEnd25` | commons/utils |
| class | `pr-u-marginBottom250` | `pr-u-marginBlockEnd250` | commons/utils |
| class | `pr-u-marginBottom300` | `pr-u-marginBlockEnd300` | commons/utils |
| class | `pr-u-marginBottom400` | `pr-u-marginBlockEnd400` | commons/utils |
| class | `pr-u-marginBottom50` | `pr-u-marginBlockEnd50` | commons/utils |
| class | `pr-u-marginBottom500` | `pr-u-marginBlockEnd500` | commons/utils |
| class | `pr-u-marginBottom600` | `pr-u-marginBlockEnd600` | commons/utils |
| class | `pr-u-marginBottom700` | `pr-u-marginBlockEnd700` | commons/utils |
| class | `pr-u-marginBottom75` | `pr-u-marginBlockEnd75` | commons/utils |
| class | `pr-u-marginBottom800` | `pr-u-marginBlockEnd800` | commons/utils |
| class | `pr-u-marginBottomAuto` | `pr-u-marginBlockEndAuto` | commons/utils |
| class | `pr-u-marginLeft0` | `pr-u-marginInlineStart0` | commons/utils |
| class | `pr-u-marginLeft100` | `pr-u-marginInlineStart100` | commons/utils |
| class | `pr-u-marginLeft150` | `pr-u-marginInlineStart150` | commons/utils |
| class | `pr-u-marginLeft200` | `pr-u-marginInlineStart200` | commons/utils |
| class | `pr-u-marginLeft25` | `pr-u-marginInlineStart25` | commons/utils |
| class | `pr-u-marginLeft250` | `pr-u-marginInlineStart250` | commons/utils |
| class | `pr-u-marginLeft300` | `pr-u-marginInlineStart300` | commons/utils |
| class | `pr-u-marginLeft400` | `pr-u-marginInlineStart400` | commons/utils |
| class | `pr-u-marginLeft50` | `pr-u-marginInlineStart50` | commons/utils |
| class | `pr-u-marginLeft500` | `pr-u-marginInlineStart500` | commons/utils |
| class | `pr-u-marginLeft600` | `pr-u-marginInlineStart600` | commons/utils |
| class | `pr-u-marginLeft700` | `pr-u-marginInlineStart700` | commons/utils |
| class | `pr-u-marginLeft75` | `pr-u-marginInlineStart75` | commons/utils |
| class | `pr-u-marginLeft800` | `pr-u-marginInlineStart800` | commons/utils |
| class | `pr-u-marginLeftAuto` | `pr-u-marginInlineStartAuto` | commons/utils |
| class | `pr-u-marginRight0` | `pr-u-marginInlineEnd0` | commons/utils |
| class | `pr-u-marginRight100` | `pr-u-marginInlineEnd100` | commons/utils |
| class | `pr-u-marginRight150` | `pr-u-marginInlineEnd150` | commons/utils |
| class | `pr-u-marginRight200` | `pr-u-marginInlineEnd200` | commons/utils |
| class | `pr-u-marginRight25` | `pr-u-marginInlineEnd25` | commons/utils |
| class | `pr-u-marginRight250` | `pr-u-marginInlineEnd250` | commons/utils |
| class | `pr-u-marginRight300` | `pr-u-marginInlineEnd300` | commons/utils |
| class | `pr-u-marginRight400` | `pr-u-marginInlineEnd400` | commons/utils |
| class | `pr-u-marginRight50` | `pr-u-marginInlineEnd50` | commons/utils |
| class | `pr-u-marginRight500` | `pr-u-marginInlineEnd500` | commons/utils |
| class | `pr-u-marginRight600` | `pr-u-marginInlineEnd600` | commons/utils |
| class | `pr-u-marginRight700` | `pr-u-marginInlineEnd700` | commons/utils |
| class | `pr-u-marginRight75` | `pr-u-marginInlineEnd75` | commons/utils |
| class | `pr-u-marginRight800` | `pr-u-marginInlineEnd800` | commons/utils |
| class | `pr-u-marginRightAuto` | `pr-u-marginInlineEndAuto` | commons/utils |
| class | `pr-u-marginTop0` | `pr-u-marginBlockStart0` | commons/utils |
| class | `pr-u-marginTop100` | `pr-u-marginBlockStart100` | commons/utils |
| class | `pr-u-marginTop150` | `pr-u-marginBlockStart150` | commons/utils |
| class | `pr-u-marginTop200` | `pr-u-marginBlockStart200` | commons/utils |
| class | `pr-u-marginTop25` | `pr-u-marginBlockStart25` | commons/utils |
| class | `pr-u-marginTop250` | `pr-u-marginBlockStart250` | commons/utils |
| class | `pr-u-marginTop300` | `pr-u-marginBlockStart300` | commons/utils |
| class | `pr-u-marginTop400` | `pr-u-marginBlockStart400` | commons/utils |
| class | `pr-u-marginTop50` | `pr-u-marginBlockStart50` | commons/utils |
| class | `pr-u-marginTop500` | `pr-u-marginBlockStart500` | commons/utils |
| class | `pr-u-marginTop600` | `pr-u-marginBlockStart600` | commons/utils |
| class | `pr-u-marginTop700` | `pr-u-marginBlockStart700` | commons/utils |
| class | `pr-u-marginTop75` | `pr-u-marginBlockStart75` | commons/utils |
| class | `pr-u-marginTop800` | `pr-u-marginBlockStart800` | commons/utils |
| class | `pr-u-marginTopAuto` | `pr-u-marginBlockStartAuto` | commons/utils |
| class | `pr-u-paddingBottom0` | `pr-u-paddingBlockEnd0` | commons/utils |
| class | `pr-u-paddingBottom100` | `pr-u-paddingBlockEnd100` | commons/utils |
| class | `pr-u-paddingBottom150` | `pr-u-paddingBlockEnd150` | commons/utils |
| class | `pr-u-paddingBottom200` | `pr-u-paddingBlockEnd200` | commons/utils |
| class | `pr-u-paddingBottom25` | `pr-u-paddingBlockEnd25` | commons/utils |
| class | `pr-u-paddingBottom250` | `pr-u-paddingBlockEnd250` | commons/utils |
| class | `pr-u-paddingBottom300` | `pr-u-paddingBlockEnd300` | commons/utils |
| class | `pr-u-paddingBottom400` | `pr-u-paddingBlockEnd400` | commons/utils |
| class | `pr-u-paddingBottom50` | `pr-u-paddingBlockEnd50` | commons/utils |
| class | `pr-u-paddingBottom500` | `pr-u-paddingBlockEnd500` | commons/utils |
| class | `pr-u-paddingBottom600` | `pr-u-paddingBlockEnd600` | commons/utils |
| class | `pr-u-paddingBottom700` | `pr-u-paddingBlockEnd700` | commons/utils |
| class | `pr-u-paddingBottom75` | `pr-u-paddingBlockEnd75` | commons/utils |
| class | `pr-u-paddingBottom800` | `pr-u-paddingBlockEnd800` | commons/utils |
| class | `pr-u-paddingLeft0` | `pr-u-paddingInlineStart0` | commons/utils |
| class | `pr-u-paddingLeft100` | `pr-u-paddingInlineStart100` | commons/utils |
| class | `pr-u-paddingLeft150` | `pr-u-paddingInlineStart150` | commons/utils |
| class | `pr-u-paddingLeft200` | `pr-u-paddingInlineStart200` | commons/utils |
| class | `pr-u-paddingLeft25` | `pr-u-paddingInlineStart25` | commons/utils |
| class | `pr-u-paddingLeft250` | `pr-u-paddingInlineStart250` | commons/utils |
| class | `pr-u-paddingLeft300` | `pr-u-paddingInlineStart300` | commons/utils |
| class | `pr-u-paddingLeft400` | `pr-u-paddingInlineStart400` | commons/utils |
| class | `pr-u-paddingLeft50` | `pr-u-paddingInlineStart50` | commons/utils |
| class | `pr-u-paddingLeft500` | `pr-u-paddingInlineStart500` | commons/utils |
| class | `pr-u-paddingLeft600` | `pr-u-paddingInlineStart600` | commons/utils |
| class | `pr-u-paddingLeft700` | `pr-u-paddingInlineStart700` | commons/utils |
| class | `pr-u-paddingLeft75` | `pr-u-paddingInlineStart75` | commons/utils |
| class | `pr-u-paddingLeft800` | `pr-u-paddingInlineStart800` | commons/utils |
| class | `pr-u-paddingRight0` | `pr-u-paddingInlineEnd0` | commons/utils |
| class | `pr-u-paddingRight100` | `pr-u-paddingInlineEnd100` | commons/utils |
| class | `pr-u-paddingRight150` | `pr-u-paddingInlineEnd150` | commons/utils |
| class | `pr-u-paddingRight200` | `pr-u-paddingInlineEnd200` | commons/utils |
| class | `pr-u-paddingRight25` | `pr-u-paddingInlineEnd25` | commons/utils |
| class | `pr-u-paddingRight250` | `pr-u-paddingInlineEnd250` | commons/utils |
| class | `pr-u-paddingRight300` | `pr-u-paddingInlineEnd300` | commons/utils |
| class | `pr-u-paddingRight400` | `pr-u-paddingInlineEnd400` | commons/utils |
| class | `pr-u-paddingRight50` | `pr-u-paddingInlineEnd50` | commons/utils |
| class | `pr-u-paddingRight500` | `pr-u-paddingInlineEnd500` | commons/utils |
| class | `pr-u-paddingRight600` | `pr-u-paddingInlineEnd600` | commons/utils |
| class | `pr-u-paddingRight700` | `pr-u-paddingInlineEnd700` | commons/utils |
| class | `pr-u-paddingRight75` | `pr-u-paddingInlineEnd75` | commons/utils |
| class | `pr-u-paddingRight800` | `pr-u-paddingInlineEnd800` | commons/utils |
| class | `pr-u-paddingTop0` | `pr-u-paddingBlockStart0` | commons/utils |
| class | `pr-u-paddingTop100` | `pr-u-paddingBlockStart100` | commons/utils |
| class | `pr-u-paddingTop150` | `pr-u-paddingBlockStart150` | commons/utils |
| class | `pr-u-paddingTop200` | `pr-u-paddingBlockStart200` | commons/utils |
| class | `pr-u-paddingTop25` | `pr-u-paddingBlockStart25` | commons/utils |
| class | `pr-u-paddingTop250` | `pr-u-paddingBlockStart250` | commons/utils |
| class | `pr-u-paddingTop300` | `pr-u-paddingBlockStart300` | commons/utils |
| class | `pr-u-paddingTop400` | `pr-u-paddingBlockStart400` | commons/utils |
| class | `pr-u-paddingTop50` | `pr-u-paddingBlockStart50` | commons/utils |
| class | `pr-u-paddingTop500` | `pr-u-paddingBlockStart500` | commons/utils |
| class | `pr-u-paddingTop600` | `pr-u-paddingBlockStart600` | commons/utils |
| class | `pr-u-paddingTop700` | `pr-u-paddingBlockStart700` | commons/utils |
| class | `pr-u-paddingTop75` | `pr-u-paddingBlockStart75` | commons/utils |
| class | `pr-u-paddingTop800` | `pr-u-paddingBlockStart800` | commons/utils |
| class | `pr-u-right0` | `pr-u-insetInlineEnd0` | commons/utils |
| class | `pr-u-rightReset` | `pr-u-insetInlineEnd0` | commons/utils |
| class | `pr-u-textAlignLeft` | `pr-u-textAlignStart` | commons/utils |
| class | `pr-u-textAlignRight` | `pr-u-textAlignEnd` | commons/utils |
| class | `pr-u-textBlueberry` | `pr-u-colorTextBlueberry` | commons/utils |
| class | `pr-u-textBrand` | `pr-u-colorTextBrand` | commons/utils |
| class | `pr-u-textBrandContrasted` | `pr-u-colorTextBrandContrasted` | commons/utils |
| class | `pr-u-textCc` | `pr-u-colorTextCc` | commons/utils |
| class | `pr-u-textCenter` | `pr-u-textAlignCenter` | commons/utils |
| class | `pr-u-textCleemy` | `pr-u-colorTextCleemy` | commons/utils |
| class | `pr-u-textCoreHR` | `pr-u-colorTextCoreHR` | commons/utils |
| class | `pr-u-textCritical` | `pr-u-colorTextCritical` | commons/utils |
| class | `pr-u-textCucumber` | `pr-u-colorTextCucumber` | commons/utils |
| class | `pr-u-textDefault` | — | commons/utils |
| class | `pr-u-textError` | `pr-u-colorTextError` | commons/utils |
| class | `pr-u-textGlacier` | `pr-u-colorTextGlacier` | commons/utils |
| class | `pr-u-textGrape` | `pr-u-colorTextGrape` | commons/utils |
| class | `pr-u-textGrey` | `pr-u-colorTextGrey` | commons/utils |
| class | `pr-u-textKiwi` | `pr-u-colorTextKiwi` | commons/utils |
| class | `pr-u-textL` | — | commons/utils |
| class | `pr-u-textLagoon` | `pr-u-colorTextLagoon` | commons/utils |
| class | `pr-u-textLavender` | `pr-u-colorTextLavender` | commons/utils |
| class | `pr-u-textLeft` | `pr-u-textAlignStart` | commons/utils |
| class | `pr-u-textLight` | — | commons/utils |
| class | `pr-u-textLime` | `pr-u-colorTextLime` | commons/utils |
| class | `pr-u-textLucca` | `pr-u-colorTextLucca` | commons/utils |
| class | `pr-u-textM` | — | commons/utils |
| class | `pr-u-textMint` | `pr-u-colorTextMint` | commons/utils |
| class | `pr-u-textNavigation` | `pr-u-colorTextNavigation` | commons/utils |
| class | `pr-u-textNeutral` | `pr-u-colorTextNeutral` | commons/utils |
| class | `pr-u-textOrchid` | `pr-u-colorTextOrchid` | commons/utils |
| class | `pr-u-textPagga` | `pr-u-colorTextPagga` | commons/utils |
| class | `pr-u-textPineapple` | `pr-u-colorTextPineapple` | commons/utils |
| class | `pr-u-textPineappleContrasted` | `pr-u-colorTextPineappleContrasted` | commons/utils |
| class | `pr-u-textPlaceholder` | `pr-u-colorInputTextPlaceholder` | commons/utils |
| class | `pr-u-textPoplee` | `pr-u-colorTextPoplee` | commons/utils |
| class | `pr-u-textPrimary` | `pr-u-colorTextPrimary` | commons/utils |
| class | `pr-u-textProduct` | `pr-u-colorTextProduct` | commons/utils |
| class | `pr-u-textPumpkin` | `pr-u-colorTextPumpkin` | commons/utils |
| class | `pr-u-textRight` | `pr-u-textAlignEnd` | commons/utils |
| class | `pr-u-textS` | — | commons/utils |
| class | `pr-u-textSecondary` | `pr-u-colorTextSecondary` | commons/utils |
| class | `pr-u-textSuccess` | `pr-u-colorTextSuccess` | commons/utils |
| class | `pr-u-textSuccessContrasted` | `pr-u-colorTextSuccessContrasted` | commons/utils |
| class | `pr-u-textTimmi` | `pr-u-colorTextTimmi` | commons/utils |
| class | `pr-u-textWarning` | `pr-u-colorTextWarning` | commons/utils |
| class | `pr-u-textWarningContrasted` | `pr-u-colorTextWarningContrasted` | commons/utils |
| class | `pr-u-textWatermelon` | `pr-u-colorTextWatermelon` | commons/utils |
| class | `pr-u-textXL` | — | commons/utils |
| class | `pr-u-textXS` | — | commons/utils |
| class | `pr-u-textXXL` | — | commons/utils |
| class | `pr-u-textXXXL` | — | commons/utils |
| class | `pr-u-top0` | `pr-u-insetBlockStart0` | commons/utils |
| class | `pr-u-topReset` | `pr-u-insetBlockStart0` | commons/utils |
| class | `u-alignItemsBaseline` | `pr-u-alignItemsBaseline` | commons/utils |
| class | `u-alignItemsCenter` | `pr-u-alignItemsCenter` | commons/utils |
| class | `u-alignItemsFlexEnd` | `pr-u-alignItemsFlexEnd` | commons/utils |
| class | `u-alignItemsFlexStart` | `pr-u-alignItemsFlexStart` | commons/utils |
| class | `u-alignItemsStretch` | `pr-u-alignItemsStretch` | commons/utils |
| class | `u-alignSelfBaseline` | `pr-u-alignSelfBaseline` | commons/utils |
| class | `u-alignSelfCenter` | `pr-u-alignSelfCenter` | commons/utils |
| class | `u-alignSelfFlexEnd` | `pr-u-alignSelfFlexEnd` | commons/utils |
| class | `u-alignSelfFlexStart` | `pr-u-alignSelfFlexStart` | commons/utils |
| class | `u-alignSelfStretch` | `pr-u-alignSelfStretch` | commons/utils |
| class | `u-animated` | `pr-u-animated` | commons/utils |
| class | `u-blockSize100\%` | `pr-u-blockSize100\%` | commons/utils |
| class | `u-blockSizeFitContent` | `pr-u-blockSizeFitContent` | commons/utils |
| class | `u-bodyM` | `pr-u-bodyM` | commons/utils |
| class | `u-bodyS` | `pr-u-bodyS` | commons/utils |
| class | `u-bodyXS` | `pr-u-bodyXS` | commons/utils |
| class | `u-borderBottomLeftRadiusFull` | — | commons/utils |
| class | `u-borderBottomLeftRadiusL` | — | commons/utils |
| class | `u-borderBottomLeftRadiusM` | — | commons/utils |
| class | `u-borderBottomLeftRadiusXL` | — | commons/utils |
| class | `u-borderBottomRightRadiusFull` | — | commons/utils |
| class | `u-borderBottomRightRadiusL` | — | commons/utils |
| class | `u-borderBottomRightRadiusM` | — | commons/utils |
| class | `u-borderBottomRightRadiusXL` | — | commons/utils |
| class | `u-borderEndEndRadiusFull` | — | commons/utils |
| class | `u-borderEndEndRadiusL` | — | commons/utils |
| class | `u-borderEndEndRadiusM` | — | commons/utils |
| class | `u-borderEndEndRadiusXL` | — | commons/utils |
| class | `u-borderEndStartRadiusFull` | — | commons/utils |
| class | `u-borderEndStartRadiusL` | — | commons/utils |
| class | `u-borderEndStartRadiusM` | — | commons/utils |
| class | `u-borderEndStartRadiusXL` | — | commons/utils |
| class | `u-borderRadiusFull` | — | commons/utils |
| class | `u-borderRadiusL` | — | commons/utils |
| class | `u-borderRadiusM` | — | commons/utils |
| class | `u-borderRadiusXL` | — | commons/utils |
| class | `u-borderStartEndRadiusFull` | — | commons/utils |
| class | `u-borderStartEndRadiusL` | — | commons/utils |
| class | `u-borderStartEndRadiusM` | — | commons/utils |
| class | `u-borderStartEndRadiusXL` | — | commons/utils |
| class | `u-borderStartStartRadiusFull` | — | commons/utils |
| class | `u-borderStartStartRadiusL` | — | commons/utils |
| class | `u-borderStartStartRadiusM` | — | commons/utils |
| class | `u-borderStartStartRadiusXL` | — | commons/utils |
| class | `u-borderTopLeftRadiusFull` | — | commons/utils |
| class | `u-borderTopLeftRadiusL` | — | commons/utils |
| class | `u-borderTopLeftRadiusM` | — | commons/utils |
| class | `u-borderTopLeftRadiusXL` | — | commons/utils |
| class | `u-borderTopRightRadiusFull` | — | commons/utils |
| class | `u-borderTopRightRadiusL` | — | commons/utils |
| class | `u-borderTopRightRadiusM` | — | commons/utils |
| class | `u-borderTopRightRadiusXL` | — | commons/utils |
| class | `u-bottom0` | `pr-u-insetBlockEnd0` | commons/utils |
| class | `u-bottomReset` | `pr-u-insetBlockEnd0` | commons/utils |
| class | `u-buttonReset` | `pr-u-buttonReset` | commons/utils |
| class | `u-clear` | `pr-u-clearBoth` | commons/utils |
| class | `u-clearBoth` | `pr-u-clearBoth` | commons/utils |
| class | `u-clearfix` | `pr-u-clearfix` | commons/utils |
| class | `u-clearInlineEnd` | `pr-u-clearInlineEnd` | commons/utils |
| class | `u-clearInlineStart` | `pr-u-clearInlineStart` | commons/utils |
| class | `u-clearLeft` | `pr-u-clearInlineStart` | commons/utils |
| class | `u-clearRight` | `pr-u-clearInlineEnd` | commons/utils |
| class | `u-cursorAuto` | `pr-u-cursorAuto` | commons/utils |
| class | `u-cursorDefault` | `pr-u-cursorDefault` | commons/utils |
| class | `u-cursorPointer` | `pr-u-cursorPointer` | commons/utils |
| class | `u-cursorText` | `pr-u-cursorText` | commons/utils |
| class | `u-descriptionListReset` | `pr-u-descriptionListReset` | commons/utils |
| class | `u-displayBlock` | `pr-u-displayBlock` | commons/utils |
| class | `u-displayContents` | `pr-u-displayContents` | commons/utils |
| class | `u-displayFlex` | `pr-u-displayFlex` | commons/utils |
| class | `u-displayGrid` | `pr-u-displayGrid` | commons/utils |
| class | `u-displayInline` | `pr-u-displayInline` | commons/utils |
| class | `u-displayInlineBlock` | `pr-u-displayInlineBlock` | commons/utils |
| class | `u-displayInlineFlex` | `pr-u-displayInlineFlex` | commons/utils |
| class | `u-displayInlineGrid` | `pr-u-displayInlineGrid` | commons/utils |
| class | `u-displayNone` | `pr-u-displayNone` | commons/utils |
| class | `u-ellipsis` | `pr-u-ellipsis` | commons/utils |
| class | `u-flexBasis0` | `pr-u-flexBasis0` | commons/utils |
| class | `u-flexBasisAuto` | `pr-u-flexBasisAuto` | commons/utils |
| class | `u-flexDirectionColumn` | `pr-u-flexDirectionColumn` | commons/utils |
| class | `u-flexDirectionColumnReverse` | `pr-u-flexDirectionColumnReverse` | commons/utils |
| class | `u-flexDirectionRow` | `pr-u-flexDirectionRow` | commons/utils |
| class | `u-flexDirectionRowReverse` | `pr-u-flexDirectionRowReverse` | commons/utils |
| class | `u-flexGrow0` | `pr-u-flexGrow0` | commons/utils |
| class | `u-flexGrow1` | `pr-u-flexGrow1` | commons/utils |
| class | `u-flexShrink0` | `pr-u-flexShrink0` | commons/utils |
| class | `u-flexShrink1` | `pr-u-flexShrink1` | commons/utils |
| class | `u-flexWrapNowrap` | `pr-u-flexWrapNowrap` | commons/utils |
| class | `u-flexWrapWrap` | `pr-u-flexWrapWrap` | commons/utils |
| class | `u-flexWrapWrapReverse` | `pr-u-flexWrapWrapReverse` | commons/utils |
| class | `u-floatInlineEnd` | `pr-u-floatInlineEnd` | commons/utils |
| class | `u-floatInlineStart` | `pr-u-floatInlineStart` | commons/utils |
| class | `u-floatLeft` | `pr-u-floatInlineStart` | commons/utils |
| class | `u-floatRight` | `pr-u-floatInlineEnd` | commons/utils |
| class | `u-fontFamily` | `pr-u-fontFamily` | commons/utils |
| class | `u-fontFamilyBrand` | `pr-u-fontFamilyBrand` | commons/utils |
| class | `u-fontFamilyCursive` | `pr-u-fontFamilyCursive` | commons/utils |
| class | `u-fontStyleItalic` | `pr-u-fontStyleItalic` | commons/utils |
| class | `u-fontStyleNormal` | `pr-u-fontStyleNormal` | commons/utils |
| class | `u-fontWeight400` | `pr-u-fontWeight400` | commons/utils |
| class | `u-fontWeight600` | `pr-u-fontWeight600` | commons/utils |
| class | `u-fontWeight700` | `pr-u-fontWeight700` | commons/utils |
| class | `u-fontWeight900` | `pr-u-fontWeight900` | commons/utils |
| class | `u-fontWeightBold` | `pr-u-fontWeightBold` | commons/utils |
| class | `u-fontWeightNormal` | `pr-u-fontWeightNormal` | commons/utils |
| class | `u-fontWeightRegular` | `pr-u-fontWeightRegular` | commons/utils |
| class | `u-fontWeightSemiBold` | `pr-u-fontWeightSemiBold` | commons/utils |
| class | `u-h1` | `pr-u-h1` | commons/utils |
| class | `u-h2` | `pr-u-h2` | commons/utils |
| class | `u-h3` | `pr-u-h3` | commons/utils |
| class | `u-h4` | `pr-u-h4` | commons/utils |
| class | `u-h5` | — | commons/utils |
| class | `u-h6` | — | commons/utils |
| class | `u-height100\%` | `pr-u-height100\%` | commons/utils |
| class | `u-heightFitContent` | `pr-u-heightFitContent` | commons/utils |
| class | `u-inlineSize100\%` | `pr-u-inlineSize100\%` | commons/utils |
| class | `u-inlineSizeFitContent` | `pr-u-inlineSizeFitContent` | commons/utils |
| class | `u-inset0` | `pr-u-inset0` | commons/utils |
| class | `u-insetBlock-end0` | `pr-u-insetBlock-end0` | commons/utils |
| class | `u-insetBlock-start0` | `pr-u-insetBlock-start0` | commons/utils |
| class | `u-insetBlock0` | `pr-u-insetBlock0` | commons/utils |
| class | `u-insetInline-end0` | `pr-u-insetInline-end0` | commons/utils |
| class | `u-insetInline-start0` | `pr-u-insetInline-start0` | commons/utils |
| class | `u-insetInline0` | `pr-u-insetInline0` | commons/utils |
| class | `u-insetReset` | `pr-u-inset0` | commons/utils |
| class | `u-justifyContentCenter` | `pr-u-justifyContentCenter` | commons/utils |
| class | `u-justifyContentFlexEnd` | `pr-u-justifyContentFlexEnd` | commons/utils |
| class | `u-justifyContentFlexStart` | `pr-u-justifyContentFlexStart` | commons/utils |
| class | `u-justifyContentSpaceAround` | `pr-u-justifyContentSpaceAround` | commons/utils |
| class | `u-justifyContentSpaceBetween` | `pr-u-justifyContentSpaceBetween` | commons/utils |
| class | `u-justifyContentSpaceEvenly` | `pr-u-justifyContentSpaceEvenly` | commons/utils |
| class | `u-left0` | `pr-u-insetInlineStart0` | commons/utils |
| class | `u-leftReset` | `pr-u-insetInlineStart0` | commons/utils |
| class | `u-listReset` | `pr-u-listReset` | commons/utils |
| class | `u-marginBlock-end0` | `pr-u-marginBlock-end0` | commons/utils |
| class | `u-marginBlock-start0` | `pr-u-marginBlock-start0` | commons/utils |
| class | `u-marginBlock0` | `pr-u-marginBlock0` | commons/utils |
| class | `u-marginInline-end0` | `pr-u-marginInline-end0` | commons/utils |
| class | `u-marginInline-start0` | `pr-u-marginInline-start0` | commons/utils |
| class | `u-marginInline0` | `pr-u-marginInline0` | commons/utils |
| class | `u-mask` | `pr-u-mask` | commons/utils |
| class | `u-maxInlineSize100\%` | `pr-u-maxInlineSize100\%` | commons/utils |
| class | `u-maxInlineSizeFitContent` | `pr-u-maxInlineSizeFitContent` | commons/utils |
| class | `u-minBlockSize0` | `pr-u-minBlockSize0` | commons/utils |
| class | `u-minHeight0` | `pr-u-minHeight0` | commons/utils |
| class | `u-minInlineSize0` | `pr-u-minInlineSize0` | commons/utils |
| class | `u-minWidth0` | `pr-u-minWidth0` | commons/utils |
| class | `u-noSpinButtons` | `pr-u-noSpinButtons` | commons/utils |
| class | `u-onlyPrintDisplayBlock` | `pr-u-onlyPrintDisplayBlock` | commons/utils |
| class | `u-onlyPrintDisplayContents` | `pr-u-onlyPrintDisplayContents` | commons/utils |
| class | `u-onlyPrintDisplayFlex` | `pr-u-onlyPrintDisplayFlex` | commons/utils |
| class | `u-onlyPrintDisplayGrid` | `pr-u-onlyPrintDisplayGrid` | commons/utils |
| class | `u-onlyPrintDisplayInline` | `pr-u-onlyPrintDisplayInline` | commons/utils |
| class | `u-onlyPrintDisplayInlineBlock` | `pr-u-onlyPrintDisplayInlineBlock` | commons/utils |
| class | `u-onlyPrintDisplayInlineFlex` | `pr-u-onlyPrintDisplayInlineFlex` | commons/utils |
| class | `u-onlyPrintDisplayInlineGrid` | `pr-u-onlyPrintDisplayInlineGrid` | commons/utils |
| class | `u-onlyPrintDisplayNone` | `pr-u-onlyPrintDisplayNone` | commons/utils |
| class | `u-order1` | `pr-u-order1` | commons/utils |
| class | `u-orderMinus1` | `pr-u-orderMinus1` | commons/utils |
| class | `u-overflowAuto` | `pr-u-overflowAuto` | commons/utils |
| class | `u-overflowHidden` | `pr-u-overflowHidden` | commons/utils |
| class | `u-overflowScroll` | `pr-u-overflowScroll` | commons/utils |
| class | `u-overflowVisible` | `pr-u-overflowVisible` | commons/utils |
| class | `u-paddingBlock-end0` | `pr-u-paddingBlock-end0` | commons/utils |
| class | `u-paddingBlock-start0` | `pr-u-paddingBlock-start0` | commons/utils |
| class | `u-paddingBlock0` | `pr-u-paddingBlock0` | commons/utils |
| class | `u-paddingInline-end0` | `pr-u-paddingInline-end0` | commons/utils |
| class | `u-paddingInline-start0` | `pr-u-paddingInline-start0` | commons/utils |
| class | `u-paddingInline0` | `pr-u-paddingInline0` | commons/utils |
| class | `u-pointerEventsAuto` | `pr-u-pointerEventsAuto` | commons/utils |
| class | `u-pointerEventsNone` | `pr-u-pointerEventsNone` | commons/utils |
| class | `u-positionAbsolute` | `pr-u-positionAbsolute` | commons/utils |
| class | `u-positionFixed` | `pr-u-positionFixed` | commons/utils |
| class | `u-positionRelative` | `pr-u-positionRelative` | commons/utils |
| class | `u-positionStatic` | `pr-u-positionStatic` | commons/utils |
| class | `u-positionSticky` | `pr-u-positionSticky` | commons/utils |
| class | `u-right0` | `pr-u-insetInlineEnd0` | commons/utils |
| class | `u-rightReset` | `pr-u-insetInlineEnd0` | commons/utils |
| class | `u-scrollBehaviorAuto` | `pr-u-scrollBehaviorAuto` | commons/utils |
| class | `u-scrollBehaviorSmooth` | `pr-u-scrollBehaviorSmooth` | commons/utils |
| class | `u-summaryReset` | `pr-u-summaryReset` | commons/utils |
| class | `u-textAlignCenter` | `pr-u-textAlignCenter` | commons/utils |
| class | `u-textAlignEnd` | `pr-u-textAlignEnd` | commons/utils |
| class | `u-textAlignLeft` | `pr-u-textAlignStart` | commons/utils |
| class | `u-textAlignRight` | `pr-u-textAlignEnd` | commons/utils |
| class | `u-textAlignStart` | `pr-u-textAlignStart` | commons/utils |
| class | `u-textBlueberry` | `pr-u-colorTextBlueberry` | commons/utils |
| class | `u-textBrand` | `pr-u-colorTextBrand` | commons/utils |
| class | `u-textBrandContrasted` | `pr-u-colorTextBrandContrasted` | commons/utils |
| class | `u-textCc` | `pr-u-colorTextCc` | commons/utils |
| class | `u-textCenter` | `pr-u-textAlignCenter` | commons/utils |
| class | `u-textCleemy` | `pr-u-colorTextCleemy` | commons/utils |
| class | `u-textCoreHR` | `pr-u-colorTextCoreHR` | commons/utils |
| class | `u-textCritical` | `pr-u-colorTextCritical` | commons/utils |
| class | `u-textCucumber` | `pr-u-colorTextCucumber` | commons/utils |
| class | `u-textDecorationLineThrough` | `pr-u-textDecorationLineThrough` | commons/utils |
| class | `u-textDecorationNone` | `pr-u-textDecorationNone` | commons/utils |
| class | `u-textDecorationUnderline` | `pr-u-textDecorationUnderline` | commons/utils |
| class | `u-textDefault` | — | commons/utils |
| class | `u-textError` | `pr-u-colorTextError` | commons/utils |
| class | `u-textGlacier` | `pr-u-colorTextGlacier` | commons/utils |
| class | `u-textGrape` | `pr-u-colorTextGrape` | commons/utils |
| class | `u-textGrey` | `pr-u-colorTextGrey` | commons/utils |
| class | `u-textKiwi` | `pr-u-colorTextKiwi` | commons/utils |
| class | `u-textL` | — | commons/utils |
| class | `u-textLagoon` | `pr-u-colorTextLagoon` | commons/utils |
| class | `u-textLavender` | `pr-u-colorTextLavender` | commons/utils |
| class | `u-textLeft` | `pr-u-textAlignStart` | commons/utils |
| class | `u-textLight` | — | commons/utils |
| class | `u-textLime` | `pr-u-colorTextLime` | commons/utils |
| class | `u-textLucca` | `pr-u-colorTextLucca` | commons/utils |
| class | `u-textM` | — | commons/utils |
| class | `u-textMint` | `pr-u-colorTextMint` | commons/utils |
| class | `u-textNavigation` | `pr-u-colorTextNavigation` | commons/utils |
| class | `u-textNeutral` | `pr-u-colorTextNeutral` | commons/utils |
| class | `u-textOrchid` | `pr-u-colorTextOrchid` | commons/utils |
| class | `u-textPagga` | `pr-u-colorTextPagga` | commons/utils |
| class | `u-textPineapple` | `pr-u-colorTextPineapple` | commons/utils |
| class | `u-textPineappleContrasted` | `pr-u-colorTextPineappleContrasted` | commons/utils |
| class | `u-textPlaceholder` | `pr-u-colorInputTextPlaceholder` | commons/utils |
| class | `u-textPoplee` | `pr-u-colorTextPoplee` | commons/utils |
| class | `u-textPrimary` | `pr-u-colorTextPrimary` | commons/utils |
| class | `u-textProduct` | `pr-u-colorTextProduct` | commons/utils |
| class | `u-textPumpkin` | `pr-u-colorTextPumpkin` | commons/utils |
| class | `u-textRight` | `pr-u-textAlignEnd` | commons/utils |
| class | `u-textS` | — | commons/utils |
| class | `u-textSecondary` | `pr-u-colorTextSecondary` | commons/utils |
| class | `u-textSuccess` | `pr-u-colorTextSuccess` | commons/utils |
| class | `u-textSuccessContrasted` | `pr-u-colorTextSuccessContrasted` | commons/utils |
| class | `u-textTimmi` | `pr-u-colorTextTimmi` | commons/utils |
| class | `u-textWarning` | `pr-u-colorTextWarning` | commons/utils |
| class | `u-textWarningContrasted` | `pr-u-colorTextWarningContrasted` | commons/utils |
| class | `u-textWatermelon` | `pr-u-colorTextWatermelon` | commons/utils |
| class | `u-textXL` | — | commons/utils |
| class | `u-textXS` | — | commons/utils |
| class | `u-textXXL` | — | commons/utils |
| class | `u-textXXXL` | — | commons/utils |
| class | `u-top0` | `pr-u-insetBlockStart0` | commons/utils |
| class | `u-topReset` | `pr-u-insetBlockStart0` | commons/utils |
| class | `u-verticalAlignBaseline` | `pr-u-verticalAlignBaseline` | commons/utils |
| class | `u-verticalAlignBottom` | `pr-u-verticalAlignBottom` | commons/utils |
| class | `u-verticalAlignMiddle` | `pr-u-verticalAlignMiddle` | commons/utils |
| class | `u-verticalAlignSub` | `pr-u-verticalAlignSub` | commons/utils |
| class | `u-verticalAlignSuper` | `pr-u-verticalAlignSuper` | commons/utils |
| class | `u-verticalAlignTextBottom` | `pr-u-verticalAlignTextBottom` | commons/utils |
| class | `u-verticalAlignTextTop` | `pr-u-verticalAlignTextTop` | commons/utils |
| class | `u-verticalAlignTop` | `pr-u-verticalAlignTop` | commons/utils |
| class | `u-visibilityCollapse` | `pr-u-visibilityCollapse` | commons/utils |
| class | `u-visibilityHidden` | `pr-u-visibilityHidden` | commons/utils |
| class | `u-visibilityVisible` | `pr-u-visibilityVisible` | commons/utils |
| class | `u-whiteSpaceNormal` | `pr-u-whiteSpaceNormal` | commons/utils |
| class | `u-whiteSpaceNowrap` | `pr-u-whiteSpaceNowrap` | commons/utils |
| class | `u-whiteSpacePreLine` | `pr-u-whiteSpacePreLine` | commons/utils |
| class | `u-width100\%` | `pr-u-width100\%` | commons/utils |
| class | `u-widthFitContent` | `pr-u-widthFitContent` | commons/utils |
| class | `u-prefersContrastMore` | `pr-u-prefersContrastMore` | commons/vars |
| css-variable | `--colors-black-color` | — | commons/vars |
| css-variable | `--colors-grey-400-rgb` | — | commons/vars |
| css-variable | `--colors-grey-900-rgb` | — | commons/vars |
| css-variable | `--colors-neutral-400-rgb` | — | commons/vars |
| css-variable | `--colors-neutral-900-rgb` | — | commons/vars |
| css-variable | `--colors-white-color` | — | commons/vars |
| css-variable | `--colors-white-rgb` | — | commons/vars |
| css-variable | `--commons-background-base` | `--pr-t-elevation-surface-default` | commons/vars |
| css-variable | `--commons-divider-color` | — | commons/vars |
| css-variable | `--commons-font-family` | `--pr-t-font-family` | commons/vars |
| css-variable | `--commons-font-family-brand` | `--pr-t-font-family-brand` | commons/vars |
| css-variable | `--commons-font-family-cursive` | `--pr-t-font-family-cursive` | commons/vars |
| css-variable | `--palettes-blueberry-text` | — | commons/vars |
| css-variable | `--palettes-brand-text` | — | commons/vars |
| css-variable | `--palettes-brandContrasted-text` | — | commons/vars |
| css-variable | `--palettes-cc-text` | — | commons/vars |
| css-variable | `--palettes-cleemy-text` | — | commons/vars |
| css-variable | `--palettes-coreHR-text` | — | commons/vars |
| css-variable | `--palettes-critical-text` | — | commons/vars |
| css-variable | `--palettes-cucumber-text` | — | commons/vars |
| css-variable | `--palettes-error-text` | — | commons/vars |
| css-variable | `--palettes-glacier-text` | — | commons/vars |
| css-variable | `--palettes-grape-text` | — | commons/vars |
| css-variable | `--palettes-grey-0` | — | commons/vars |
| css-variable | `--palettes-grey-100` | — | commons/vars |
| css-variable | `--palettes-grey-200` | — | commons/vars |
| css-variable | `--palettes-grey-25` | — | commons/vars |
| css-variable | `--palettes-grey-300` | — | commons/vars |
| css-variable | `--palettes-grey-400` | — | commons/vars |
| css-variable | `--palettes-grey-50` | — | commons/vars |
| css-variable | `--palettes-grey-500` | — | commons/vars |
| css-variable | `--palettes-grey-600` | — | commons/vars |
| css-variable | `--palettes-grey-700` | — | commons/vars |
| css-variable | `--palettes-grey-800` | — | commons/vars |
| css-variable | `--palettes-grey-900` | — | commons/vars |
| css-variable | `--palettes-grey-text` | — | commons/vars |
| css-variable | `--palettes-kiwi-text` | — | commons/vars |
| css-variable | `--palettes-lagoon-text` | — | commons/vars |
| css-variable | `--palettes-lavender-text` | — | commons/vars |
| css-variable | `--palettes-lime-text` | — | commons/vars |
| css-variable | `--palettes-lucca-0` | — | commons/vars |
| css-variable | `--palettes-lucca-100` | — | commons/vars |
| css-variable | `--palettes-lucca-200` | — | commons/vars |
| css-variable | `--palettes-lucca-300` | — | commons/vars |
| css-variable | `--palettes-lucca-400` | — | commons/vars |
| css-variable | `--palettes-lucca-50` | — | commons/vars |
| css-variable | `--palettes-lucca-500` | — | commons/vars |
| css-variable | `--palettes-lucca-600` | — | commons/vars |
| css-variable | `--palettes-lucca-700` | — | commons/vars |
| css-variable | `--palettes-lucca-800` | — | commons/vars |
| css-variable | `--palettes-lucca-900` | — | commons/vars |
| css-variable | `--palettes-lucca-text` | — | commons/vars |
| css-variable | `--palettes-mint-text` | — | commons/vars |
| css-variable | `--palettes-navigation-text` | — | commons/vars |
| css-variable | `--palettes-neutral-text` | — | commons/vars |
| css-variable | `--palettes-orchid-text` | — | commons/vars |
| css-variable | `--palettes-pagga-text` | — | commons/vars |
| css-variable | `--palettes-pineapple-text` | — | commons/vars |
| css-variable | `--palettes-pineappleContrasted-text` | — | commons/vars |
| css-variable | `--palettes-poplee-text` | — | commons/vars |
| css-variable | `--palettes-primary-0` | — | commons/vars |
| css-variable | `--palettes-primary-100` | — | commons/vars |
| css-variable | `--palettes-primary-200` | — | commons/vars |
| css-variable | `--palettes-primary-300` | — | commons/vars |
| css-variable | `--palettes-primary-400` | — | commons/vars |
| css-variable | `--palettes-primary-50` | — | commons/vars |
| css-variable | `--palettes-primary-500` | — | commons/vars |
| css-variable | `--palettes-primary-600` | — | commons/vars |
| css-variable | `--palettes-primary-700` | — | commons/vars |
| css-variable | `--palettes-primary-800` | — | commons/vars |
| css-variable | `--palettes-primary-900` | — | commons/vars |
| css-variable | `--palettes-primary-text` | — | commons/vars |
| css-variable | `--palettes-product-text` | — | commons/vars |
| css-variable | `--palettes-pumpkin-text` | — | commons/vars |
| css-variable | `--palettes-secondary-0` | — | commons/vars |
| css-variable | `--palettes-secondary-100` | — | commons/vars |
| css-variable | `--palettes-secondary-200` | — | commons/vars |
| css-variable | `--palettes-secondary-300` | — | commons/vars |
| css-variable | `--palettes-secondary-400` | — | commons/vars |
| css-variable | `--palettes-secondary-50` | — | commons/vars |
| css-variable | `--palettes-secondary-500` | — | commons/vars |
| css-variable | `--palettes-secondary-600` | — | commons/vars |
| css-variable | `--palettes-secondary-700` | — | commons/vars |
| css-variable | `--palettes-secondary-800` | — | commons/vars |
| css-variable | `--palettes-secondary-900` | — | commons/vars |
| css-variable | `--palettes-secondary-text` | — | commons/vars |
| css-variable | `--palettes-success-text` | — | commons/vars |
| css-variable | `--palettes-successContrasted-text` | — | commons/vars |
| css-variable | `--palettes-timmi-text` | — | commons/vars |
| css-variable | `--palettes-warning-text` | — | commons/vars |
| css-variable | `--palettes-warningContrasted-text` | — | commons/vars |
| css-variable | `--palettes-watermelon-text` | — | commons/vars |
| css-variable | `--sizes-L-fontSize` | — | commons/vars |
| css-variable | `--sizes-L-lineHeight` | — | commons/vars |
| css-variable | `--sizes-L-verticalPadding` | — | commons/vars |
| css-variable | `--sizes-M-fontSize` | — | commons/vars |
| css-variable | `--sizes-M-lineHeight` | — | commons/vars |
| css-variable | `--sizes-M-verticalPadding` | — | commons/vars |
| css-variable | `--sizes-S-fontSize` | — | commons/vars |
| css-variable | `--sizes-S-lineHeight` | — | commons/vars |
| css-variable | `--sizes-S-verticalPadding` | — | commons/vars |
| css-variable | `--sizes-XL-fontSize` | — | commons/vars |
| css-variable | `--sizes-XL-lineHeight` | — | commons/vars |
| css-variable | `--sizes-XL-verticalPadding` | — | commons/vars |
| css-variable | `--sizes-XS-fontSize` | — | commons/vars |
| css-variable | `--sizes-XS-lineHeight` | — | commons/vars |
| css-variable | `--sizes-XS-verticalPadding` | — | commons/vars |
| css-variable | `--sizes-XXL-fontSize` | — | commons/vars |
| css-variable | `--sizes-XXL-lineHeight` | — | commons/vars |
| css-variable | `--sizes-XXL-verticalPadding` | — | commons/vars |
| css-variable | `--sizes-XXXL-fontSize` | — | commons/vars |
| css-variable | `--sizes-XXXL-lineHeight` | — | commons/vars |
| css-variable | `--sizes-XXXL-verticalPadding` | — | commons/vars |
| selector | `.lu-user-picture` | `.avatar` | component:avatar |
| selector | `.box.mod-grey` | `.box.mod-neutral` | component:box |
| selector | `.box.mod-toggle` | — | component:box |
| selector | `.active` | `.is-active` | component:breadcrumbs |
| selector | `.mod-compact` | — | component:breadcrumbs |
| css-variable | `--components-button-font-size` | `--components-button-font` | component:button |
| css-variable | `--components-button-line-height` | `--components-button-font` | component:button |
| selector | `.button.disabled` | `.button.is-disabled` | component:button |
| selector | `.button.error` | `.button.is-error` | component:button |
| selector | `.button.loading` | `.button.is-loading` | component:button |
| selector | `.button.success` | `.button.is-success` | component:button |
| selector | `.mod-delete` | `.mod-critical` | component:button |
| selector | `.mod-invert` | `.mod-inverted` | component:button |
| selector | `.mod-link` | `.mod-ghost` | component:button |
| selector | `.mod-outline` | `.mod-outlined` | component:button |
| selector | `.mod-text` | `.mod-ghost` | component:button |
| css-variable | `--components-callout-fontSize` | `--components-callout-font` | component:callout |
| css-variable | `--components-callout-lineHeight` | `--components-callout-font` | component:callout |
| css-variable | `--components-calloutFeedbackList-fontSize` | `--components-calloutFeedbackList-font` | component:calloutFeedbackList |
| css-variable | `--components-calloutFeedbackList-lineHeight` | `--components-calloutFeedbackList-font` | component:calloutFeedbackList |
| selector | `.card.mod-grey` | `.card.mod-neutral` | component:card |
| css-variable | `--components-chip-fontSize` | `--components-chip-font` | component:chip |
| css-variable | `--components-chip-lineHeight` | `--components-chip-font` | component:chip |
| css-variable | `--components-comment-text-fontSize` | `--components-comment-text-font` | component:comment |
| css-variable | `--components-comment-text-lineHeight` | `--components-comment-text-font` | component:comment |
| css-variable | `--components-container-max-width` | `--commons-container-maxWidth` | component:container |
| css-variable | `--components-container-padding` | `--commons-container-padding` | component:container |
| selector | `.dialog-form` | `.dialog-inside-formOptional` | component:dialog |
| selector | `.dialog-formOptional` | `.dialog-inside-formOptional` | component:dialog |
| css-variable | `--components-divider-fontSize` | `--components-divider-font` | component:divider |
| css-variable | `--components-divider-lineHeight` | `--components-divider-font` | component:divider |
| selector | `.lu-dropdown-content` | `.dropdown` | component:dropdown |
| selector | `.lu-dropdown-options` | `.dropdown-list` | component:dropdown |
| selector | `.lu-dropdown-options-item` | `.dropdown-list-option` | component:dropdown |
| selector | `.lu-dropdown-options-item-action` | `.dropdown-list-option-action` | component:dropdown |
| selector | `.filterBarDeprecated` | — | component:filterBarDeprecated |
| sass-api | `form.componentDeprecated` | — | component:form |
| css-variable | `--components-formLabel-fontSize` | `--components-formLabel-font` | component:formLabel |
| css-variable | `--components-formLabel-lineHeight` | `--components-formLabel-font` | component:formLabel |
| css-variable | `--components-gauge-height` | `--components-gauge-blockSize` | component:gauge |
| sass-api | `gauge.vertical` | — | component:gauge |
| sass-api | `gauge.verticalThin` | — | component:gauge |
| selector | `.mod-vertical` | — | component:gauge |
| selector | `.disabled` | `.is-disabled` | component:horizontalNavigation |
| selector | `.menu` | `.horizontalNavigation` | component:horizontalNavigation |
| selector | `.menu-containerOptional` | — | component:horizontalNavigation |
| selector | `.menu-link` | — | component:horizontalNavigation |
| selector | `.menu-link-placeholder` | — | component:horizontalNavigation |
| selector | `.menu-list` | `.horizontalNavigation-list` | component:horizontalNavigation |
| selector | `.menu-list-item-action` | `.horizontalNavigation-list-item-action` | component:horizontalNavigation |
| selector | `.indexTable-body-row-cell-action` | — | component:indexTable |
| selector | `.lucca-icon:first-child` | `.inlineMessage-statusIcon` | component:inlineMessage |
| selector | `.label` | — | component:label |
| selector | `.mod-dialog` | `.mod-popin` | component:loading |
| selector | `.mod-sidePanel` | `.mod-drawer` | component:loading |
| css-variable | `--components-navSide-fullwidth-palette-alert-color` | — | component:navside |
| css-variable | `--components-navSide-fullwidth-palette-alert-text` | — | component:navside |
| selector | `.mod-withMenuCompact` | `.navSide.mod-compact` | component:navside |
| selector | `.mod-withMenu` | `.mod-withHorizontalNavigation` | component:pageHeader |
| selector | `.section.mod-grey` | `.section.mod-neutral` | component:section |
| selector | `.viewTabs` | `.segmentedControl` | component:segmentedControl |
| selector | `.viewTabs_panel` | `.segmentedControl_panel` | component:segmentedControl |
| selector | `.viewTabs-item` | `.segmentedControl-item` | component:segmentedControl |
| selector | `.viewTabs-item-tab` | `.segmentedControl-item-action` | component:segmentedControl |
| css-variable | `--components-sortableList-description-fontSize` | `--components-sortableList-description-font` | component:sortableList |
| css-variable | `--components-sortableList-description-lineHeight` | `--components-sortableList-description-font` | component:sortableList |
| selector | `.mod-actionsHidden` | — | component:table |
| selector | `.table.mod-layoutFixed` | — | component:tableFixedDeprecated |
| selector | `.table.mod-stickyColumn` | — | component:tableStickedDeprecated |
| css-variable | `--components-tag-fontSize` | `--components-tag-font` | component:tag |
| css-variable | `--components-tag-lineHeight` | `--components-tag-font` | component:tag |
| selector | `.mod-clickable` | — | component:tag |
| css-variable | `--component-textField-fontSize` | `--component-textField-font` | component:textField |
| css-variable | `--component-textField-lineHeight` | `--component-textField-font` | component:textField |
| css-variable | `--components-toasts-background` | — | component:toast |
| css-variable | `--components-toasts-padding` | — | component:toast |
| sass-api | `userTile.XL` | — | component:userTile |
| sass-api | `userTile.XXL` | — | component:userTile |
| sass-api | `userTile.XXXL` | — | component:userTile |
| selector | `.mod-XL` | — | component:userTile |
| selector | `.mod-XXL` | — | component:userTile |
| selector | `.mod-XXXL` | — | component:userTile |

### Before — legacy comment markers

| File | Line | Marker |
| --- | ---: | --- |
| packages/scss/src/commons/config.scss | 127 | $palettesShades: text, 0, 25, 50, 100, 200, 300, 400, 500, 600, 700, 800, 900; // text is deprecated |
| packages/scss/src/commons/config.scss | 180 | // text is deprecated |
| packages/scss/src/commons/config.scss | 196 | // text is deprecated |
| packages/scss/src/commons/config.scss | 212 | // text is deprecated |
| packages/scss/src/commons/config.scss | 228 | // text is deprecated |
| packages/scss/src/commons/config.scss | 244 | // text is deprecated |
| packages/scss/src/commons/config.scss | 260 | // text is deprecated |
| packages/scss/src/commons/config.scss | 291 | // text is deprecated |
| packages/scss/src/commons/config.scss | 307 | // text is deprecated |
| packages/scss/src/commons/config.scss | 324 | // text is deprecated |
| packages/scss/src/commons/config.scss | 335 | // text is deprecated |
| packages/scss/src/commons/config.scss | 351 | // text is deprecated |
| packages/scss/src/commons/config.scss | 367 | // text is deprecated |
| packages/scss/src/commons/config.scss | 383 | // text is deprecated |
| packages/scss/src/commons/config.scss | 399 | // text is deprecated |
| packages/scss/src/commons/config.scss | 758 | // opacity is deprecated |
| packages/scss/src/commons/config.scss | 790 | // Deprecated |
| packages/scss/src/commons/config.scss | 792 | // $colors are deprecated |
| packages/scss/src/commons/config.scss | 798 | // $colorsRgb are deprecated |
| packages/scss/src/commons/config.scss | 807 | // $borderRadius are deprecated |
| packages/scss/src/commons/core.scss | 9 | $boxDirection: '', 'top', 'bottom', 'left', 'right', 'inline', 'block', 'block-start', 'block-end', 'inline-start', 'inline-end'; // top, bottom, left and right are deprecated |
| packages/scss/src/commons/core.scss | 10 | $corners: '', 'top-left-', 'top-right-', 'bottom-left-', 'bottom-right-', 'start-start-', 'start-end-', 'end-start-', 'end-end-'; // top-left, top-right, bottom-left and bottom-right are deprecated |
| packages/scss/src/commons/core.scss | 20 | $textAlign: 'left', 'center', 'right', 'start', 'end'; // left and right are deprecated |
| packages/scss/src/commons/core.scss | 27 | $float: 'left', 'right', 'inline-start', 'inline-end'; // left and right are deprecated |
| packages/scss/src/commons/core.scss | 107 | // Deprecated .u- utilities |
| packages/scss/src/commons/core.scss | 118 | // Deprecated .u- utilities |
| packages/scss/src/commons/core.scss | 129 | // .pr-u-text is deprecated |
| packages/scss/src/commons/core.scss | 135 | // Deprecated .u- utilities |
| packages/scss/src/commons/core.scss | 188 | // DEPRECATED |
| packages/scss/src/commons/core.scss | 197 | // Deprecated .u- utilities |
| packages/scss/src/commons/core.scss | 214 | // Deprecated .u- utilities |
| packages/scss/src/commons/utils/color.scss | 6 | // stylelint-disable-next-line scss/no-global-function-names -- This is a redefinition of a deprecated SCSS function. |
| packages/scss/src/commons/utils/highlight-prisme.scss | 276 | // DEPRECATED COMPONENTS |
| packages/scss/src/commons/utils/index.scss | 276 | // Deprecated |
| packages/scss/src/commons/utils/index.scss | 409 | // clear is deprecated |
| packages/scss/src/commons/utils/index.scss | 415 | // clearLeft is deprecated |
| packages/scss/src/commons/utils/index.scss | 421 | // clearRight is deprecated |
| packages/scss/src/commons/utils/index.scss | 464 | // Deprecated |
| packages/scss/src/commons/utils/index.scss | 469 | // Deprecated |
| packages/scss/src/commons/utils/index.scss | 485 | // textLeft is deprecated |
| packages/scss/src/commons/utils/index.scss | 490 | // textRight is deprecated |
| packages/scss/src/commons/utils/index.scss | 495 | // textCenter is deprecated |
| packages/scss/src/commons/utils/index.scss | 500 | // textLight is deprecated |
| packages/scss/src/commons/utils/index.scss | 505 | // textPlaceholder is deprecated |
| packages/scss/src/commons/utils/index.scss | 511 | // textDefault is deprecated |
| packages/scss/src/commons/utils/index.scss | 645 | // insetReset is deprecated |
| packages/scss/src/commons/utils/index.scss | 651 | // Reset is deprecated |
| packages/scss/src/commons/utils/index.scss | 673 | // Deprecated .u- utilities |
| packages/scss/src/commons/utils/index.scss | 692 | // clear is deprecated |
| packages/scss/src/commons/utils/index.scss | 698 | // clearLeft is deprecated |
| packages/scss/src/commons/utils/index.scss | 704 | // clearRight is deprecated |
| packages/scss/src/commons/utils/index.scss | 747 | // Deprecated |
| packages/scss/src/commons/utils/index.scss | 752 | // Deprecated |
| packages/scss/src/commons/utils/index.scss | 768 | // stylelint-disable-next-line selector-disallowed-list -- textLeft is deprecated |
| packages/scss/src/commons/utils/index.scss | 773 | // stylelint-disable-next-line selector-disallowed-list -- textRight is deprecated |
| packages/scss/src/commons/utils/index.scss | 778 | // stylelint-disable-next-line selector-disallowed-list -- textCenter is deprecated |
| packages/scss/src/commons/utils/index.scss | 783 | // stylelint-disable-next-line selector-disallowed-list -- textLight is deprecated |
| packages/scss/src/commons/utils/index.scss | 830 | // insetReset is deprecated |
| packages/scss/src/commons/utils/index.scss | 836 | // Reset is deprecated |
| packages/scss/src/commons/vars.scss | 107 | // Deprecated |
| packages/scss/src/commons/vars.scss | 170 | // Deprecated .u- utilities |
| packages/scss/src/components/avatar/index.scss | 3 | // lu-user-picture is deprecated |
| packages/scss/src/components/box/index.scss | 10 | // .mod-grey is deprecated |
| packages/scss/src/components/box/index.scss | 20 | // .mod-toggle is deprecated |
| packages/scss/src/components/box/mods.scss | 38 | // .mod-grey is deprecated |
| packages/scss/src/components/breadcrumbs/index.scss | 10 | // .mod-compact is deprecated |
| packages/scss/src/components/breadcrumbs/index.scss | 21 | // .active is deprecated |
| packages/scss/src/components/button/component.scss | 17 | font-size: var(--components-button-font-size); // Deprecated |
| packages/scss/src/components/button/component.scss | 18 | line-height: var(--components-button-line-height); // Deprecated |
| packages/scss/src/components/button/component.scss | 45 | // deprecated |
| packages/scss/src/components/button/component.scss | 50 | // .mod-outline is deprecated |
| packages/scss/src/components/button/index.scss | 44 | // .mod-outline is deprecated |
| packages/scss/src/components/button/index.scss | 52 | // .mod-link .mod-text deprecated |
| packages/scss/src/components/button/index.scss | 111 | // .mod-delete is deprecated |
| packages/scss/src/components/button/index.scss | 116 | // .mod-link is deprecated |
| packages/scss/src/components/button/index.scss | 122 | // .mod-outline is deprecated |
| packages/scss/src/components/button/index.scss | 129 | // .mod-invert is deprecated |
| packages/scss/src/components/button/index.scss | 147 | // .loading is deprecated |
| packages/scss/src/components/button/index.scss | 169 | // .error is deprecated |
| packages/scss/src/components/button/index.scss | 175 | // .success is deprecated |
| packages/scss/src/components/button/index.scss | 190 | // .disabled is deprecated |
| packages/scss/src/components/button/mods.scss | 19 | // Deprecated |
| packages/scss/src/components/button/mods.scss | 36 | // Deprecated |
| packages/scss/src/components/button/mods.scss | 60 | // Deprecated |
| packages/scss/src/components/button/vars.scss | 24 | // Deprecated |
| packages/scss/src/components/buttonGroup/index.scss | 11 | // .mod-text deprecated |
| packages/scss/src/components/buttonGroup/mods.scss | 5 | // .mod-text, .mod-link deprecated |
| packages/scss/src/components/callout/component.scss | 16 | font-size: var(--components-callout-fontSize); // Deprecated |
| packages/scss/src/components/callout/component.scss | 17 | line-height: var(--components-callout-lineHeight); // Deprecated |
| packages/scss/src/components/callout/mods.scss | 22 | // Deprecated |
| packages/scss/src/components/callout/vars.scss | 14 | // Deprecated |
| packages/scss/src/components/calloutFeedbackList/component.scss | 12 | font-size: var(--components-calloutFeedbackList-fontSize); // Deprecated |
| packages/scss/src/components/calloutFeedbackList/component.scss | 13 | line-height: var(--components-calloutFeedbackList-lineHeight); // Deprecated |
| packages/scss/src/components/calloutFeedbackList/mods.scss | 11 | // Deprecated |
| packages/scss/src/components/calloutFeedbackList/vars.scss | 5 | // Deprecated |
| packages/scss/src/components/card/index.scss | 10 | // .mod-grey is deprecated |
| packages/scss/src/components/card/states.scss | 16 | // Deprecated .u- utilities |
| packages/scss/src/components/checkboxField/mods.scss | 10 | // stylelint-disable-next-line declaration-property-value-disallowed-list -- --commons-borderRadius-full is deprecated |
| packages/scss/src/components/chip/vars.scss | 11 | // Deprecated |
| packages/scss/src/components/comment/vars.scss | 12 | // Deprecated |
| packages/scss/src/components/container/index.scss | 15 | // deprecated |
| packages/scss/src/components/container/mods.scss | 5 | // deprecated |
| packages/scss/src/components/container/vars.scss | 8 | // --components-container-max-width is deprecated |
| packages/scss/src/components/container/vars.scss | 9 | // --components-container-padding is deprecated |
| packages/scss/src/components/dataTable/mods.scss | 127 | // .mod-delete is deprecated |
| packages/scss/src/components/dialog/component.scss | 40 | .dialog-formOptional, // stylelint-disable-line selector-disallowed-list -- .dialog-formOptional is deprecated |
| packages/scss/src/components/dialog/component.scss | 41 | .dialog-form, // stylelint-disable-line selector-disallowed-list -- .dialog-form is deprecated |
| packages/scss/src/components/divider/vars.scss | 12 | // Deprecated |
| packages/scss/src/components/dropdown/component.scss | 16 | // stylelint-disable-next-line selector-disallowed-list -- .lu-dropdown-options is deprecated |
| packages/scss/src/components/dropdown/component.scss | 32 | // stylelint-disable-next-line selector-disallowed-list -- .lu-dropdown-options-item is deprecated |
| packages/scss/src/components/dropdown/component.scss | 58 | // stylelint-disable-next-line selector-disallowed-list -- .lu-dropdown-options-item-action is deprecated |
| packages/scss/src/components/dropdown/index.scss | 3 | // stylelint-disable-next-line selector-disallowed-list -- .lu-dropdown-content is deprecated |
| packages/scss/src/components/dropdown/index.scss | 12 | // stylelint-disable-next-line selector-disallowed-list -- .lu-dropdown-options-item-action is deprecated |
| packages/scss/src/components/filterBarDeprecated/component.scss | 5 | // stylelint-disable selector-disallowed-list -- Selectors are all deprecated. |
| packages/scss/src/components/filterBarDeprecated/index.scss | 3 | // stylelint-disable selector-disallowed-list -- Selectors are all deprecated. |
| packages/scss/src/components/form/component.scss | 81 | // deprecated |
| packages/scss/src/components/form/index.scss | 119 | // deprecated |
| packages/scss/src/components/form/mods.scss | 202 | // deprecated |
| packages/scss/src/components/form/states.scss | 22 | // deprecated |
| packages/scss/src/components/formLabel/component.scss | 11 | font-size: var(--components-formLabel-fontSize); // Deprecated |
| packages/scss/src/components/formLabel/component.scss | 12 | line-height: var(--components-formLabel-lineHeight); // Deprecated |
| packages/scss/src/components/formLabel/mods.scss | 9 | // Deprecated |
| packages/scss/src/components/formLabel/mods.scss | 23 | // Deprecated |
| packages/scss/src/components/formLabel/vars.scss | 11 | // Deprecated |
| packages/scss/src/components/gauge/index.scss | 18 | // .mod-vertical is deprecated |
| packages/scss/src/components/gauge/mods.scss | 6 | // @mixin vertical is deprecated |
| packages/scss/src/components/gauge/mods.scss | 19 | // @mixin verticalThin is deprecated |
| packages/scss/src/components/gauge/vars.scss | 1 | // --components-gauge-height is deprecated |
| packages/scss/src/components/horizontalNavigation/component.scss | 23 | // stylelint-disable-next-line selector-disallowed-list -- .label is deprecated |
| packages/scss/src/components/horizontalNavigation/component.scss | 38 | // stylelint-disable-next-line selector-disallowed-list -- .menu-containerOptional is deprecated |
| packages/scss/src/components/horizontalNavigation/component.scss | 45 | // stylelint-disable-next-line selector-disallowed-list -- .menu-list is deprecated |
| packages/scss/src/components/horizontalNavigation/component.scss | 62 | .menu-link, // stylelint-disable-line selector-disallowed-list -- .menu-list is deprecated |
| packages/scss/src/components/horizontalNavigation/component.scss | 63 | .menu-list-item-action, // stylelint-disable-line selector-disallowed-list -- .menu-link-item-action is deprecated |
| packages/scss/src/components/horizontalNavigation/component.scss | 120 | // stylelint-disable-next-line selector-disallowed-list -- .label is deprecated |
| packages/scss/src/components/horizontalNavigation/component.scss | 137 | // stylelint-disable-next-line selector-disallowed-list -- .menu-link-placeholder is deprecated |
| packages/scss/src/components/horizontalNavigation/index.scss | 4 | // stylelint-disable-next-line selector-disallowed-list -- .menu is deprecated |
| packages/scss/src/components/horizontalNavigation/index.scss | 32 | // stylelint-disable-next-line selector-disallowed-list -- .menu-list-item-action is deprecated |
| packages/scss/src/components/horizontalNavigation/index.scss | 61 | .menu-link, // stylelint-disable-line selector-disallowed-list -- .menu-link is deprecated |
| packages/scss/src/components/horizontalNavigation/index.scss | 62 | .menu-list-item-action, // stylelint-disable-line selector-disallowed-list -- .menu-list-item-action is deprecated |
| packages/scss/src/components/horizontalNavigation/index.scss | 65 | // .active is deprecated |
| packages/scss/src/components/horizontalNavigation/index.scss | 73 | // .active is deprecated |
| packages/scss/src/components/horizontalNavigation/index.scss | 80 | &.disabled, // .disabled is deprecated |
| packages/scss/src/components/horizontalNavigation/mods.scss | 9 | .menu-list-item-action, // stylelint-disable-line selector-disallowed-list -- .menu-list-item-action is deprecated |
| packages/scss/src/components/horizontalNavigation/mods.scss | 10 | .menu-link, // stylelint-disable-line selector-disallowed-list -- .menu-link is deprecated |
| packages/scss/src/components/horizontalNavigation/mods.scss | 21 | // stylelint-disable-next-line selector-disallowed-list -- .menu-link is deprecated |
| packages/scss/src/components/horizontalNavigation/mods.scss | 26 | // stylelint-disable-next-line selector-disallowed-list -- .label is deprecated |
| packages/scss/src/components/horizontalNavigation/mods.scss | 48 | // stylelint-disable-next-line selector-disallowed-list -- .menu-list is deprecated |
| packages/scss/src/components/horizontalNavigation/mods.scss | 56 | // stylelint-disable-next-line selector-disallowed-list -- .menu-list-item-action is deprecated |
| packages/scss/src/components/horizontalNavigation/mods.scss | 93 | // stylelint-disable-next-line selector-disallowed-list -- .menu-list-item-action is deprecated |
| packages/scss/src/components/horizontalNavigation/states.scss | 6 | // stylelint-disable-next-line selector-disallowed-list -- .label is deprecated |
| packages/scss/src/components/horizontalNavigation/states.scss | 28 | // stylelint-disable-next-line selector-disallowed-list -- .label is deprecated |
| packages/scss/src/components/indexTable/component.scss | 203 | // .indexTable-body-row-cell-action is deprecated |
| packages/scss/src/components/indexTable/mods.scss | 295 | // .mod-delete is deprecated |
| packages/scss/src/components/inlineMessage/component.scss | 31 | // .lucca-icon:first-child is deprecated |
| packages/scss/src/components/inlineMessage/mods.scss | 6 | // .lucca-icon:first-child is deprecated |
| packages/scss/src/components/inlineMessage/states.scss | 5 | // .lucca-icon:first-child is deprecated |
| packages/scss/src/components/inlineMessage/states.scss | 18 | // .lucca-icon:first-child is deprecated |
| packages/scss/src/components/inlineMessage/states.scss | 32 | // .lucca-icon:first-child is deprecated |
| packages/scss/src/components/label/index.scss | 3 | // stylelint-disable-next-line selector-disallowed-list -- .label is deprecated |
| packages/scss/src/components/list/index.scss | 20 | // .mod-actionsHidden is deprecated |
| packages/scss/src/components/loading/index.scss | 22 | // .mod-dialog is deprecated |
| packages/scss/src/components/loading/index.scss | 28 | // .mod-sidePanel is deprecated |
| packages/scss/src/components/navside/index.scss | 37 | // .active is deprecated |
| packages/scss/src/components/navside/index.scss | 97 | // .active is deprecated |
| packages/scss/src/components/navside/index.scss | 107 | // .active is deprecated |
| packages/scss/src/components/navside/mods.scss | 14 | // .mod-withMenuCompact is deprecated |
| packages/scss/src/components/navside/vars.scss | 21 | // --components-navSide-fullwidth-palette-alert-color is deprecated |
| packages/scss/src/components/navside/vars.scss | 22 | // --components-navSide-fullwidth-palette-alert-text is deprecated |
| packages/scss/src/components/pageHeader/index.scss | 11 | // .mod-withMenu is deprecated |
| packages/scss/src/components/pageHeader/mods.scss | 6 | // stylelint-disable-next-line selector-disallowed-list -- .menu is deprecated |
| packages/scss/src/components/richText/vars.scss | 9 | // with css vars deprecated before values |
| packages/scss/src/components/section/index.scss | 11 | // .mod-grey is deprecated |
| packages/scss/src/components/segmentedControl/component.scss | 29 | // .viewTabs-item is deprecated |
| packages/scss/src/components/segmentedControl/component.scss | 59 | // .viewTabs-item-tab is deprecated |
| packages/scss/src/components/segmentedControl/component.scss | 101 | // .viewTabs_panel is deprecated |
| packages/scss/src/components/segmentedControl/index.scss | 4 | // .viewTabs is deprecated |
| packages/scss/src/components/segmentedControl/index.scss | 28 | // .viewTabs-item-tab is deprecated |
| packages/scss/src/components/segmentedControl/index.scss | 42 | // .viewTabs_panel is deprecated |
| packages/scss/src/components/segmentedControl/index.scss | 45 | // .active is deprecated |
| packages/scss/src/components/simpleSelect/states.scss | 68 | --components-simpleSelect-placeholder: var(--commons-disabled-placeholder); // Deprecated: no placeholder with disabled state |
| packages/scss/src/components/skeleton/states.scss | 19 | // Deprecated .u- utilities |
| packages/scss/src/components/skeleton/states.scss | 67 | // Deprecated .u- utilities |
| packages/scss/src/components/skeleton/states.scss | 157 | // Deprecated |
| packages/scss/src/components/skeleton/states.scss | 188 | // Deprecated .u- utilities |
| packages/scss/src/components/sortableList/component.scss | 43 | font-size: var(--components-sortableList-description-fontSize); // Deprecated |
| packages/scss/src/components/sortableList/component.scss | 44 | line-height: var(--components-sortableList-description-lineHeight); // Deprecated |
| packages/scss/src/components/sortableList/mods.scss | 20 | // Deprecated |
| packages/scss/src/components/sortableList/vars.scss | 7 | // Deprecated |
| packages/scss/src/components/table/index.scss | 106 | // .mod-actionsHidden is deprecated |
| packages/scss/src/components/tag/component.scss | 22 | font-size: var(--components-tag-fontSize); // Deprecated |
| packages/scss/src/components/tag/component.scss | 23 | line-height: var(--components-tag-lineHeight); // Deprecated |
| packages/scss/src/components/tag/index.scss | 18 | // .mod-clickable is deprecated |
| packages/scss/src/components/tag/mods.scss | 32 | // Deprecated |
| packages/scss/src/components/tag/mods.scss | 44 | // Deprecated |
| packages/scss/src/components/tag/vars.scss | 12 | // Deprecated |
| packages/scss/src/components/textField/vars.scss | 18 | // Deprecated |
| packages/scss/src/components/title/mods.scss | 8 | --sizes-verticalPadding: var(--sizes-XXL-verticalPadding); // Deprecated |
| packages/scss/src/components/title/mods.scss | 13 | --sizes-verticalPadding: var(--sizes-XL-verticalPadding); // Deprecated |
| packages/scss/src/components/title/mods.scss | 18 | --sizes-verticalPadding: var(--sizes-L-verticalPadding); // Deprecated |
| packages/scss/src/components/title/mods.scss | 23 | --sizes-verticalPadding: var(--sizes-M-verticalPadding); // Deprecated |
| packages/scss/src/components/title/mods.scss | 26 | // Deprecated |
| packages/scss/src/components/titleSection/component.scss | 19 | // Deprecated .u- utilities |
| packages/scss/src/components/titleSection/index.scss | 41 | // Deprecated .u- utilities |
| packages/scss/src/components/toast/vars.scss | 12 | // Deprecated |
| packages/scss/src/components/userTile/index.scss | 22 | // .mod-XL is deprecated |
| packages/scss/src/components/userTile/index.scss | 27 | // .mod-XXL is deprecated |
| packages/scss/src/components/userTile/index.scss | 32 | // .mod-XXXL is deprecated |
| packages/scss/src/components/userTile/mods.scss | 29 | @mixin XL { // Deprecated |
| packages/scss/src/components/userTile/mods.scss | 35 | @mixin XXL { // Deprecated |
| packages/scss/src/components/userTile/mods.scss | 41 | @mixin XXXL { // Deprecated |
