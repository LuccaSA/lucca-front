using TechTalk.SpecFlow;

namespace LuccaFront.Tests.e2e.Steps;

[Binding]
public class CheckboxesSteps
{
    private readonly INavigation _navigation;

    public CheckboxesSteps(INavigation navigation)
    {
        _navigation = navigation;
    }

    [When(@"click on checkbox")]
    public async Task WhenCheckCheckboxAsync()
    {
        await _navigation.Page.ClickAsync(".checkbox-label");
    }
}