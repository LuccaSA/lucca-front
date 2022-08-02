using Lucca.Tests.E2e.Playwright.Helpers;
using LuccaFront.Tests.e2e.Contexts;
using Microsoft.Playwright;
using TechTalk.SpecFlow;

namespace LuccaFront.Tests.e2e.Steps;

[Binding]
public class ScreenshotSteps
{
	private readonly INavigation _navigation;
    private readonly ScreenshotContext _screenshotContext;

    protected ScreenshotSteps(
        INavigation navigation,
        ScreenshotContext screenshotContext)
    {
        _navigation = navigation;
        _screenshotContext = screenshotContext;
    }

	[Then(@"take screenshot")]
	public async Task ThenTakeScreenshotAsync()
	{
        if (await _navigation.Page.IsVisibleAsync(".cdk-overlay-pane"))
        {
            await _navigation.Page.Locator(".cdk-overlay-pane")
                .TakeScreenshotLocatorForUiDiffAsync(
                _screenshotContext.NextScreenshotId.ToString()
            );
        }
        else
        {
            await _navigation.Page.Locator(".innerZoomElementWrapper > div > div > div > *")
                .TakeScreenshotLocatorForUiDiffAsync(
                _screenshotContext.NextScreenshotId.ToString()
            );
        }

    }
}
