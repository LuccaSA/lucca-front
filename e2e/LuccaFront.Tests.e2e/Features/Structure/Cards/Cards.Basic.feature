@ui-diff
Feature: Cards Basic

    Background: Specify sotrybook structure cards basic
        Given storybook structure cards basic

    Scenario: Cards-Basic-01: I can display basic cards
        Then take screenshot

    Scenario: Cards-Basic-02: I can display <clickable> cards
        When select clickable <clickable>
        Then take screenshot
        Examples:
        | clickable |
        | true      |
        | false     |

    Scenario: Cards-Basic-03: I can display <grey> cards
        When select grey <grey>
        Then take screenshot
        Examples:
        | grey  |
        | true  |
        | false |

    Scenario: Cards-Basic-04: I can display <disabled> cards
        When select disabled <disabled>
        Then take screenshot
        Examples:
        | disabled |
        | true     |
        | false    |

    Scenario: Cards-Basic-05: I can display <elevated> cards
        When select elevated <elevated>
        Then take screenshot
        Examples:
        | elevated |
        | true     |
        | false    |

    Scenario: Cards-Basic-06: I can display <clickable> and <grey> and <disabled> and <elevated> cards
        When select clickable <clickable>
        And select grey <grey>
        And select disabled <disabled>
        And select elevated <elevated>
        Then take screenshot
        Examples:
        | clickable | grey  | disabled | elevated |
        | true      | true  | true     | true     |
        | false     | true  | true     | true     |
        | false     | false | true     | true     |
        | true      | false | false    | true     |
        | true      | false | true     | false    |
        | true      | true  | false    | false    |
        | false     | true  | true     | false    |
        | false     | true  | false    | true     |