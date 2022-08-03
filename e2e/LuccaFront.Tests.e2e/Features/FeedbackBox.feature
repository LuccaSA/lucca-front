@ui-diff
Feature: FeedbackBox

    Scenario: FeedbackBox-01: I can display feedback box basic
        Given storybook feedback box basic
        When select grey <grey>
		Then take screenshot
        Examples:
        | grey  |
        | true  |
        | false |

    Scenario: FeedbackBox-02: I can display feedback box killable
        Given storybook feedback box killable
        When select grey <grey>
		Then take screenshot
        Examples:
        | grey  |
        | true  |
        | false |

    Scenario: FeedbackBox-03: I can display feedback box toggle
        Given storybook feedback box toggle
        When select grey <grey>
		Then take screenshot
        Examples:
        | grey  |
        | true  |
        | false |