@Library('Lucca@v0.42.0') _

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
					bat "npm run compodoc"
					bat "npm run build-storybook"
					bat "npm run build-compodoc"
					powershell "Remove-Item \\\\labs2.lucca.local\\c\$\\d\\sites\\lucca-front\\${branchName}\\storybook -Recurse"
					powershell "Remove-Item \\\\labs2.lucca.local\\c\$\\d\\sites\\lucca-front\\${branchName}\\compodoc -Recurse"
					powershell "Copy-Item storybook-static \\\\labs2.lucca.local\\c\$\\d\\sites\\lucca-front\\${branchName}\\storybook -Recurse"
					powershell "Copy-Item compodoc-static \\\\labs2.lucca.local\\c\$\\d\\sites\\lucca-front\\${branchName}\\compodoc -Recurse"
				}

				if (isPR) {
					// post PR comment
					def deployUrl = "http://lucca-front.lucca.local/${branchName}/storybook"
					withCredentials([string(credentialsId: 'ux-comment-token', variable: 'githubToken')]) {
						powershell """
							[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
							Invoke-RestMethod -Method Post -Headers @{"Authorization"="token ${githubToken}"} -Uri https://api.github.com/repos/LuccaSA/${projectTechnicalName}/issues/${prNumber}/comments -Body (ConvertTo-Json @{"body"=":woman_cook: ${deployUrl}"}) -UseBasicParsing
						"""
					}
				}
			}

			loggableStage('Publish') {
				def version = env.BRANCH_NAME

				def iconsPackageJson = readFile(file: 'dist/icons/package.json');
				def scssPackageJson = readFile(file: 'dist/scss/package.json');
				def ngPackageJson = readFile(file: 'dist/ng/package.json');

				writeFile(file: 'dist/icons/package.json', text: iconsPackageJson.replaceAll('"*"', "\"${version}\""));
				writeFile(file: 'dist/scss/package.json', text: scssPackageJson.replaceAll('"*"', "\"${version}\""));
				writeFile(file: 'dist/ng/package.json', text: ngPackageJson.replaceAll('"*"', "\"${version}\""));

				publishNpmOnReleaseTag(publishFolder: 'dist/icons')
				publishNpmOnReleaseTag(publishFolder: 'dist/scss')
				publishNpmOnReleaseTag(publishFolder: 'dist/ng')
			}
		}
	} catch(err) {
		println err
		currentBuild.result = 'failure'
	}

	notifyEndStats()
}
