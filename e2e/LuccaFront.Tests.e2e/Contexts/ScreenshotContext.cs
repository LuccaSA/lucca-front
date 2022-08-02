namespace LuccaFront.Tests.e2e.Contexts;

public class ScreenshotContext
{
    private int _screenshotId = 0;

    public int NextScreenshotId => ++_screenshotId;
    public int CurrentScreenshotId => _screenshotId;
}