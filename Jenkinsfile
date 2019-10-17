import hudson.Util;

properties([
	disableConcurrentBuilds(),
])

node {

	def projectTechnicalName = 'lucca-front'
	def repoName = "lucca-front"
	def publishDirectoryName = "${projectTechnicalName}-publish"

	def iconsDirectory = "packages/icons"
	def scssDirectory = "packages/scss"
	def ngDirectory = "packages/ng"


	
	def isPr = false
	def isMaster = false
	def isRc = false

	if(env.BRANCH_NAME == "master") {
		isMaster = true
	}
	if(env.BRANCH_NAME == "rc") {
		isRc = true
	}
	if(env.BRANCH_NAME ==~ /^PR-\d*/) {
		isPr = true
	}

	def isResultSuccessful = true
	try {
		timeout(time: 15, unit: 'MINUTES') {
			stage('Notify') {
				parallel(
					env: {
						echo "project ${projectTechnicalName}"
						echo "branch ${env.BRANCH_NAME}"
						echo "slave ${env.NODE_NAME}"
					},
					failFast: true,
				)
			}


			def scmVars = null

			stage('Cleanup') {
				parallel (
					tools: {
						if(fileExists('.jenkins')) {
							dir('.jenkins') {
								deleteDir()
							}
						}
					},
					publish: {
						if(fileExists(publishDirectoryName)) {
							dir(publishDirectoryName) {
								deleteDir()
							}
						}
					},
					failFast: true,
				)
			}

			stage('Prepare') {

				parallel (
					node: {
						env.NODEJS_HOME = "${tool 'Node LTS v10.13.x'}"
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
			stage('Restore') {
				parallel (
					all: {
						bat "npm ci"
					},
					failFast: true,
				)
			}
			stage('Qualif') {
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
			// }
			// stage('Publish') {
			// 	parallel(
			// 		icons: {
			// 			bat "npm run deploy"
			// 		},
			// 		scss: {
			// 			bat "npm run deploy"
			// 		},
			// 		ng: {
			// 			bat "npm run deploy"
			// 		},
			// 		failFast: true,
			// 	)
			// }
			// stage('Deploy') {
			// 	parallel(
			// 		prisme: {
			// 			// continuous deploy of branch rc and master
			// 			if (isRc) {
			// 				echo "deploying prisme-rc"
			// 				bat "npx cpx ${publishDirectoryName}\\** \\\\labs2.lucca.local\\c\$\\d\\sites\\prisme-rc"
			// 			}
			// 			if (isMaster) {
			// 				echo "deploying prisme"
			// 				bat "npx cpx ${publishDirectoryName}\\** \\\\labs2.lucca.local\\c\$\\d\\sites\\prisme"
			// 			}
			// 		},
			// 		failFast: true
			// 	)
			// }
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
