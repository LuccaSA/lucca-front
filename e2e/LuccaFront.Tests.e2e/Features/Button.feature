@ui-diff
Feature: Button

    Background: Specify storybook actions button basic
        Given storybook actions button basic

    Scenario: Button-01: I can display basic button
		Then take screenshot

	Scenario: Button-02: I can display <mod> button
        When select mod <mod>
		Then take screenshot
        Examples:
        | mod      |
        | outlined |
        | text     |
        | invert   |

    Scenario: Button-03: I can display <size> button
        When select size <size>
		Then take screenshot
        Examples:
        | size    |
        | small   |
        | smaller |

    Scenario: Button-04: I can display <state> button
        When select state <state>
		Then take screenshot
        Examples:
        | state    |
        | loading  |
        | error    |
        | success  |
        | disabled |

    Scenario: Button-05: I can display <palette> button
        When select palette <palette>
		Then take screenshot
        Examples:
        | palette   |
        | primary   |
        | secondary |
        | grey      |
        | success   |
        | warning   |
        | error     |

    Scenario: Button-06: I can display <block> button
        When select block <block>
		Then take screenshot
        Examples:
        | block |
        | true  |
        | false |

    Scenario: Button-07: I can display <disabled> button
        When select disabled <disabled>
		Then take screenshot
        Examples:
        | disabled |
        | true     |
        | false    |