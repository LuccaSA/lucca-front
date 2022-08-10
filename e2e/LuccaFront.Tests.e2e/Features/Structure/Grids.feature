@ui-diff
Feature: Grids

    Scenario: Grids-01: I can display auto width grids
        Given storybook structure grids auto width
        Then take screenshot

    Scenario: Grids-02: I can display basic grids
        Given storybook structure grids basic
        Then take screenshot

    Scenario: Grids-03: I can display <reverse> grids
        Given storybook structure grids basic
        When select reverse <reverse>
        Then take screenshot
        Examples:
        | reverse |
        | true    |
        | false   |

    Scenario: Grids-04: I can display horizontal alignment grids
        Given storybook structure grids horizontal alignment
        Then take screenshot

    Scenario: Grids-05: I can display justify grids
        Given storybook structure grids justify
        Then take screenshot

    Scenario: Grids-06: I can display offset grids
        Given storybook structure grids offset
        Then take screenshot

    Scenario: Grids-07: I can display sort grids
        Given storybook structure grids sort
        Then take screenshot

    Scenario: Grids-08: I can display vertical alignment grids
        Given storybook structure grids vertical alignment
        Then take screenshot