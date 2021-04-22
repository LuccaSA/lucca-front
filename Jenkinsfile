import hudson.Util;

properties([
	disableConcurrentBuilds(),
])

node {

	def projectTechnicalName = 'lucca-front'
	def repoName = "lucca-front"

	def branchName = env.BRANCH_NAME;

	def isPR = false
	def isMaster = false
	def isRc = false
	def prNumber = 0

	if(env.BRANCH_NAME == "master") {
		isMaster = true
	}
	if(env.BRANCH_NAME == "rc") {
		isRc = true
	}
	if(env.BRANCH_NAME ==~ /^PR-\d*/) {
		isPR = true
		prNumber = env.BRANCH_NAME.substring(3)
	}

	def isResultSuccessful = true
	try {
		timeout(time: 15, unit: 'MINUTES') {



			def scmVars = null

			stage('Cleanup') {
				// tools
				if(fileExists('.jenkins')) {
					dir('.jenkins') {
						deleteDir()
					}
				}
				// storybook static
				if(fileExists('storybook')) {
					dir('storybook') {
						deleteDir()
					}
				}
			}

			stage('Prepare') {
				env.NODEJS_HOME = "${tool 'Node LTS v12.x.y'}"
				env.PATH="${env.NODEJS_HOME};${env.PATH}"
				bat "node --version"
				bat "npm --version"

				scmVars = checkout scm
			}

			stage('Restore') {
				bat "npm ci"
			}

			if (!isPR) {
				stage('Qualif') {
					// it must be buildable
					bat "npm run build"
					// it must break no test
					// bat "npm run test"
					// it must be lint compliant
					// bat "npm run lint"
				}
			}

			if (isPR || isRc || isMaster) {
				stage('Deploy') {
					echo "deploying ${branchName}"
					bat "npm run compodoc -- -p ./tsconfig.json -e json -d .storybook"
					bat "npm run build-storybook -- -o \\\\labs2.lucca.local\\c\$\\d\\sites\\lucca-front\\${branchName}"
				}

				if (isPR) {
					// post PR comment
					def deployUrl = "http://lucca-front.lucca.local/${branchName}"
					withCredentials([string(credentialsId: 'ux-comment-token', variable: 'githubToken')]) {
						powershell """
							[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
							Invoke-RestMethod -Method Post -Headers @{"Authorization"="token ${githubToken}"} -Uri https://api.github.com/repos/LuccaSA/${projectTechnicalName}/issues/${prNumber}/comments -Body (ConvertTo-Json @{"body"="jenkins auto deploy ${deployUrl}"}) -UseBasicParsing
						"""
					}
				}
			}

		}
	} catch(err) {
		stage('Error') {
			println err
		}
		isResultSuccessful = false
		currentBuild.result = 'failure'
	} finally {
		def color = "good"
		def endMessage = "Succès"

		if(!isResultSuccessful) {
			color = "danger"
			endMessage = "Erreur"
		}
	}
}
