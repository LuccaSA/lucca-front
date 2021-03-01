import hudson.Util;

properties([
	disableConcurrentBuilds(),
])

node {

	def projectTechnicalName = 'lucca-front'
	def repoName = "lucca-front"

	def branchName = env.BRANCH_NAME;

	def iconsDirectory = "packages/icons"
	def scssDirectory = "packages/scss"
	def ngDirectory = "packages/ng"

	def isPr = false
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
		isPr = true
		prNumber = env.BRANCH_NAME.substring(3)
	}

	def isResultSuccessful = true
	try {
		timeout(time: 15, unit: 'MINUTES') {



			def scmVars = null

			stage('1. Cleanup') {
				parallel (
					tools: {
						if(fileExists('.jenkins')) {
							dir('.jenkins') {
								deleteDir()
							}
						}
					},
					publish: {
						if(fileExists('demo')) {
							dir('demo') {
								deleteDir()
							}
						}
					},
					icons: {
						if(fileExists("${iconsDirectory}\\node_modules")) {
							dir("${iconsDirectory}\\node_modules") {
								deleteDir()
							}
						}
					},
					scss: {
						if(fileExists("${scssDirectory}\\node_modules")) {
							dir("${scssDirectory}\\node_modules") {
								deleteDir()
							}
						}
					},
					ng: {
						if(fileExists("${ngDirectory}\\node_modules")) {
							dir("${ngDirectory}\\node_modules") {
								deleteDir()
							}
						}
					},
					failFast: true,
				)
			}

			stage('2. Prepare') {

				parallel (
					node: {
						env.NODEJS_HOME = "${tool 'Node LTS v12.x.y'}"
						env.PATH="${env.NODEJS_HOME};${env.PATH}"
						bat "node --version"
						bat "npm --version"
					},
					checkout: {
						scmVars = checkout scm
					},
					failFast: true,
				)
			}
			stage('3. Restore') {
				parallel (
					all: {
						bat "npm ci"
					},
					failFast: true,
				)
			}
			stage('4. Qualif') {
				parallel (
					icons: {
						bat "npm run build --prefix ${iconsDirectory}"
						// bat "npm run test --prefix ${iconsDirectory}"
						// bat "npm run lint --prefix ${iconsDirectory}"
					},
					scss: {
						bat "npm run build --prefix ${scssDirectory}"
						// bat "npm run test --prefix ${scssDirectory}"
						// bat "npm run lint --prefix ${scssDirectory}"
					},
					ng: {
						bat "npm run build --prefix ${ngDirectory}"
						// bat "npm run test --prefix ${ngDirectory}"
						// bat "npm run lint --prefix ${ngDirectory}"
					},
					failFast: true,
				)
			}
			if (isPr || isRc || isMaster) {
				stage('5. Build') {
					parallel(
				// 		icons: {
				// 			bat "npm run build:publish"
				// 		},
						scss: {
							bat "npm run build:publish --prefix ${scssDirectory}"
						},
						ng: {
							bat "npm run build:publish --prefix ${ngDirectory} -- --base-href /${branchName}/ng/"
						},
						failFast: true,
					)
				}

				stage('6. Deploy') {
					parallel(
						'lf.lucca.local': {
							echo "deploying ${branchName}"
							bat "npx cpy demo\\** \\\\labs2.lucca.local\\c\$\\d\\sites\\lucca-front\\${branchName} --clean"
							if (isPr) {
								// post PR comment
								def deployUrl = "http://lucca-front.lucca.local/${branchName}"
								withCredentials([string(credentialsId: 'ux-comment-token', variable: 'githubToken')]) {
									powershell """
										[Net.ServicePointManager]::SecurityProtocol = [Net.SecurityProtocolType]::Tls12
										Invoke-RestMethod -Method Post -Headers @{"Authorization"="token ${githubToken}"} -Uri https://api.github.com/repos/LuccaSA/${projectTechnicalName}/issues/${prNumber}/comments -Body (ConvertTo-Json @{"body"="jenkins auto deploy ${deployUrl}"}) -UseBasicParsing
									"""
								}
							}
						},
						failFast: true
					)
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
		// stage('Notify') {
		// 	parallel(
		// 		github: {

		// 		},
		// 		failFast: true,
		// 	)
		// }
	}
}
