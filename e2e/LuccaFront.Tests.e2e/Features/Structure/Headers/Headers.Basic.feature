@ui-diff
Feature: Headers Basic

    Background: Specify storybook structure headers basic
        Given storybook structure headers basic

    Scenario: Headers-Basic-01: I can display basic headers
        Then take screenshot

    Scenario: Headers-Basic-02: I can display <noShadow> headers
        When select noShadow <noShadow>
        Then take screenshot
        Examples:
        | noShadow |
        | true     |
        | false    |