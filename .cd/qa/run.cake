// (1)!
#load nuget:?package=Lucca.Cake.LuciLib&version=4.12.0

///////////////////////////////////////////////////////////////////////////////
// SETUP
///////////////////////////////////////////////////////////////////////////////

Setup(ctx => { // (2)!
   var luciContext = ctx.CreateLuciContext("ApplicationCode"); // (3)!
   return luciContext;
});

///////////////////////////////////////////////////////////////////////////////
// TASKS
///////////////////////////////////////////////////////////////////////////////

// Lancement d'un run dans Qa.Webservice
// projetId est à récupérer dans l'url du projet Qa.Webservice : https://dd.lucca.tech/qa/projects/<projectId>/runs
Task("NotifyQa") // (4)!
    .Does(async (ctx) => {
        await ctx.RunQaAsync(37,@".+");
    });


var target = Argument("target", "NotifyQa"); // (5)!
RunTarget(target); // (6)!
