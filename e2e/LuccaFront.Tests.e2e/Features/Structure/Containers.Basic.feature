@ui-diff
Feature: Containers Basic

    Background: Specify storybook structure containers basic
        Given sotrybook structure containers basic

    Scenario: Containers-Basic-01: I can display basic containers
        Then take screenshot

    Scenario: Containers-Basic-02: I can display <center> containers
        When select center <center>
        Then take screenshot
        Examples:
        | center |
        | true   |
        | false  |