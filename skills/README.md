# Lucca Front Skills

Auto-generated skills documentation for the @lucca-front design system following the [Agent Skills specification](https://agentskills.io/specification).

## Structure

```
skills/
├── SKILL.md                    # Main skill file with routing guide
├── ng/
│   └── references/             # Angular component skills (auto-generated)
├── icons/
│   └── references/             # Icon library skills (auto-generated)
├── scss/
│   └── references/             # SCSS utilities skills (auto-generated)
└── prisme/
    └── references/             # Prisme core component skills (auto-generated)
```

## Usage

### Generate all skills

```bash
npm run skills:generate
```

### Preview without making changes

```bash
npm run skills:dry-run
```

### Generate for a specific package

```bash
node scripts/generate-skills.js --package ng
node scripts/generate-skills.js --package icons
node scripts/generate-skills.js --package scss
node scripts/generate-skills.js --package prisme
```

## How it works

The generator script (`scripts/generate-skills.js`):

1. **Parses Storybook stories** in `stories/documentation/` to extract:
   - Component imports
   - Properties and argTypes
   - HTML templates and examples
   - CSS classes

2. **Parses Angular component sources** in `packages/ng/` and `packages/prisme/` to extract:
   - Input properties with types and descriptions
   - JSDoc comments

3. **Generates markdown files** in `skills/` with:
   - Import statements
   - Properties tables
   - Code examples
   - CSS class references
   - Usage guidelines
   - Accessibility recommendations

4. **Creates a main SKILL.md** with a routing guide to help agents find the right reference file.

## For AI Agents

The `SKILL.md` file acts as an index. When answering questions about @lucca-front:

1. Read `SKILL.md` to find the relevant reference file
2. Load only the specific reference file(s) needed
3. Don't load all references at once

## Specifications

Based on:
- [Agent Skills Specification](https://agentskills.io/specification)
- [Claude Best Practices](https://platform.claude.com/docs/en/agents-and-tools/agent-skills/best-practices)

