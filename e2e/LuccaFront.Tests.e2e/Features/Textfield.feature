@ui-diff
Feature: Textfield

    Scenario: Textfield-01: I can display textfield
        Given storybook forms textfield basic
        Then take screenshot

    Scenario: Textfield-02: I can display <palette> textfield
        Given storybook forms textfield basic
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

    Scenario: Textfield-03: I can display <display> textfield
        Given storybook forms textfield basic
        When select display <display>
        Then take screenshot
        Examples:
          | display |
          | block   |
          | inline  |

    Scenario: Textfield-04: I can display <style> textfield
        Given storybook forms textfield basic
        When select style <style>
        Then take screenshot
        Examples:
          | style    |
          | compact  |
          | material |
          | framed   |
          | outlined |

    Scenario: Textfield-05: I can display <noLabel> textfield
        Given storybook forms textfield basic
        When select noLabel <noLabel>
        Then take screenshot
        Examples:
          | noLabel |
          | true    |
          | false   |

    Scenario: Textfield-06: I can display <size> textfield
        Given storybook forms textfield basic
        When select size <size>
        Then take screenshot
        Examples:
          | size     |
          | shortest |
          | shorter  |
          | short    |
          | standard |
          | long     |
          | longer   |
          | longest  |

    Scenario: Textfield-07: I can display <small> textfield
        Given storybook forms textfield basic
        When select small <small>
        Then take screenshot
        Examples:
          | small |
          | true  |
          | false |

    Scenario: Textfield-08: I can display <disabled> textfield
        Given storybook forms textfield basic
        When select disabled <disabled>
        Then take screenshot
        Examples:
          | disabled |
          | true     |
          | false    |

    Scenario: Textfield-09: I can display <error> textfield
        Given storybook forms textfield basic
        When select error <error>
        Then take screenshot
        Examples:
          | error |
          | true  |
          | false |

    Scenario: Textfield-10: I can display <required> textfield
        Given storybook forms textfield basic
        When select required <required>
        Then take screenshot
        Examples:
          | required |
          | true     |
          | false    |

    Scenario: Textfield-11: I can display <invert> textfield
        Given storybook forms textfield basic
        When select invert <invert>
        Then take screenshot
        Examples:
          | invert |
          | true   |
          | false  |

    Scenario: Textfield-12: I can display <white> textfield
        Given storybook forms textfield basic
        When select white <white>
        Then take screenshot
        Examples:
          | white |
          | true  |
          | false |

    Scenario: Textfield-13: I can display clearable textfield
        Given storybook forms textfield clearable
        Then take screenshot

    Scenario: Textfield-14: I can display feedback textfield
        Given storybook forms textfield feedback
        Then take screenshot

    Scenario: Textfield-15: I can display filter textfield
        Given storybook forms textfield filter
        Then take screenshot

    Scenario: Textfield-16: I can display messages textfield
        Given storybook forms textfield messages
        Then take screenshot

    Scenario: Textfield-17: I can display multiline textfield
        Given storybook forms textfield multiline
        Then take screenshot

    Scenario: Textfield-18: I can display password textfield
        Given storybook forms textfield password
        Then take screenshot

    Scenario: Textfield-19: I can display radio textfield
        Given storybook forms textfield radio
        Then take screenshot