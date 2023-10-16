@Library('Lucca@v0.62.0') _

import hudson.Util
import fr.lucca.CI

ciBuildProperties script:this

node(label: CI.getSelectedNode(script:this)) {
	notifyStartStats()

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
			loggableStage('Cleanup') {
				// storybook static
				if (fileExists('storybook')) {
					dir('storybook') {
						deleteDir()
					}
				}
			}

			loggableStage('Checkout') {
				scmVars = checkout scm
			}

			loggableStage('Restore') {
				npmCi()
			}

			if (!isPR) {
				loggableStage('Qualif') {
					// it must be buildable
					bat "npm run build"
					// it must break no test
					bat "npm run jenkins-test"
					// it must be lint compliant
					bat "npm run lint"
				}
			}

			if (isPR || isRc || isMaster) {
				loggableStage('Deploy') {
					echo "deploying ${branchName}"
					bat "npm run build-storybook"
					bat "npm run build-compodoc"
					powershell "Remove-Item \\\\RBX1-SH1-TECH\\lucca-front\\${branchName}\\storybook -Recurse"
					powershell "Remove-Item \\\\RBX1-SH1-TECH\\lucca-front\\${branchName}\\compodoc -Recurse"
					powershell "Copy-Item storybook-static \\\\RBX1-SH1-TECH\\lucca-front\\${branchName}\\storybook -Recurse"
					powershell "Copy-Item compodoc-static \\\\RBX1-SH1-TECH\\lucca-front\\${branchName}\\compodoc -Recurse"
				}

				loggableStage('e2e') {
					publishE2e(loggableStageName: 'e2e', slnFilepath: 'e2e\\LuccaFront.e2e.sln', framework: "net6.0")
            		archiveElements(e2e: true)
				}

				commentOnPR(
						credentialsId: 'ux-comment-token',
						body: ":woman_cook: https://lucca-front.lucca.tech/${branchName}/storybook",
						repoName: projectTechnicalName,
						skip: !isPR
				)
			}

			if (!isPR) {
				loggableStage('Publish') {
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
		}
	} catch(err) {
		println err
		currentBuild.result = 'failure'
	}

	notifyEndStats()
}
