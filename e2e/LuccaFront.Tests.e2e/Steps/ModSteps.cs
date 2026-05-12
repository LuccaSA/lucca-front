using Microsoft.Playwright;
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
        await SetArgAsync("mod", $"mod-{mod}");
    }

    [When(@"select size (.*)")]
    public async Task WhenSelectSizeAsync(string size)
    {
        await SetArgAsync("size", $"mod-{size}");
    }

    [When(@"select state (.*)")]
    public async Task WhenSelectStateAsync(string state)
    {
        await SetArgAsync("state", $"is-{state}");
    }

    [When(@"select palette (.*)")]
    public async Task WhenSelectPaletteAsync(string palette)
    {
        await SetArgAsync("palette", $"palette-{palette}");
    }

    [When(@"select block (true|false)")]
    public async Task WhenSelectBlockAsync(string block)
    {
        await SetBoolArgAsync("block", block);
    }

    [When(@"select disabled (true|false)")]
    public async Task WhenSelectDisabledAsync(string disabled)
    {
        await SetBoolArgAsync("disabled", disabled);
    }

    [When(@"select grey (true|false)")]
    public async Task WhenSelectGreyAsync(string grey)
    {
        await SetBoolArgAsync("grey", grey);
    }

    [When(@"select inline (true|false)")]
    public async Task WhenSelectInlineAsync(string inline)
    {
        await SetBoolArgAsync("inline", inline);
    }

    [When(@"select required (true|false)")]
    public async Task WhenSelectRequiredAsync(string required)
    {
        await SetBoolArgAsync("required", required);
    }

    [When(@"select row (true|false)")]
    public async Task WhenSelectRowAsync(string row)
    {
        await SetBoolArgAsync("row", row);
    }

    [When(@"select small (true|false)")]
    public async Task WhenSelectSmallAsync(string small)
    {
        await SetBoolArgAsync("small", small);
    }

    [When(@"select icon (.*)")]
    public async Task WhenSelectIconAsync(string icon)
    {
        await SetArgAsync("icon", $"icon-{icon}");
    }

    [When(@"select display (.*)")]
    public async Task WhenSelectDisplayAsync(string display)
    {
        await SetArgAsync("display", $"mod-{display}");
    }

    [When(@"select style (.*)")]
    public async Task WhenSelectStyleAsync(string style)
    {
        await SetArgAsync("style", $"mod-{style}");
    }

    [When(@"select noLabel (true|false)")]
    public async Task WhenSelectNoLabelAsync(string noLabel)
    {
        await SetBoolArgAsync("noLabel", noLabel);
    }

    [When(@"select error (true|false)")]
    public async Task WhenSelectErrorAsync(string error)
    {
        await SetBoolArgAsync("error", error);
    }

    [When(@"select invert (true|false)")]
    public async Task WhenSelectInvertAsync(string invert)
    {
        await SetBoolArgAsync("invert", invert);
    }

    [When(@"select white (true|false)")]
    public async Task WhenSelectWhiteAsync(string white)
    {
        await SetBoolArgAsync("white", white);
    }

    [When (@"select center (true|false)")]
    public async Task WhenSelectCenterAsync(string center)
    {
        await SetBoolArgAsync("center", center);
    }

    [When (@"select clickable (true|false)")]
    public async Task WhenSelectClickableAsync(string clickable)
    {
        await SetBoolArgAsync("clickable", clickable);
    }

    [When (@"select elevated (true|false)")]
    public async Task WhenSelectElevatedAsync(string elevated)
    {
        await SetBoolArgAsync("elevated", elevated);
    }

    [When (@"select reverse (true|false)")]
    public async Task WhenSelectReverseAsync(string reverse)
    {
        await SetBoolArgAsync("reverse", reverse);
    }

    [When (@"select noShadow (true|false)")]
    public async Task WhenSelectNoShadowAsync(string noShadow)
    {
        await SetBoolArgAsync("noShadow", noShadow);
    }

    [When (@"select withoutShadow (true|false)")]
    public async Task WhenSelectWithoutShadowAsync(string withoutShadow)
    {
        await SetBoolArgAsync("withoutShadow", withoutShadow);
    }

    [When (@"select withMenu (true|false)")]
    public async Task WhenSelectWithMenuAsync(string withMenu)
    {
        await SetBoolArgAsync("withMenu", withMenu);
    }

    [When (@"select withBreadcrumbs (true|false)")]
    public async Task WhenSelectWithBreadcrumbsAsync(string withBreadcrumbs)
    {
        await SetBoolArgAsync("withBreadcrumbs", withBreadcrumbs);
    }

    private async Task SetArgAsync(string name, string value)
    {
        var currentUrl = _navigation.Page.Url;
        var separator = currentUrl.Contains("args=") ? ";" : "&args=";
        var newUrl = $"{currentUrl}{separator}{name}:{value}";
        await _navigation.Page.GotoAsync(newUrl);
        await _navigation.Page.WaitForLoadStateAsync(LoadState.NetworkIdle);
    }

    private async Task SetBoolArgAsync(string name, string value)
    {
        await SetArgAsync(name, value == "true" ? "!true" : "!false");
    }
}
