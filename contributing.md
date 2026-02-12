# Contributing to Lucca Front

English is the main language used to debate, provide feedback and discuss features, please use it by default.

 - [Naming](#naming)
 - [Architecture](#architecture)
 - [Developer eXperience](#dx)

## <a name="naming"></a> Naming

We're using Angular's standard for naming, which includes:

- Classes, interfaces, types and enums must use `PascalCase` for their name.
- Static constants must use `UPPER_CASE` for their name.
- Variables, functions and class fields must use `camelCase` for their name.
- Variable and fields must be named in a way that makes it easy to understand what they do, naming an important variable `a` is not accepted for instance.
- Component inputs must never collide with an existing native input on their host.

You can read a very detailed version of that here: https://google.github.io/styleguide/tsguide.html


## <a name="architecture"></a> Architecture

### Files organization:

When creating new components, they should be placed in the right folder, as each folder is its own library entrypoint, and thus bundle.

If you're not sure about where to put a given feature, don't hesitate to reach to the team to ask using an issue.

### Code architecture

It's hard to properly describe how things are organized but let's try.

Overall, you should always avoid heavily coupling business code from "dumb" design system components, a good example of that being simple-select and multi-select providing the base,
dumb version of what a select should be. Then, directives are here to provide them everything they need to connect to Lucca's APIs.

Keep things simple as much as possible and make sure everything is working fine when being used with a keyboard, because accessibility is a priority.

🖊️ WIP

## <a name="dx"></a> Developer eXperience

For a component to be used, it must be easy to use. Always prefer keeping the hard, complex part on our end so developers can enjoy using components.

This includes, but not only:

- Using `booleanAttribute` transform, it makes components easier to use overall.
- Using meaningful input names, common names such as `config`, `param`, etc must be avoided and they're too generic, consumers need to know what your input does!
- Properly typings inputs, using union strings when necessary, to provide code completion, this can also be done with a trailing `| string` that will make it become a list of suggestions instead.
- Always use `numberAttribute` transform when creating an input that should take numbers, to make it easier to use for everyone.

Overall, ask yourself: would I want to use this component, that input? Before deciding on it, because if you don't want to use it due to how it's exposed, neither will the consumers.

Finally, make sure you provide the right inputs and outputs for your component before releasing it, because once it's released, any change to its interface contract will result in a breaking change and nobody likes breaking changes.
