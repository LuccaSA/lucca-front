@ui-diff
Feature: Containers

    Background: Specify storybook structure containers
        Given storybook structure containers basic

    Scenario: Containers-01: I can display basic containers
        Then take screenshot

    Scenario: Containers-02: I can display <center> containers
        When select center <center>
        Then take screenshot
        Examples:
        | center |
        | true   |
        | false  |