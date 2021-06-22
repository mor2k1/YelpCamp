pipeline {
  agent any
  stages {
    stage('step 2') {
      steps {
        sh '''cmd = "whoami"
cmd.execute().text
'''
      }
    }

  }
}