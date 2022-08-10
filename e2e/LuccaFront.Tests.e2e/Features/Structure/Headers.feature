@ui-diff
Feature: Headers

    Scenario: Headers-01: I can display basic headers
        Given storybook structure headers basic
        Then take screenshot

    Scenario: Headers-02: I can display <noShadow> headers
        Given storybook structure headers basic
        When select noShadow <noShadow>
        Then take screenshot
        Examples:
        | noShadow |
        | true     |
        | false    |

    Scenario: Headers-03: I can display breadcrumb headers
        Given storybook structure headers breadcrumb
        Then take screenshot

    Scenario: Headers-04: I can display menu headers
        Given storybook structure headers menu
        Then take screenshot

    Scenario: Headers-05: I can display navigation headers
        Given storybook structure headers navigation
        Then take screenshot