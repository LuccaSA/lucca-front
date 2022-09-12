@ui-diff
Feature: DateSelect

    Background: Specify storybook forms date select
        Given storybook forms date select

    Scenario: DateSelect-01: I can display date select
		Then take screenshot

    Scenario: DateSelect-02: I can open date select
		When click on select
		Then take screenshot
