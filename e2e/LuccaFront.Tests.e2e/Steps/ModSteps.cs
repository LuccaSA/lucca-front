using TechTalk.SpecFlow;

namespace LuccaFront.Tests.e2e.Steps;

[Binding]
public class ModSteps
{
    private readonly INavigation _navigation;

    public ModSteps(INavigation navigation)
    {
        _navigation = navigation;
    }


    [When(@"select mod (.*)")]
    public async Task WhenSelectModAsync(string mod)
    {
        await ClickOnRadioControlAsync(mod, "mod", "mod");
    }

    [When(@"select size (.*)")]
    public async Task WhenSelectSizeAsync(string size)
    {
        await ClickOnRadioControlAsync(size, "size", "mod");
    }

    [When(@"select state (.*)")]
    public async Task WhenSelectStateAsync(string state)
    {
        await ClickOnRadioControlAsync(state, "state", "is");
    }

    [When(@"select palette (.*)")]
    public async Task WhenSelectPaletteAsync(string palette)
    {
        await ClickOnSelectControlAsync(palette, "palette", "palette");
    }

    [When(@"select block (true|false)")]
    public async Task WhenSelectBlockAsync(string block)
    {
        await ClickOnSwitchControlAsync(block, "block");
    }

    [When(@"select disabled (true|false)")]
    public async Task WhenSelectDisabledAsync(string disabled)
    {
        await ClickOnSwitchControlAsync(disabled, "disabled");
    }

    private async Task ClickOnRadioControlAsync(string value, string controlPrefix, string valuePrefix)
    {
        var selector = $"[for*='control-{controlPrefix}-']";
        if (string.IsNullOrEmpty(value))
        {
            await _navigation.Page.Locator(selector).Nth(0).ClickAsync();
        }
        await _navigation.Page.ClickAsync($"{selector}:has-text('{valuePrefix}-{value}')");
    }

    private async Task ClickOnSelectControlAsync(string value, string controlName, string valuePrefix)
    {
        var selector = $"#control-{controlName}";

        if (string.IsNullOrEmpty(value))
        {
            await _navigation.Page.SelectOptionAsync(selector, string.Empty);
        }
        await _navigation.Page.SelectOptionAsync(selector, $"{valuePrefix}-{value}");
    }

    private async Task ClickOnSwitchControlAsync(string value, string controlName)
    {
        var selector = $"#control-{controlName}";
        await _navigation.Page.SetCheckedAsync(selector, value == "true");
    }
}