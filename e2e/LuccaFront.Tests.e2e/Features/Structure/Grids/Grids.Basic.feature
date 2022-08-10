@ui-diff
Feature: Grids Basic

    Background: Specify storybook structure grids basic
        Given storybook structure grids basic

    Scenario: Grids-Basic-01: I can display basic grids
        Then take screenshot

    Scenario: Grids-Basic-02: I can display <reverse> grids
        When select reverse <reverse>
        Then take screenshot
        Examples:
        | reverse |
        | true    |
        | false   |