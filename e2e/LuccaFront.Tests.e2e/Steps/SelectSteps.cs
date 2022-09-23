using TechTalk.SpecFlow;

namespace LuccaFront.Tests.e2e.Steps;

[Binding]
public class SelectSteps
{
    private readonly INavigation _navigation;

    public SelectSteps(INavigation navigation)
    {
        _navigation = navigation;
    }


	[When(@"click on select")]
	public async Task WhenClickOnSelectAsync()
    {
		await _navigation.Page.ClickAsync(".textfield-input");
	}
}
