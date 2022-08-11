@ui-diff
Feature: Headers

    Scenario: Headers-01: I can display basic headers
        Given storybook structure headers basic
        Then take screenshot

    Scenario: Headers-02: I can display <noShadow> headers
        Given storybook structure headers basic
        When select noShadow <noShadow>
        Then take screenshot
        Examples:
        | noShadow |
        | true     |
        | false    |

    Scenario: Headers-03: I can display breadcrumb headers
        Given storybook structure headers breadcrumb
        Then take screenshot

    Scenario: Headers-04: I can display menu headers
        Given storybook structure headers menu
        Then take screenshot

    Scenario: Headers-05: I can display navigation headers
        Given storybook structure headers navigation
        Then take screenshot

    Scenario: Headers-06: I can display basic page headers
        Given storybook structure page header
        Then take screenshot

    Scenario: Headers-07: I can display <withBreadcrumbs> basic page headers
        Given storybook structure page header
        When select withBreadcrumbs <withBreadcrumbs>
        Then take screenshot
        Examples:
        | withBreadcrumbs |
        | true            |
        | false           |

    Scenario: Headers-08: I can display <withMenu> basic page headers
        Given storybook structure page header
        When select withMenu <withMenu>
        Then take screenshot
        Examples:
        | withMenu |
        | true     |
        | false    |

    Scenario: Headers-09: I can display <withoutShadow> basic page headers
        Given storybook structure page header
        When select withoutShadow <withoutShadow>
        Then take screenshot
        Examples:
        | withoutShadow |
        | true          |
        | false         |

    Scenario: Headers-10: I can display <withBreadcrumbs> and <withMenu> and <withoutShadow> basic page headers
        Given storybook structure page header
        When select withBreadcrumbs <withBreadcrumbs>
        And select withMenu <withMenu>
        And select withoutShadow <withoutShadow>
        Then take screenshot
        Examples:
        | withBreadcrumbs | withMenu | withoutShadow |
        | true            | true     | true          |
        | false           | true     | true          |
        | true            | false    | true          |
        | true            | true     | false         |
