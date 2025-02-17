@Library('Lucca@v1.14.5') _

import hudson.Util
import fr.lucca.CI

ciBuildProperties script:this

node(label: CI.getSelectedLinuxNode(script:this)) {
	def projectTechnicalName = 'lucca-front'
	def repoName = "lucca-front"

	def branchName = env.BRANCH_NAME

	def releaseRegexPattern = /^v\d+\.\d+\.\d+$/
	def preReleaseRegexPattern = /^v\d+\.\d+\.\d+-\w*(\.\d+)?$/

	def isPR = env.BRANCH_NAME ==~ /^PR-\d*/
	def isMaster = env.BRANCH_NAME == "master"
	def isRc = env.BRANCH_NAME == "rc"
	def isRelease = env.BRANCH_NAME ==~ releaseRegexPattern
	def isPreRelease = env.BRANCH_NAME ==~ preReleaseRegexPattern
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
			npmScript(script: 'nglint', skip: isPR)
			npmScript(script: 'stylelint', skip: isPR)

			def shouldDeploy = isPR || isRc || isMaster || isRelease || isPreRelease
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

					if (isRelease) {
						def versionWithoutPrefix = env.BRANCH_NAME.split("\\.")[0..1].join(".");
						powershell "Remove-Item \\\\RBX1-SH1-TECH\\lucca-front\\${versionWithoutPrefix}\\storybook -Recurse"
						powershell "Copy-Item storybook-static \\\\RBX1-SH1-TECH\\lucca-front\\${versionWithoutPrefix}\\storybook -Recurse"
					}

					unstash(name: "compodoc-static")
					powershell "Remove-Item \\\\RBX1-SH1-TECH\\lucca-front\\${env.BRANCH_NAME}\\compodoc -Recurse"
					powershell "Copy-Item compodoc-static \\\\RBX1-SH1-TECH\\lucca-front\\${env.BRANCH_NAME}\\compodoc -Recurse"
					if (isRelease) {
						def versionWithoutPrefix = env.BRANCH_NAME.split("\\.")[0..1].join(".");
						powershell "Remove-Item \\\\RBX1-SH1-TECH\\lucca-front\\${versionWithoutPrefix}\\compodoc -Recurse"
						powershell "Copy-Item compodoc-static \\\\RBX1-SH1-TECH\\lucca-front\\${versionWithoutPrefix}\\compodoc -Recurse"
					}
				}
			}

			def shouldRunE2E = isPR || isRc || isMaster
			loggableStage('e2e', !shouldRunE2E) {
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
				// Strip "v" from env.BRANCH_NAME if it's a release or pre-release (ie 18.2.1 instead of v18.2.1)
				def version = (isRelease || isPreRelease) ? env.BRANCH_NAME.substring(1) : env.BRANCH_NAME

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
