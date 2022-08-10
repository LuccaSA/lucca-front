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
        await ClickOnElementControlAsync(size, "size", "mod");
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

    [When(@"select grey (true|false)")]
    public async Task WhenSelectGreyAsync(string grey)
    {
        await ClickOnSwitchControlAsync(grey, "grey");
    }

    [When(@"select inline (true|false)")]
    public async Task WhenSelectInlineAsync(string inline)
    {
        await ClickOnSwitchControlAsync(inline, "inline");
    }

    [When(@"select required (true|false)")]
    public async Task WhenSelectRequiredAsync(string required)
    {
        await ClickOnSwitchControlAsync(required, "required");
    }

    [When(@"select row (true|false)")]
    public async Task WhenSelectRowAsync(string row)
    {
        await ClickOnSwitchControlAsync(row, "row");
    }

    [When(@"select small (true|false)")]
    public async Task WhenSelectSmallAsync(string small)
    {
        await ClickOnSwitchControlAsync(small, "small");
    }

    [When(@"select icon (.*)")]
    public async Task WhenSelectIconAsync(string icon)
    {
        await ClickOnSelectControlAsync(icon, "icon", "icon");
    }

    [When(@"select display (.*)")]
    public async Task WhenSelectDisplayAsync(string display)
    {
        await ClickOnRadioControlAsync(display, "display", "mod");
    }

    [When(@"select style (.*)")]
    public async Task WhenSelectStyleAsync(string style)
    {
        await ClickOnSelectControlAsync(style, "style", "mod");
    }

    [When(@"select noLabel (true|false)")]
    public async Task WhenSelectNoLabelAsync(string noLabel)
    {
        await ClickOnSwitchControlAsync(noLabel, "noLabel");
    }

    [When(@"select error (true|false)")]
    public async Task WhenSelectErrorAsync(string error)
    {
        await ClickOnSwitchControlAsync(error, "error");
    }

    [When(@"select invert (true|false)")]
    public async Task WhenSelectInvertAsync(string invert)
    {
        await ClickOnSwitchControlAsync(invert, "invert");
    }

    [When(@"select white (true|false)")]
    public async Task WhenSelectWhiteAsync(string white)
    {
        await ClickOnSwitchControlAsync(white, "white");
    }

    [When (@"select center (true|false)")]
    public async Task WhenSelectCenterAsync(string center) {
        await ClickOnSwitchControlAsync(center, "center");
    }

    [When (@"select clickable (true|false)")]
    public async Task WhenSelectClickableAsync(string clickable) {
        await ClickOnSwitchControlAsync(clickable, "clickable");
    }

    [When (@"select elevated (true|false)")]
    public async Task WhenSelectElevatedAsync(string elevated) {
        await ClickOnSwitchControlAsync(elevated, "elevated");
    }

    [When (@"select reverse (true|false)")]
    public async Task WhenSelectReverseAsync(string reverse) {
        await ClickOnSwitchControlAsync(reverse, "reverse");
    }

    [When (@"select noShadow (true|false)")]
    public async Task WhenSelectNoShadowAsync(string noShadow) {
        await ClickOnSwitchControlAsync(noShadow, "noShadow");
    }

    private async Task ClickOnElementControlAsync(string value, string controlName, string valuePrefix)
    {
        if (await _navigation.Page.IsVisibleAsync(GetSelectControlSelector(controlName)))
        {
            await ClickOnSelectControlAsync(value, controlName, valuePrefix);
            return;
        }

        if (await _navigation.Page.IsVisibleAsync(GetRadioControlSelector(controlName)))
        {
            await ClickOnRadioControlAsync(value, controlName, valuePrefix);
            return;
        }

        if (await _navigation.Page.IsVisibleAsync(GetSwitchControlSelector(controlName)))
        {
            await ClickOnSwitchControlAsync(value, controlName);
            return;
        }

    }

    private async Task ClickOnRadioControlAsync(string value, string controlName, string valuePrefix)
    {
        var selector = GetRadioControlSelector(controlName);
        if (string.IsNullOrEmpty(value))
        {
            await _navigation.Page.Locator(selector).Nth(0).ClickAsync();
        }
        else
        {
            await _navigation.Page.ClickAsync($"{selector}:has-text('{valuePrefix}-{value}')");
        }
    }

    private async Task ClickOnSelectControlAsync(string value, string controlName, string valuePrefix)
    {
        var selector = GetSelectControlSelector(controlName);

        if (string.IsNullOrEmpty(value))
        {
            await _navigation.Page.SelectOptionAsync(selector, string.Empty);
        }
        else
        {
            await _navigation.Page.SelectOptionAsync(selector, $"{valuePrefix}-{value}");
        }
    }

    private async Task ClickOnSwitchControlAsync(string value, string controlName)
    {
        var selector = GetSwitchControlSelector(controlName);
        await _navigation.Page.SetCheckedAsync(selector, value == "true");
    }


    private static string GetRadioControlSelector(string controlPrefix)
    {
        return $"label[for*='control-{controlPrefix}-']";
    }

    private static string GetSelectControlSelector(string controlName)
    {
        return $"select#control-{controlName}";
    }

    private static string GetSwitchControlSelector(string controlName)
    {
        return $"input[type='checkbox']#control-{controlName}";
    }
}