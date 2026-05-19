@Library('Lucca@v1.17.0') _

import hudson.Util
import fr.lucca.CI

ciBuildProperties script:this

node(label: CI.getSelectedLinuxNode(script:this)) {

	def isPR = env.BRANCH_NAME ==~ /^PR-\d*/
	def isMaster = env.BRANCH_NAME == "master"

	cleanJenkins()

	def scmVars = null

	try {
		timeout(time: 10, unit: 'MINUTES') {
			loggableStage('Checkout') {
				scmVars = checkout scm
			}

			npmCi()

			npmScript(script: 'build')
			def shouldRunE2E = isPR || isMaster
			loggableStage('e2e', !shouldRunE2E) {
				publishE2e(loggableStageName: 'e2e', slnFilepath: 'e2e/LuccaFront.e2e.sln', framework: "net6.0")
				archiveElements(e2e: true)
			}
		}
	} catch(err) {
		println err
		currentBuild.result = 'failure'
	}
}
