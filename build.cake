#load nuget:?package=Lucca.Cake.LuciLib&version=2.12.1

///////////////////////////////////////////////////////////////////////////////
// ARGUMENTS
///////////////////////////////////////////////////////////////////////////////

var target = Argument("target", "BuildCompodoc");

////////////////////////////////////////////////////////////////////////////
// SETUP
////////////////////////////////////////////////////////////////////////////

Setup(ctx => ctx.CreateLuciContext("@lucca-front"));

////////////////////////////////////////////////////////////////////////////
// TASKS
////////////////////////////////////////////////////////////////////////////

TaskSequence(
	Task("GitVersion").Does(ctx => ctx.ComputeVersion()),
	Task("Restore").Does(ctx => ctx.RestoreFront()),
	Task("Build").Does(ctx => ctx.RunScript("build")),
	Task("Test").Does(ctx => ctx.RunScript("jenkins-test")),
	Task("Lint").Does(ctx => ctx.RunScript("nglint")),
	Task("Stylelint").Does(ctx => ctx.RunScript("stylelint")),
	Task("BuildStorybook").Does(ctx => ctx.RunScript("build-storybook")),
	Task("BuildCompodoc").Does(ctx => ctx.RunScript("build-compodoc"))
);

RunTarget(target);
