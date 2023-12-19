@Library('Lucca@v0.67.3') _

import hudson.Util
import fr.lucca.CI

ciBuildProperties script:this

node(label: CI.getSelectedLinuxNode(script:this)) {
	def projectTechnicalName = 'lucca-front'
	def repoName = "lucca-front"

	def branchName = env.BRANCH_NAME;

	def isPR = env.BRANCH_NAME ==~ /^PR-\d*/
	def isMaster = env.BRANCH_NAME == "master"
	def isRc = env.BRANCH_NAME == "rc"
	def prNumber = env.CHANGE_ID

	cleanJenkins()

	def scmVars = null

	try {
		timeout(time: 10, unit: 'MINUTES') {
			loggableStage('Checkout') {
				scmVars = checkout scm
			}

			npmCi()

			npmScript(script: 'build')
			npmScript(script: 'jenkins-test', skip: isPR)
			npmScript(script: 'lint', skip: isPR)

			def shouldDeploy = isPR || isRc || isMaster;

			loggableStage('Deploy', !shouldDeploy) {
				echo "deploying ${branchName}"
				npmScript(script: 'build-storybook')
				npmScript(script: 'build-compodoc')

				// FIXME Deploy with windows node for now
				stash(name: "storybook-static", includes: "storybook-static/**")
				stash(name: "compodoc-static", includes: "compodoc-static/**")
				node("windows") {
					unstash(name: "storybook-static")
					powershell "Remove-Item \\\\RBX1-SH1-TECH\\lucca-front\\${env.BRANCH_NAME}\\storybook -Recurse"
					powershell "Copy-Item storybook-static \\\\RBX1-SH1-TECH\\lucca-front\\${env.BRANCH_NAME}\\storybook -Recurse"
					unstash(name: "compodoc-static")
					powershell "Remove-Item \\\\RBX1-SH1-TECH\\lucca-front\\${env.BRANCH_NAME}\\compodoc -Recurse"
					powershell "Copy-Item compodoc-static \\\\RBX1-SH1-TECH\\lucca-front\\${env.BRANCH_NAME}\\compodoc -Recurse"
				}
			}

			loggableStage('e2e', !shouldDeploy) {
				publishE2e(loggableStageName: 'e2e', slnFilepath: 'e2e/LuccaFront.e2e.sln', framework: "net6.0")
				archiveElements(e2e: true)
			}

			commentOnPR(
				credentialsId: 'ux-comment-token',
				body: ":woman_cook: https://lucca-front.lucca.tech/${branchName}/storybook",
				repoName: projectTechnicalName,
				skip: !isPR
			)

			loggableStage('Publish', isPR) {
				def version = env.BRANCH_NAME

				def iconsPackageJson = readFile(file: 'dist/icons/package.json');
				def scssPackageJson = readFile(file: 'dist/scss/package.json');
				def ngPackageJson = readFile(file: 'dist/ng/package.json');

				writeFile(file: 'dist/icons/package.json', text: iconsPackageJson.replaceAll('"\\*"', "\"${version}\""));
				writeFile(file: 'dist/scss/package.json', text: scssPackageJson.replaceAll('"\\*"', "\"${version}\""));
				writeFile(file: 'dist/ng/package.json', text: ngPackageJson.replaceAll('"\\*"', "\"${version}\""));

				publishNpmOnReleaseTag(publishFolder: 'dist/icons')
				publishNpmOnReleaseTag(publishFolder: 'dist/scss')
				publishNpmOnReleaseTag(publishFolder: 'dist/ng')
			}
		}
	} catch(err) {
		println err
		currentBuild.result = 'failure'
	}
}
