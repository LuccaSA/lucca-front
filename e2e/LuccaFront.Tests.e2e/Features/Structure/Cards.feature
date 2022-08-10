@ui-diff
Feature: Cards

    Scenario: Cards-01: I can display basic cards
        Given storybook structure cards basic
        Then take screenshot

    Scenario: Cards-02: I can display <clickable> cards
        Given storybook structure cards basic
        When select clickable <clickable>
        Then take screenshot
        Examples:
        | clickable |
        | true      |
        | false     |

    Scenario: Cards-03: I can display <grey> cards
        Given storybook structure cards basic
        When select grey <grey>
        Then take screenshot
        Examples:
        | grey  |
        | true  |
        | false |

    Scenario: Cards-04: I can display <disabled> cards
        Given storybook structure cards basic
        When select disabled <disabled>
        Then take screenshot
        Examples:
        | disabled |
        | true     |
        | false    |

    Scenario: Cards-05: I can display <elevated> cards
        Given storybook structure cards basic
        When select elevated <elevated>
        Then take screenshot
        Examples:
        | elevated |
        | true     |
        | false    |

    Scenario: Cards-06: I can display <clickable> and <grey> and <disabled> and <elevated> cards
        Given storybook structure cards basic
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

    Scenario: Cards-07: I can display cards footer
        Given storybook structure cards footer
        Then take screenshot