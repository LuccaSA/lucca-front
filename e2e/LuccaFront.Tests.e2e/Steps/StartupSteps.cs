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
    public static void BeforeFeature(FeatureContext featureContext)
    {
        featureContext.FeatureContainer.RegisterInstanceAs<INavigation>(
            featureContext.FeatureContainer.Resolve<LuccaFrontPlaywright>());
    }
    
    [BeforeScenario]
    public async Task BeforeScenarioAsync(ScenarioContext scenarioContext)
    {
        await _featureContext.FeatureContainer.Resolve<LuccaFrontPlaywright>().SetupAsync();
    }
    
    [AfterScenario]
    public async Task AfterScenarioAsync(ScenarioContext scenarioContext)
    {
        await _featureContext.FeatureContainer.Resolve<LuccaFrontPlaywright>().TeardownAsync();
    }
}