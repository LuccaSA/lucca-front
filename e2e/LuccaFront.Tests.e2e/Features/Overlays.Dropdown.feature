@ui-diff
Feature: Oberlays/Dropdown

    Background: Specify storybook overlays dropdown basic
        Given storybook overlays dropdown basic

    Scenario: Dropdown-01: I can display overlay button
		Then take screenshot

    Scenario: Dropdown-02: I can open Dropdown on click
        When open Dropdown on click
		Then take screenshot
