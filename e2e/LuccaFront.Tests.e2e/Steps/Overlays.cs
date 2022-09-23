using TechTalk.SpecFlow;

namespace LuccaFront.Tests.e2e.Steps;

[Binding]
public class OverlaysDropdownSteps
{
    private readonly INavigation _navigation;

    public OverlaysDropdownSteps(INavigation navigation)
    {
        _navigation = navigation;
    }


    [When(@"open Dropdown on click")]
    public async Task OpenDropdownOnClickAsync()
    {
        await _navigation.Page.ClickAsync("button.button");
    }

    [When(@"open tooltip (.*)")]
    public async Task OpenTooltipOnClickAsync(string tooltip)
    {
        await _navigation.Page.ClickAsync($"[data-tooltip={tooltip}]");
    }
}