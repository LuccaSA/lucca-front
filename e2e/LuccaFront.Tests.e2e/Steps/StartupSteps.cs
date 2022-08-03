using TechTalk.SpecFlow;

namespace LuccaFront.Tests.e2e.Steps;

[Binding]
public class StartupSteps
{
    private readonly FeatureContext _featureContext;
    public StartupSteps(FeatureContext featureContext)
    {
        _featureContext = featureContext;
    }
    
    [BeforeFeature]
    public static async Task BeforeFeatureAsync(FeatureContext featureContext)
    {
        featureContext.FeatureContainer.RegisterInstanceAs<INavigation>(
            featureContext.FeatureContainer.Resolve<LuccaFrontPlaywright>());
        await featureContext.FeatureContainer.Resolve<LuccaFrontPlaywright>().SetupAsync();
    }

    [AfterFeature]
    public static async Task AfterFeatureAsync(FeatureContext featureContext)
    {
        await featureContext.FeatureContainer.Resolve<LuccaFrontPlaywright>().TeardownAsync();
    }
}