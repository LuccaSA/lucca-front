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
