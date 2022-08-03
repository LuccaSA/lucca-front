@ui-diff
Feature: FeedbackCallout

    Scenario: FeedbackCallout-01: I can display feedback callout basic
        Given storybook feedback callout basic
        When select palette <palette>
        When select small <small>
		Then take screenshot
        Examples:
        | palette   | small |
        |           | true  |
        |           | false |
        | primary   | true  |
        | primary   | false |
        | secondary | true  |
        | secondary | false |
        | grey      | true  |
        | grey      | false |
        | success   | true  |
        | success   | false |
        | warning   | true  |
        | warning   | false |
        | error     | true  |
        | error     | false |

    Scenario: FeedbackCallout-02: I can display feedback callout icon
        Given storybook feedback callout icon
        When select palette <palette>
        When select icon <icon>
        When select small <small>
		Then take screenshot
        Examples:
        | palette   | icon    | small |
        |           | help    | true  |
        |           | help    | false |
        | success   | success | true  |
        | success   | success | false |
        | warning   | warning | true  |
        | warning   | warning | false |
        | error     | error   | true  |
        | error     | error   | false |

    Scenario: FeedbackCallout-03: I can display feedback callout killable
        Given storybook feedback callout killable
        When select palette <palette>
		Then take screenshot
        Examples:
        | palette   |
        |           |
        | primary   |
        | secondary |
        | grey      |
        | success   |
        | warning   |
        | error     |
