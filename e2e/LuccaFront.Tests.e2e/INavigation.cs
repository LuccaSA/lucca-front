using Microsoft.Playwright;

namespace LuccaFront.Tests.e2e;

public interface INavigation
{
    IPage Page { get; }
}
