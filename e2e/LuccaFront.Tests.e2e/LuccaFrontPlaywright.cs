using Lucca.Tests.E2e.Playwright.Base;
using Microsoft.Playwright;

namespace LuccaFront.Tests.e2e;

public class LuccaFrontPlaywright : BasePlaywright, INavigation
{
    public async Task SetupAsync()
    {
        Microsoft.Playwright.Program.Main(new[] { "install" });
        await InitPlaywrightAsync();
    }

    public async Task TeardownAsync()
    {
        await ClosePlaywrightAsync();
    }

    IPage INavigation.Page => base.Page;
}
