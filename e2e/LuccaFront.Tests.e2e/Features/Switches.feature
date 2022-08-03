@ui-diff
Feature: Switches

    Background: Specify storybook actions on qualification select
        Given storybook forms switches

    Scenario: Switches-01: I can display basic switches
        Then take screenshot

    Scenario: Switches-02: I can display <inline> switches
        When select inline <inline>
        Then take screenshot
        Examples:
        | inline |
        | true   |
        | false  |

    Scenario: Switches-03: I can display <small> switches
        When select small <small>
        Then take screenshot
        Examples:
        | small  |
        | true   |
        | false  |

    Scenario: Switches-04: I can display <small> and <inline> switches
        When select small <small>
        And select inline <inline>
        Then take screenshot
        Examples:
        | small | inline |
        | true  | false  |
        | true  | true   |
        | false | true   |
        | false | false  |

