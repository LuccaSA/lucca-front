@ui-diff
Feature: Checkboxes

    Scenario: Checkboxes-01: I can display checkboxes
        Given storybook forms checkboxes basic
        Then take screenshot

    Scenario: Checkboxes-02: I can uncheck a checkbox
        Given storybook forms checkboxes basic
        When click on checkbox
        Then take screenshot

    Scenario: Checkboxes-03: I can check again the previous checkbox
        Given storybook forms checkboxes basic
        When click on checkbox
        Then take screenshot

    Scenario: Checkboxes-04: I can display <size> checkbox
        Given storybook forms checkboxes basic
        When select size <size>
        Then take screenshot
        Examples:
          | size  |
          | small |
          | big   |

    Scenario: Checkboxes-05: I can display <row> checkbox
        Given storybook forms checkboxes basic
        When select row <row>
        Then take screenshot
        Examples:
          | row   |
          | true  |
          | false |

    Scenario: Checkboxes-06: I can display <disabled> checkbox
        Given storybook forms checkboxes basic
        When select disabled <disabled>
        Then take screenshot
        Examples:
          | disabled |
          | true     |
          | false    |

    Scenario: Checkboxes-07: I can display <required> checkbox
        Given storybook forms checkboxes basic
        When select required <required>
        Then take screenshot
        Examples:
          | required |
          | true     |
          | false    |

    Scenario: Checkboxes-08: I can display incomplete checkbox
        Given storybook forms checkboxes incomplete
        Then take screenshot