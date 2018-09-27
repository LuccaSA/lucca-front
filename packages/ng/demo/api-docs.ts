const API_DOCS = {
  "ICoerce": {
    "fileName": "src/app/api/api.model.ts",
    "className": "ICoerce",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "clue",
        "type": "string",
        "description": ""
      },
      {
        "name": "item",
        "type": "T",
        "description": ""
      }
    ]
  },
  "LuApiModule": {
    "fileName": "src/app/api/api.module.ts",
    "className": "LuApiModule",
    "declarations": [],
    "exports": [
      "LuApiSelectModule"
    ]
  },
  "LuApiSelect": {
    "fileName": "src/app/api/select/api-select.component.ts",
    "className": "LuApiSelect",
    "description": "Api select : A select that will load items from an external service",
    "selector": "lu-api-select",
    "inputs": [
      {
        "name": "selectApiFeeder",
        "type": "IApiSelectFeeder<T>",
        "description": "Refence the ISelectApiFeeder instance that will be use to fill the select"
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "LuApiSelectModule": {
    "fileName": "src/app/api/select/api-select.module.ts",
    "className": "LuApiSelectModule",
    "declarations": [
      "LuApiSelect"
    ],
    "exports": [
      "LuApiSelect",
      "LuApiSelectPickerModule"
    ]
  },
  "IApiSelectFeeder": {
    "fileName": "src/app/api/select/feeder/api-feeder.model.ts",
    "className": "IApiSelectFeeder",
    "description": "Interface that define how to fill a select based on an API",
    "methods": [
      {
        "name": "getItems",
        "description": "Return a list of Items according to the clue (and external parameters)",
        "args": [
          {
            "name": "clue",
            "type": "string"
          }
        ],
        "returnType": "Observable<T[]>"
      },
      {
        "name": "textValue",
        "description": "Return the text to display (on option list and in the text area)",
        "args": [
          {
            "name": "item",
            "type": "T"
          }
        ],
        "returnType": "string"
      },
      {
        "name": "isPaged",
        "description": "Return true if the api as a paging mecanism => then it will be cast to ISelectApiFeederWithPaging",
        "args": [],
        "returnType": "boolean"
      }
    ],
    "properties": []
  },
  "IApiSelectFeederWithPaging": {
    "fileName": "src/app/api/select/feeder/api-feeder.model.ts",
    "className": "IApiSelectFeederWithPaging",
    "description": "Interface to add paging behaviour to feeder",
    "methods": [
      {
        "name": "resetPagingStart",
        "description": "Reset the paging indicator",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "getPagingStep",
        "description": "Give the paging step of api",
        "args": [],
        "returnType": "number"
      },
      {
        "name": "getPagedItems",
        "description": "Return a list of Items according to the clue (and external parameters)\r\nIt's recommand to increment after each call of this method the paging",
        "args": [
          {
            "name": "clue",
            "type": "string"
          },
          {
            "name": "pagingStart",
            "type": "number"
          },
          {
            "name": "pagingStep",
            "type": "number"
          }
        ],
        "returnType": "Observable<T[]>"
      }
    ],
    "properties": []
  },
  "AApiSelectFeederWithPaging": {
    "fileName": "src/app/api/select/feeder/api-feeder.model.ts",
    "className": "AApiSelectFeederWithPaging",
    "description": "Abstract class that propose an implementation of Lucca RDD Api for the interface ISelectApiFeeder",
    "methods": [
      {
        "name": "getItems",
        "description": "See ISelectApiFeeder",
        "args": [
          {
            "name": "clue",
            "type": "string"
          }
        ],
        "returnType": "Observable<T[]>"
      },
      {
        "name": "resetPagingStart",
        "description": "See ISelectApiFeeder",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "isPaged",
        "description": "See ISelectApiFeeder",
        "args": [],
        "returnType": "boolean"
      },
      {
        "name": "textValue",
        "description": "See ISelectApiFeeder",
        "args": [
          {
            "name": "item",
            "type": "T"
          }
        ],
        "returnType": "string"
      },
      {
        "name": "getPagingStep",
        "description": "Give the paging step of api\r\nSee ISelectApiFeederWithPaging",
        "args": [],
        "returnType": "number"
      },
      {
        "name": "getPagedItems",
        "description": "See ISelectApiFeederWithPaging",
        "args": [
          {
            "name": "clue",
            "type": "string"
          },
          {
            "name": "pagingStart",
            "type": "number"
          },
          {
            "name": "pagingStep",
            "type": "number"
          }
        ],
        "returnType": "Observable<T[]>"
      }
    ],
    "properties": [
      {
        "name": "_pagingStart",
        "defaultValue": "undefined",
        "type": "any",
        "description": ""
      }
    ]
  },
  "LuApiSelectPicker": {
    "fileName": "src/app/api/select/picker/api-select-picker.component.ts",
    "className": "LuApiSelectPicker",
    "description": "",
    "selector": "lu-api-select-picker",
    "inputs": [
      {
        "name": "selectApiFeeder",
        "type": "IApiSelectFeeder<T>",
        "description": "Refence the ISelectApiFeeder instance that will be use to fill the select "
      }
    ],
    "outputs": [],
    "properties": [
      {
        "name": "_clue",
        "type": "string",
        "description": ""
      },
      {
        "name": "_inputElement",
        "type": "ElementRef",
        "description": "The input element"
      },
      {
        "name": "_noResults",
        "defaultValue": "false",
        "type": "boolean",
        "description": ""
      }
    ],
    "methods": [
      {
        "name": "open",
        "description": "See ISelectOptionFeeder",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "textValue",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "item",
            "type": "T"
          }
        ],
        "returnType": "string"
      },
      {
        "name": "loadMoreOptions",
        "description": "See ISelectScrollable",
        "args": [],
        "returnType": "Observable<T[]>"
      }
    ]
  },
  "LuApiSelectPickerModule": {
    "fileName": "src/app/api/select/picker/api-select-picker.module.ts",
    "className": "LuApiSelectPickerModule",
    "declarations": [
      "LuApiSelectPicker"
    ],
    "exports": [
      "LuApiSelectPicker"
    ]
  },
  "LuEmptyDirective": {
    "fileName": "src/app/empty/empty.directive.ts",
    "className": "LuEmptyDirective",
    "description": "adds class ng-empty when the model is empty and classes ng-not-empty and is-filled when not empty",
    "selector": "[luEmpty]",
    "inputs": [
      {
        "name": "luEmpty",
        "type": "(val: any) => boolean",
        "description": "a custom function to check if the value is empty, defalt is undefined or null or '' -> empty"
      }
    ],
    "outputs": [],
    "properties": [
      {
        "name": "isEmptyFn",
        "type": "(val: any) => boolean",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuEmptyModule": {
    "fileName": "src/app/empty/empty.module.ts",
    "className": "LuEmptyModule",
    "declarations": [
      "LuEmptyDirective"
    ],
    "exports": [
      "LuEmptyDirective"
    ]
  },
  "LuFormlyModule": {
    "fileName": "src/app/formly/formly.module.ts",
    "className": "LuFormlyModule",
    "declarations": [
      "...LU_FORMLY_COMPONENTS"
    ],
    "exports": []
  },
  "IOption": {
    "fileName": "src/app/formly/types/autocomplete.ts",
    "className": "IOption",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "id",
        "type": "number",
        "description": ""
      },
      {
        "name": "name",
        "type": "string",
        "description": ""
      }
    ]
  },
  "LuFormlyFieldAutocomplete": {
    "fileName": "src/app/formly/types/autocomplete.ts",
    "className": "LuFormlyFieldAutocomplete",
    "description": "",
    "selector": "lu-formly-field-autocomplete",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "options$",
        "type": "Observable<IOption[]>",
        "description": ""
      },
      {
        "name": "searchControl",
        "type": "FormControl",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyFieldDate": {
    "fileName": "src/app/formly/types/date.ts",
    "className": "LuFormlyFieldDate",
    "description": "",
    "selector": "lu-formly-field-date",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "input",
        "type": "ElementRef",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyFieldInput": {
    "fileName": "src/app/formly/types/input.ts",
    "className": "LuFormlyFieldInput",
    "description": "",
    "selector": "lu-formly-field-input",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "type",
        "type": "string",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyFieldSelect": {
    "fileName": "src/app/formly/types/select.ts",
    "className": "LuFormlyFieldSelect",
    "description": "",
    "selector": "lu-formly-field-select",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "_options",
        "type": "any[]",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyFieldTextarea": {
    "fileName": "src/app/formly/types/textarea.ts",
    "className": "LuFormlyFieldTextarea",
    "description": "",
    "selector": "lu-formly-field-input",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "LuFormlyFieldUser": {
    "fileName": "src/app/formly/types/user.ts",
    "className": "LuFormlyFieldUser",
    "description": "",
    "selector": "lu-formly-field-user",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "_options",
        "type": "any[]",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyWrapperButton": {
    "fileName": "src/app/formly/wrappers/button.ts",
    "className": "LuFormlyWrapperButton",
    "description": "",
    "selector": "lu-formly-wrapper-button",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "className",
        "type": "string",
        "description": ""
      },
      {
        "name": "fieldComponent",
        "type": "ViewContainerRef",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyWrapperError": {
    "fileName": "src/app/formly/wrappers/error.ts",
    "className": "LuFormlyWrapperError",
    "description": "",
    "selector": "lu-formly-wrapper-error",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "fieldComponent",
        "type": "ViewContainerRef",
        "description": ""
      },
      {
        "name": "validationId",
        "type": "string",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyErrorMessage": {
    "fileName": "src/app/formly/wrappers/error.ts",
    "className": "LuFormlyErrorMessage",
    "description": "",
    "selector": "lu-formly-error-message",
    "inputs": [
      {
        "name": "field",
        "type": "FormlyFieldConfig",
        "description": ""
      },
      {
        "name": "fieldForm",
        "type": "FormControl",
        "description": ""
      }
    ],
    "outputs": [],
    "properties": [
      {
        "name": "errorMessages",
        "type": "string[]",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyWrapperHelper": {
    "fileName": "src/app/formly/wrappers/helper.ts",
    "className": "LuFormlyWrapperHelper",
    "description": "",
    "selector": "lu-formly-wrapper-helper",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "fieldComponent",
        "type": "ViewContainerRef",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyWrapperIcon": {
    "fileName": "src/app/formly/wrappers/icon.ts",
    "className": "LuFormlyWrapperIcon",
    "description": "",
    "selector": "lu-formly-wrapper-suffix",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "fieldComponent",
        "type": "ViewContainerRef",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyWrapperLabel": {
    "fileName": "src/app/formly/wrappers/label.ts",
    "className": "LuFormlyWrapperLabel",
    "description": "",
    "selector": "lu-formly-wrapper-label",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "fieldComponent",
        "type": "ViewContainerRef",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyWrapperSuffix": {
    "fileName": "src/app/formly/wrappers/suffix.ts",
    "className": "LuFormlyWrapperSuffix",
    "description": "",
    "selector": "lu-formly-wrapper-suffix",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "fieldComponent",
        "type": "ViewContainerRef",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyWrapperTextfieldLayout": {
    "fileName": "src/app/formly/wrappers/textfield-layout.ts",
    "className": "LuFormlyWrapperTextfieldLayout",
    "description": "",
    "selector": "lu-formly-wrapper-layout",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "fieldComponent",
        "type": "ViewContainerRef",
        "description": ""
      },
      {
        "name": "isError",
        "type": "\"\" | \"is-error\"",
        "description": ""
      },
      {
        "name": "isFocused",
        "type": "\"\" | \"is-focused\"",
        "description": ""
      },
      {
        "name": "isRequired",
        "type": "\"\" | \"is-required\"",
        "description": ""
      },
      {
        "name": "mod",
        "type": "any",
        "description": ""
      },
      {
        "name": "modMultiline",
        "type": "\"\" | \"mod-multiline\"",
        "description": ""
      },
      {
        "name": "modWithSuffix",
        "type": "\"\" | \"mod-withSuffix\"",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuFormlyWrapperTitle": {
    "fileName": "src/app/formly/wrappers/title.ts",
    "className": "LuFormlyWrapperTitle",
    "description": "",
    "selector": "lu-formly-wrapper-title",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "fieldComponent",
        "type": "ViewContainerRef",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuRootModule": {
    "fileName": "src/app/lu-root.module.ts",
    "className": "LuRootModule",
    "declarations": [],
    "exports": [
      "LuUserModule",
      "LuPopoverModule",
      "LuSelectModule"
    ]
  },
  "LuPopoverComponent": {
    "fileName": "src/app/popover/popover.component.ts",
    "className": "LuPopoverComponent",
    "description": "",
    "selector": "lu-popover",
    "exportAs": "LuPopover",
    "inputs": [
      {
        "name": "alignment",
        "type": "PopoverAlignment",
        "description": "Alignment of the popover regarding the trigger "
      },
      {
        "name": "class",
        "type": "string",
        "description": "This method takes classes set on the host lu-popover element and applies them on the\r\npopover template that displays in the overlay container.  Otherwise, it's difficult\r\nto style the containing popover from outside the component."
      },
      {
        "name": "close-on-click",
        "type": "boolean",
        "description": "Popover container close on click\r\ndefault: false"
      },
      {
        "name": "enter-delay",
        "type": "number",
        "description": "Popover enter delay "
      },
      {
        "name": "focus-trap-enabled",
        "type": "boolean",
        "description": "Popover focus trap using cdkTrapFocus\r\ndefault: false"
      },
      {
        "name": "leave-delay",
        "type": "number",
        "description": "Popover leave delay "
      },
      {
        "name": "offset-x",
        "type": "number",
        "description": "Popover target offset x "
      },
      {
        "name": "offset-y",
        "type": "number",
        "description": "Popover target offset y "
      },
      {
        "name": "overlap-trigger",
        "type": "boolean",
        "description": "Popover overlap trigger "
      },
      {
        "name": "position",
        "type": "PopoverPosition",
        "description": "Position of the popover around the trigger "
      },
      {
        "name": "scroll-strategy",
        "type": "PopoverScrollStrategy",
        "description": "Popover scrollStrategy\r\ndefault: reposition"
      },
      {
        "name": "template",
        "type": "TemplateRef<any>",
        "description": "Template to Use for the popover "
      },
      {
        "name": "trigger-on",
        "type": "PopoverTriggerEvent",
        "description": "Popover trigger event "
      }
    ],
    "outputs": [
      {
        "name": "close",
        "description": "Event emitted when the popover is closed. "
      }
    ],
    "properties": [
      {
        "name": "_onAnimationStateChange",
        "type": "EventEmitter<AnimationEvent>",
        "description": "Emits the current animation state whenever it changes. "
      },
      {
        "name": "closeDisabled",
        "defaultValue": "false",
        "type": "boolean",
        "description": "Closing disabled on popover "
      },
      {
        "name": "containerPositioning",
        "defaultValue": "false",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "popoverContentStyles",
        "type": "{}",
        "description": "Config object to be passed into the popover's content ngStyle "
      },
      {
        "name": "popoverPanelStyles",
        "type": "{}",
        "description": "Config object to be passed into the popover's panel ngStyle "
      },
      {
        "name": "templateRef",
        "type": "TemplateRef<any>",
        "description": ""
      }
    ],
    "methods": [
      {
        "name": "_handleKeydown",
        "description": "Handle a keyboard event from the popover, delegating to the appropriate action. ",
        "args": [
          {
            "name": "event",
            "type": "KeyboardEvent"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "_emitCloseEvent",
        "description": "This emits a close event to which the trigger is subscribed. When emitted, the\r\ntrigger will close the popover.",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "onClick",
        "description": "Close popover on click if closeOnClick is true ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "onMouseOver",
        "description": "TODO: Refactor when @angular/cdk includes feature I mentioned on github see link below.\r\nhttps://github.com/angular/material2/pull/5493#issuecomment-313085323\nDisables close of popover when leaving trigger element and mouse over the popover ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "onMouseLeave",
        "description": "Enables close of popover when mouse leaving popover element ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "onMouseDown",
        "description": "does nothing but must be overridable ",
        "args": [
          {
            "name": "$event",
            "type": "any"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "setPositionClasses",
        "description": "It's necessary to set position-based classes to ensure the popover panel animation\r\nfolds out from the correct direction.",
        "args": [
          {
            "name": "pos",
            "type": "PopoverPosition"
          },
          {
            "name": "al",
            "type": "PopoverAlignment"
          }
        ],
        "returnType": "void"
      }
    ]
  },
  "IPopoverPanel": {
    "fileName": "src/app/popover/popover.model.ts",
    "className": "IPopoverPanel",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "_emitCloseEvent",
        "type": "() => void",
        "description": ""
      },
      {
        "name": "alignment",
        "type": "PopoverAlignment",
        "description": ""
      },
      {
        "name": "close",
        "type": "EventEmitter<void>",
        "description": ""
      },
      {
        "name": "closeDisabled",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "closeOnClick",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "containerPositioning",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "enterDelay",
        "type": "number",
        "description": ""
      },
      {
        "name": "leaveDelay",
        "type": "number",
        "description": ""
      },
      {
        "name": "overlapTrigger",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "position",
        "type": "PopoverPosition",
        "description": ""
      },
      {
        "name": "scrollStrategy",
        "type": "PopoverScrollStrategy",
        "description": ""
      },
      {
        "name": "setPositionClasses",
        "type": "(pos: PopoverPosition, al: PopoverAlignment) => void",
        "description": ""
      },
      {
        "name": "setPositionClassesChanges",
        "type": "(posX: PopoverPosition, posY: PopoverPosition) => void",
        "description": ""
      },
      {
        "name": "targetOffsetX",
        "type": "number",
        "description": ""
      },
      {
        "name": "targetOffsetY",
        "type": "number",
        "description": ""
      },
      {
        "name": "templateRef",
        "type": "TemplateRef<any>",
        "description": ""
      },
      {
        "name": "triggerEvent",
        "type": "PopoverTriggerEvent",
        "description": ""
      }
    ]
  },
  "IPopoverTarget": {
    "fileName": "src/app/popover/popover.model.ts",
    "className": "IPopoverTarget",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "_elementRef",
        "type": "ElementRef",
        "description": ""
      }
    ]
  },
  "LuPopoverModule": {
    "fileName": "src/app/popover/popover.module.ts",
    "className": "LuPopoverModule",
    "declarations": [
      "LuPopoverComponent",
      " LuPopoverTrigger",
      " LuPopoverTarget"
    ],
    "exports": [
      "LuPopoverComponent",
      "LuPopoverTrigger",
      "LuPopoverTarget"
    ]
  },
  "LuPopoverTarget": {
    "fileName": "src/app/popover/popover.target.ts",
    "className": "LuPopoverTarget",
    "description": "",
    "selector": "lu-popover-target, [LuPopoverTarget]",
    "exportAs": "LuPopoverTarget",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "LuPopoverTrigger": {
    "fileName": "src/app/popover/popover.triggers.ts",
    "className": "LuPopoverTrigger",
    "description": "This directive is intended to be used in conjunction with an lu-popover tag.  It is\r\nresponsible for toggling the display of the provided popover instance.",
    "selector": "[LuPopoverTriggerFor]",
    "exportAs": "LuPopoverTrigger",
    "inputs": [
      {
        "name": "LuPopoverTargetAt",
        "type": "IPopoverTarget",
        "description": "References the popover target instance that the trigger is associated with. "
      },
      {
        "name": "LuPopoverTriggerFor",
        "type": "IPopoverPanel",
        "description": "References the popover instance that the trigger is associated with. "
      }
    ],
    "outputs": [
      {
        "name": "onPopoverClose",
        "description": "Event emitted when the associated popover is closed. "
      },
      {
        "name": "onPopoverOpen",
        "description": "Event emitted when the associated popover is opened. "
      }
    ],
    "properties": [
      {
        "name": "dir",
        "type": "Direction",
        "description": "The text direction of the containing app. "
      },
      {
        "name": "isVerticallyPositionned",
        "type": "boolean",
        "description": "Return if the popover main positionning is vertical "
      },
      {
        "name": "popoverOpen",
        "type": "boolean",
        "description": "Whether the popover is open. "
      }
    ],
    "methods": [
      {
        "name": "togglePopover",
        "description": "Toggles the popover between the open and closed states. ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "openPopover",
        "description": "Opens the popover. ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "closePopover",
        "description": "Closes the popover. ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "destroyPopover",
        "description": "Removes the popover from the DOM. ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "focus",
        "description": "Focuses the popover trigger. ",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "IRddItem": {
    "fileName": "src/app/rdd/rdd.model.ts",
    "className": "IRddItem",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "id",
        "type": "number",
        "description": ""
      },
      {
        "name": "name",
        "type": "string",
        "description": ""
      }
    ]
  },
  "LuRddModule": {
    "fileName": "src/app/rdd/rdd.module.ts",
    "className": "LuRddModule",
    "declarations": [],
    "exports": [
      "LuRddFeederModule"
    ]
  },
  "RDDApiFeederComponent": {
    "fileName": "src/app/rdd/select/feeder/rdd-feeder.component.ts",
    "className": "RDDApiFeederComponent",
    "description": "",
    "selector": "lu-rdd-feeder",
    "exportAs": "luRddFeeder",
    "inputs": [
      {
        "name": "api",
        "type": "string",
        "description": ""
      },
      {
        "name": "fields",
        "type": "string[]",
        "description": ""
      },
      {
        "name": "params",
        "type": "string[]",
        "description": ""
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "IRDDSelectApiFeeder": {
    "fileName": "src/app/rdd/select/feeder/rdd-feeder.model.ts",
    "className": "IRDDSelectApiFeeder",
    "description": "Interface that define how to fill a select based on an API",
    "methods": [
      {
        "name": "getApiUrl",
        "description": "Give the rdd api url",
        "args": [],
        "returnType": "string"
      },
      {
        "name": "getFields",
        "description": "Give the return fields",
        "args": [],
        "returnType": "string[]"
      },
      {
        "name": "getParams",
        "description": "Give the list of additionnals parameters",
        "args": [],
        "returnType": "string[]"
      },
      {
        "name": "getClueField",
        "description": "Give the name of the field use for the search",
        "args": [],
        "returnType": "string"
      }
    ],
    "properties": []
  },
  "ARDDSelectFeeder": {
    "fileName": "src/app/rdd/select/feeder/rdd-feeder.model.ts",
    "className": "ARDDSelectFeeder",
    "description": "Abstract class that propose an implementation of Lucca RDD Api for the interface ISelectApiFeeder",
    "methods": [
      {
        "name": "getPagedItems",
        "description": "See ISelectApiFeeder",
        "args": [
          {
            "name": "clue",
            "type": "string"
          },
          {
            "name": "pagingStart",
            "type": "number"
          },
          {
            "name": "pagingStep",
            "type": "number"
          }
        ],
        "returnType": "Observable<T[]>"
      },
      {
        "name": "textValue",
        "description": "See ISelectApiFeeder",
        "args": [
          {
            "name": "item",
            "type": "T"
          }
        ],
        "returnType": "string"
      },
      {
        "name": "getPagingStep",
        "description": "Give the paging step of api",
        "args": [],
        "returnType": "number"
      },
      {
        "name": "getApiUrl",
        "description": "Give the rdd api url",
        "args": [],
        "returnType": "string"
      },
      {
        "name": "getFields",
        "description": "Give the return fields",
        "args": [],
        "returnType": "string[]"
      },
      {
        "name": "getParams",
        "description": "Give the list of additionnals parameters",
        "args": [],
        "returnType": "string[]"
      },
      {
        "name": "getClueField",
        "description": "Give the name of the field use for the search",
        "args": [],
        "returnType": "string"
      }
    ],
    "properties": []
  },
  "LuRddFeederModule": {
    "fileName": "src/app/rdd/select/feeder/rdd-feeder.module.ts",
    "className": "LuRddFeederModule",
    "declarations": [
      "RDDApiFeederComponent"
    ],
    "exports": [
      "RDDApiFeederComponent"
    ]
  },
  "LuSelectClearerFirstOrDefaultComponent": {
    "fileName": "src/app/select/clearer/select-clearer-first.component.ts",
    "className": "LuSelectClearerFirstOrDefaultComponent",
    "description": "",
    "selector": "lu-select-clearer-first",
    "inputs": [
      {
        "name": "options",
        "type": "any[]",
        "description": "The list of options (values) to use, we will select the first"
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "LuSelectClearerComponent": {
    "fileName": "src/app/select/clearer/select-clearer.component.ts",
    "className": "LuSelectClearerComponent",
    "description": "",
    "selector": "lu-select-clearer",
    "exportAs": "luSelectClearer",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "modRemove",
        "defaultValue": "false",
        "type": "boolean",
        "description": ""
      }
    ],
    "methods": []
  },
  "ISelectClearer": {
    "fileName": "src/app/select/clearer/select-clearer.model.ts",
    "className": "ISelectClearer",
    "description": "",
    "methods": [],
    "properties": []
  },
  "LuSelectClearerModule": {
    "fileName": "src/app/select/clearer/select-clearer.module.ts",
    "className": "LuSelectClearerModule",
    "declarations": [
      "\r\n\t\tLuSelectClearerComponent",
      "\r\n\t\tLuSelectClearerFirstOrDefaultComponent"
    ],
    "exports": [
      "LuSelectClearerFirstOrDefaultComponent",
      "LuSelectClearerComponent"
    ]
  },
  "LuSelectDirectiveModule": {
    "fileName": "src/app/select/directive/select.directive.module.ts",
    "className": "LuSelectDirectiveModule",
    "declarations": [
      "LuSelectDirective"
    ],
    "exports": [
      "LuSelectDirective"
    ]
  },
  "LuSelectDirective": {
    "fileName": "src/app/select/directive/select.directive.ts",
    "className": "LuSelectDirective",
    "description": "Directive to put on a div to allow it to react with a popover to emulate a select component",
    "selector": "div[luSelect]",
    "inputs": [
      {
        "name": "luSelect",
        "type": "LuSelectPicker<any>",
        "description": "the name of the picker linked to this input "
      }
    ],
    "outputs": [
      {
        "name": "close",
        "description": "Fire an event when the popup is closed "
      }
    ],
    "properties": [],
    "methods": [
      {
        "name": "openPopover",
        "description": "Open the popover linked to the directive ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "closePopover",
        "description": "Close the popover ",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "LuOptionFeederDirective": {
    "fileName": "src/app/select/option/feeder/select-option-feeder.directive.ts",
    "className": "LuOptionFeederDirective",
    "description": "Directive to put on a div to allow it to react with a popover to emulate a select component",
    "selector": "[luOptionFeeder]",
    "inputs": [],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "ISelectOptionFeeder": {
    "fileName": "src/app/select/option/feeder/select-option-feeder.model.ts",
    "className": "ISelectOptionFeeder",
    "description": "Interface to implement when you want to create your own feeder of options fot the select\r\nsee @ASelectOptionFeeder as a reference implementation",
    "methods": [
      {
        "name": "open",
        "description": "Called when the popup of option is open",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "registerKeyevent",
        "description": "Register key events",
        "args": [
          {
            "name": "callback",
            "type": "(event: KeyboardEvent) => void"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "registerChangeOptions",
        "description": "Register for options changes",
        "args": [
          {
            "name": "callback",
            "type": "(options: LuSelectOption<T>[]) => void"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "registerSelectOption",
        "description": "Register for option selection",
        "args": [
          {
            "name": "callback",
            "type": "(option: LuSelectOption<T>) => void"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "scrollTo",
        "description": "Scroll to the element specifyed in index",
        "args": [
          {
            "name": "index",
            "type": "number"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "textValue",
        "description": "gives the string corresponding to the item",
        "args": [
          {
            "name": "item",
            "type": "T"
          }
        ],
        "returnType": "string"
      }
    ],
    "properties": [
      {
        "name": "focused",
        "type": "boolean",
        "description": ""
      }
    ]
  },
  "ASelectOptionFeeder": {
    "fileName": "src/app/select/option/feeder/select-option-feeder.model.ts",
    "className": "ASelectOptionFeeder",
    "description": "The component that provides available options for lu-select",
    "methods": [
      {
        "name": "open",
        "description": "See ISelectOptionFeeder",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "registerKeyevent",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "callback",
            "type": "(event: KeyboardEvent) => void"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "registerChangeOptions",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "callback",
            "type": "(options: LuSelectOption<T>[]) => void"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "registerSelectOption",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "callback",
            "type": "(option: LuSelectOption<T>) => void"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "scrollTo",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "index",
            "type": "number"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "textValue",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "item",
            "type": "T"
          }
        ],
        "returnType": "string"
      }
    ],
    "properties": [
      {
        "name": "focused",
        "type": "boolean",
        "description": "See ISelectOptionFeeder"
      }
    ]
  },
  "LuSelectOptionFeederModule": {
    "fileName": "src/app/select/option/feeder/select-option-feeder.module.ts",
    "className": "LuSelectOptionFeederModule",
    "declarations": [
      "LuOptionFeederDirective"
    ],
    "exports": [
      "LuOptionFeederDirective"
    ]
  },
  "LuSelectOption": {
    "fileName": "src/app/select/option/select-option.component.ts",
    "className": "LuSelectOption",
    "description": "The component that provides available options for lu-select",
    "selector": "lu-select-option",
    "inputs": [
      {
        "name": "luOptionValue",
        "type": "T",
        "description": "The value of the option"
      }
    ],
    "outputs": [
      {
        "name": "onSelectionChange",
        "description": "Emit an event when the option is selected, the LuSelectOption is passed as parameterr"
      }
    ],
    "properties": [
      {
        "name": "displayed",
        "type": "boolean",
        "description": "true if the option should be displayed (you can with this hide / show dynamicly options)\nSet it to false if you don't want to show the option"
      },
      {
        "name": "focused",
        "type": "boolean",
        "description": "true if the option is focused"
      },
      {
        "name": "selected",
        "type": "boolean",
        "description": "true if the option is selected"
      },
      {
        "name": "viewValue",
        "type": "string",
        "description": "the representation as string of the option"
      }
    ],
    "methods": [
      {
        "name": "_selectOption",
        "description": "Select the current option. This method will emit an event onSelectionChange",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "focus",
        "description": "Make the focus to the element",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "unfocus",
        "description": "Remove the focus of the element",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "select",
        "description": "Select the option. This method will emit an event onSelectionChange",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "unselect",
        "description": "Unselect the option",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "offsetTop",
        "description": "Define the Offset top of the element fir scrolling",
        "args": [],
        "returnType": "number"
      }
    ]
  },
  "LuSelectOptionSelectionChange": {
    "fileName": "src/app/select/option/select-option.event.ts",
    "className": "LuSelectOptionSelectionChange",
    "description": "Class representing an event of a LuSelectOption",
    "methods": [],
    "properties": []
  },
  "LuSelectOptionModule": {
    "fileName": "src/app/select/option/select-option.module.ts",
    "className": "LuSelectOptionModule",
    "declarations": [
      "LuSelectOption"
    ],
    "exports": [
      "LuSelectOption",
      "LuSelectOptionFeederModule"
    ]
  },
  "LuSelectPicker": {
    "fileName": "src/app/select/picker/select-picker.component.ts",
    "className": "LuSelectPicker",
    "description": "The component that provides available options with the luSelect directive",
    "selector": "lu-select-picker",
    "inputs": [],
    "outputs": [
      {
        "name": "itemSelected",
        "description": "emits when the user selects an element "
      }
    ],
    "properties": [
      {
        "name": "optionFeeder",
        "type": "ISelectOptionFeeder<T>",
        "description": "Reference to OptionFeeder when available"
      }
    ],
    "methods": [
      {
        "name": "resetOptions",
        "description": "Drops current option subscriptions and IDs and resets from scratch. ",
        "args": [
          {
            "name": "options",
            "type": "LuSelectOption<T>[]"
          },
          {
            "name": "forceChangeValue",
            "type": "boolean"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "search",
        "description": "Search for highliting the option corresponding to the clue",
        "args": [
          {
            "name": "clue",
            "type": "string"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "selectOption",
        "description": "Select the option (value) of the popover.\r\nThis method will fire an event of itemSelected",
        "args": [
          {
            "name": "option",
            "type": "T"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "onEnterKeydown",
        "description": "Call when the key \"Enter\" is hit ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "onDownKeydown",
        "description": "Call when the key \"Down\" is hit",
        "args": [
          {
            "name": "popoverOpen",
            "type": "boolean"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "onUpKeydown",
        "description": "Call when the key \"Up\" is hit",
        "args": [
          {
            "name": "popoverOpen",
            "type": "boolean"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "onHomeKeydown",
        "description": "Call when the key \"Home\" is hit",
        "args": [
          {
            "name": "popoverOpen",
            "type": "boolean"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "onEndKeydown",
        "description": "Call when the key \"End\" is hit",
        "args": [
          {
            "name": "popoverOpen",
            "type": "boolean"
          }
        ],
        "returnType": "void"
      }
    ]
  },
  "LuSelectPickerModule": {
    "fileName": "src/app/select/picker/select-picker.module.ts",
    "className": "LuSelectPickerModule",
    "declarations": [
      "LuSelectPicker"
    ],
    "exports": [
      "LuSelectPicker"
    ]
  },
  "ASelectScrollPicker": {
    "fileName": "src/app/select/scroll/picker/select-scroll-picker.component.ts",
    "className": "ASelectScrollPicker",
    "description": "Component that manage the possibility to load the options in an infinite scroll way",
    "methods": [
      {
        "name": "open",
        "description": "See ISelectOptionFeeder",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "scrollTo",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "index",
            "type": "number"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "textValue",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "item",
            "type": "T"
          }
        ],
        "returnType": "string"
      },
      {
        "name": "loadMoreOptions",
        "description": "See ISelectScrollable",
        "args": [],
        "returnType": "Observable<T[]>"
      }
    ],
    "properties": [
      {
        "name": "_loading",
        "defaultValue": "false",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "_noMoreResults",
        "defaultValue": "false",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "_noResults",
        "defaultValue": "false",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "_options",
        "type": "T[]",
        "description": ""
      },
      {
        "name": "_optionsList",
        "type": "QueryList<LuSelectOption<T>>",
        "description": "The list of users (option) "
      },
      {
        "name": "_scrollElement",
        "type": "ElementRef",
        "description": "The scroll element "
      }
    ]
  },
  "ISelectScrollable": {
    "fileName": "src/app/select/scroll/picker/select-scroll-picker.model.ts",
    "className": "ISelectScrollable",
    "description": "",
    "methods": [],
    "properties": []
  },
  "LuSelectSearcherComponent": {
    "fileName": "src/app/select/searcher/select-searcher.component.ts",
    "className": "LuSelectSearcherComponent",
    "description": "",
    "selector": "lu-select-searcher",
    "inputs": [],
    "outputs": [],
    "properties": [
      {
        "name": "_clue",
        "type": "string",
        "description": ""
      },
      {
        "name": "_inputElement",
        "type": "ElementRef",
        "description": ""
      },
      {
        "name": "_noResults",
        "defaultValue": "false",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "_scrollElement",
        "type": "ElementRef",
        "description": ""
      },
      {
        "name": "luOptions",
        "type": "QueryList<LuSelectOption<T>>",
        "description": "The options detected"
      }
    ],
    "methods": [
      {
        "name": "filter",
        "description": "See ISelectSearcher",
        "args": [
          {
            "name": "clue",
            "type": "string"
          },
          {
            "name": "options",
            "type": "LuSelectOption<T>[]"
          }
        ],
        "returnType": "LuSelectOption<T>[]"
      },
      {
        "name": "open",
        "description": "See ISelectOptionFeeder",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "scrollTo",
        "description": "See ISelectOptionFeeder",
        "args": [
          {
            "name": "index",
            "type": "number"
          }
        ],
        "returnType": "void"
      }
    ]
  },
  "ISelectSearcher": {
    "fileName": "src/app/select/searcher/select-searcher.model.ts",
    "className": "ISelectSearcher",
    "description": "",
    "methods": [
      {
        "name": "filter",
        "description": "Filter the options passed in parameters with the clue as search element",
        "args": [
          {
            "name": "clue",
            "type": "string"
          },
          {
            "name": "options",
            "type": "LuSelectOption<T>[]"
          }
        ],
        "returnType": "LuSelectOption<T>[]"
      }
    ],
    "properties": []
  },
  "LuSelectSearcherModule": {
    "fileName": "src/app/select/searcher/select-searcher.module.ts",
    "className": "LuSelectSearcherModule",
    "declarations": [
      "LuSelectSearcherComponent"
    ],
    "exports": [
      "LuSelectSearcherComponent"
    ]
  },
  "LuSelect": {
    "fileName": "src/app/select/select.component.ts",
    "className": "LuSelect",
    "description": "The component that provides available options from the api with the currently inputed text",
    "selector": "lu-select",
    "inputs": [
      {
        "name": "placeholder",
        "type": "string",
        "description": "The placeholder of the component, it is used as label (material design) "
      }
    ],
    "outputs": [
      {
        "name": "selectFocus",
        "description": "Emits an event when the select recieve or lost the focus"
      }
    ],
    "properties": [
      {
        "name": "_canRemove",
        "defaultValue": "false",
        "type": "boolean",
        "description": "True if the the component allow the clear of data  "
      },
      {
        "name": "_field",
        "type": "LuSelectDirective",
        "description": ""
      },
      {
        "name": "_onTouched",
        "type": "() => void",
        "description": ""
      },
      {
        "name": "_picker",
        "type": "LuSelectPicker<T>",
        "description": ""
      },
      {
        "name": "_strValue",
        "type": "string",
        "description": ""
      },
      {
        "name": "clearer",
        "type": "ISelectClearer<T>",
        "description": "Reference of the clearer"
      },
      {
        "name": "isFilled",
        "defaultValue": "false",
        "type": "boolean",
        "description": "Add a class binding for 'is-filled' when the select is filled"
      },
      {
        "name": "isFocused",
        "defaultValue": "false",
        "type": "boolean",
        "description": "Add a class binding for 'is-focused' when the select is focused"
      },
      {
        "name": "luOptions",
        "type": "QueryList<LuSelectOption<T>>",
        "description": "List of LuSelectOptions"
      },
      {
        "name": "optionFeederContent",
        "type": "ISelectOptionFeeder<T>",
        "description": "Reference of the optionFeeder"
      },
      {
        "name": "optionFeederView",
        "type": "ISelectOptionFeeder<T>",
        "description": ""
      },
      {
        "name": "value",
        "type": "T",
        "description": "The value of the select \nSet the value, an event (canremove) will be sent if the directive is clearable "
      }
    ],
    "methods": [
      {
        "name": "_clear",
        "description": "set the value to null ",
        "args": [],
        "returnType": "void"
      },
      {
        "name": "_optionSelected",
        "description": "Select the option",
        "args": [
          {
            "name": "option",
            "type": "LuSelectOption<T>"
          }
        ],
        "returnType": "void"
      },
      {
        "name": "_onClose",
        "description": "Inner method for close management",
        "args": [],
        "returnType": "void"
      }
    ]
  },
  "LuSelectModule": {
    "fileName": "src/app/select/select.module.ts",
    "className": "LuSelectModule",
    "declarations": [
      "LuSelect"
    ],
    "exports": [
      "LuSelectClearerModule",
      "LuSelectDirectiveModule",
      "LuSelectOptionModule",
      "LuSelectPickerModule",
      "LuSelectSearcherModule",
      "LuSelect"
    ]
  },
  "LuSelectSearchIntl": {
    "fileName": "src/app/select/utils/select-searcher.intl.ts",
    "className": "LuSelectSearchIntl",
    "description": "To modify the labels and text displayed, create a new instance of LuSelectSearchIntl and\r\ninclude it in a custom provider",
    "methods": [],
    "properties": [
      {
        "name": "changes",
        "type": "Subject<void>",
        "description": "Stream that emits whenever the labels here are changed. Use this to notify\r\ncomponents if the labels have changed after initialization."
      },
      {
        "name": "noResultsLabel",
        "defaultValue": "No results",
        "type": "string",
        "description": "A label for empty. "
      }
    ]
  },
  "LuUserDisplayModule": {
    "fileName": "src/app/user/display/user-display.module.ts",
    "className": "LuUserDisplayModule",
    "declarations": [
      "LuUserDisplayPipe"
    ],
    "exports": [
      "LuUserDisplayPipe"
    ]
  },
  "LuUserDisplayPipe": {
    "fileName": "src/app/user/display/user-display.pipe.ts",
    "className": "LuUserDisplayPipe",
    "description": "Displays a user name according to specified format. Supported formats: f for first name, F for first initial, l for last name, L for last initial.",
    "pipeName": "luUserDisplay",
    "input": {
      "name": "user",
      "type": "IUser"
    },
    "args": [
      {
        "name": "format",
        "type": "DisplayFormat"
      }
    ],
    "inputs": [],
    "outputs": [],
    "methods": [],
    "properties": []
  },
  "LuUserPictureComponent": {
    "fileName": "src/app/user/picture/user-picture.component.ts",
    "className": "LuUserPictureComponent",
    "description": "Displays user'picture or a placeholder with his/her initials and random bg color'",
    "selector": "lu-user-picture",
    "inputs": [
      {
        "name": "displayFormat",
        "type": "DisplayInitials",
        "description": "User Display format.\r\nIt is set to 'FL' by default"
      },
      {
        "name": "user",
        "type": "IUser",
        "description": ""
      }
    ],
    "outputs": [],
    "properties": [
      {
        "name": "displayFormat",
        "type": "DisplayInitials",
        "description": "User Display format.\r\nIt is set to 'FL' by default"
      },
      {
        "name": "hasPicture",
        "defaultValue": "false",
        "type": "boolean",
        "description": ""
      },
      {
        "name": "initials",
        "type": "string",
        "description": ""
      },
      {
        "name": "style",
        "type": "any",
        "description": ""
      },
      {
        "name": "user",
        "type": "IUser",
        "description": ""
      }
    ],
    "methods": []
  },
  "LuUserPictureModule": {
    "fileName": "src/app/user/picture/user-picture.module.ts",
    "className": "LuUserPictureModule",
    "declarations": [
      "LuUserPictureComponent"
    ],
    "exports": [
      "LuUserPictureComponent"
    ]
  },
  "UserSelectApiFeeder": {
    "fileName": "src/app/user/select/user-select-api-feeder.ts",
    "className": "UserSelectApiFeeder",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "fields",
        "type": "any[]",
        "description": "The additionnals fields to use in the search. "
      },
      {
        "name": "formerEmployees",
        "defaultValue": "false",
        "type": "boolean",
        "description": "True if you want to see the former Employees. "
      },
      {
        "name": "pagingSize",
        "defaultValue": "10",
        "type": "number",
        "description": "The paging size. "
      },
      {
        "name": "pagingStart",
        "type": "number",
        "description": "The pagingStart.  "
      }
    ]
  },
  "LuUserSelect": {
    "fileName": "src/app/user/select/user-select.component.ts",
    "className": "LuUserSelect",
    "description": "User select",
    "selector": "lu-user-select",
    "inputs": [
      {
        "name": "fields",
        "type": "any[]",
        "description": "The additionnals fields to use in the search. "
      },
      {
        "name": "formerEmployees",
        "defaultValue": "false",
        "type": "boolean",
        "description": "True if you want to see the former Employees. "
      },
      {
        "name": "pagingSize",
        "defaultValue": "10",
        "type": "number",
        "description": "The paging size. "
      },
      {
        "name": "pagingStart",
        "defaultValue": "0",
        "type": "number",
        "description": "The pagingStart.  "
      }
    ],
    "outputs": [],
    "properties": [],
    "methods": []
  },
  "LuUserSelectModule": {
    "fileName": "src/app/user/select/user-select.module.ts",
    "className": "LuUserSelectModule",
    "declarations": [
      "LuUserSelect"
    ],
    "exports": [
      "LuUserSelect"
    ]
  },
  "LuUserTileComponent": {
    "fileName": "src/app/user/tile/user-tile.component.ts",
    "className": "LuUserTileComponent",
    "description": "Displays user picture and name. IUser's role can be specified, and the footer is customizable.",
    "selector": "lu-user-tile",
    "inputs": [
      {
        "name": "displayFormat",
        "type": "string",
        "description": "User Display format.\r\nIt is set to 'fl' by default"
      },
      {
        "name": "role",
        "type": "string",
        "description": "IUser role to display"
      },
      {
        "name": "user",
        "type": "IUser",
        "description": "IUser to display."
      }
    ],
    "outputs": [],
    "properties": [
      {
        "name": "displayFormat",
        "type": "string",
        "description": "User Display format.\r\nIt is set to 'fl' by default"
      },
      {
        "name": "displayPictureFormat",
        "type": "DisplayInitials",
        "description": ""
      },
      {
        "name": "role",
        "type": "string",
        "description": "IUser role to display"
      },
      {
        "name": "user",
        "type": "IUser",
        "description": "IUser to display."
      }
    ],
    "methods": []
  },
  "LuUserTileModule": {
    "fileName": "src/app/user/tile/user-tile.module.ts",
    "className": "LuUserTileModule",
    "declarations": [
      "LuUserTileComponent"
    ],
    "exports": [
      "LuUserTileComponent"
    ]
  },
  "IUser": {
    "fileName": "src/app/user/user.model.ts",
    "className": "IUser",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "firstName",
        "type": "string",
        "description": ""
      },
      {
        "name": "jobTitle",
        "type": "string",
        "description": ""
      },
      {
        "name": "lastName",
        "type": "string",
        "description": ""
      },
      {
        "name": "picture",
        "type": "{ href: string; }",
        "description": ""
      }
    ]
  },
  "LuUserModule": {
    "fileName": "src/app/user/user.module.ts",
    "className": "LuUserModule",
    "declarations": [],
    "exports": [
      "LuUserPictureModule",
      "LuUserDisplayModule",
      "LuUserTileModule",
      "LuUserSelectModule"
    ]
  },
  "ɵStrictNullChecksNotSupported": {
    "fileName": "src/public_api.ts",
    "className": "ɵStrictNullChecksNotSupported",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "dontUseStrictNullChecksWithAngularYetSeeIssue15432",
        "type": "string",
        "description": ""
      }
    ]
  },
  "NodeModule": {
    "fileName": "src/typings.d.ts",
    "className": "NodeModule",
    "description": "",
    "methods": [],
    "properties": [
      {
        "name": "id",
        "type": "string",
        "description": ""
      }
    ]
  }
};

export default API_DOCS;