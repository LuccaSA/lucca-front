@ui-diff
Feature: Oberlays

    Rule: Dropdown

        Scenario: Dropdown-01: I can display overlay button
            Given storybook overlays dropdown basic
            Then take screenshot

        Scenario: Dropdown-02: I can open Dropdown on click
            Given storybook overlays dropdown basic
            When open Dropdown on click
            Then take screenshot

    Rule: Modal

        Scenario: Modal-01: I can display modal button
            Given storybook overlays modal
            Then take screenshot

        Scenario: Modal-02: I can open Modal on click
            Given storybook overlays modal
            When open Dropdown on click
            Then take screenshot

    Rule: Popover

        Scenario: Popover-01: I can display Popover button
            Given storybook overlays popover
            Then take screenshot

        Scenario: Popover-02: I can open Popover on click
            Given storybook overlays popover
            When open Dropdown on click
            Then take screenshot

    Rule: Toasts

        Scenario: Toasts-01: I can display Toasts buttons
            Given storybook overlays toasts
            Then take screenshot

        Scenario: Toasts-02: I can open Toast on click
            Given storybook overlays toasts
            When open Dropdown on click
            Then take screenshot

    Rule: Tooltip

        Scenario: Tooltip-01: I can display Tooltip buttons
            Given storybook overlays tooltip focus
            Then take screenshot

        Scenario: Toasts-02: I can open Tooltip on click
            Given storybook overlays tooltip focus
            When open tooltip <tooltip>
            Then take screenshot
            Examples:
            | tooltip               |
            | basic                 |
            | disabled              |
            | hardcoded             |
            | hardcoded-disabled    |
