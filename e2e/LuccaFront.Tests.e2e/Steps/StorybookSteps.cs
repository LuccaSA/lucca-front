using Lucca.Tests.E2e.Abstractions;
using Microsoft.Playwright;
using TechTalk.SpecFlow;

namespace LuccaFront.Tests.e2e.Steps;

[Binding]
public class StorybookSteps
{
    private readonly INavigation _navigation;

    public StorybookSteps(INavigation navigation)
    {
        _navigation = navigation;
    }


    [Given(@"storybook (.*)")]
    public async Task GivenStorybookAsync(string id)
    {
        var url = $"/iframe.html?id=documentation-{id.ToLowerInvariant().Replace(' ', '-')}&viewMode=docs";
        await _navigation.Page.GotoAsync(E2eConfiguration.GetUrl(url));
        await _navigation.Page.AddStyleTagAsync(
            new PageAddStyleTagOptions
            {
                Content = @".innerZoomElementWrapper > div > div > div > * { display: inline-block; padding: 10px; } " +
                          @".docblock-code-toggle { display: none; } " +
                          @".docs-story + div, .os-content { visibility: hidden; } "
            }
        );
    }
}
