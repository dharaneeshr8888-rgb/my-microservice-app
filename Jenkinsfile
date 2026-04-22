pipeline {
  agent any

  stages {

    stage('Check Docker') {
      steps {
        sh 'docker version'
      }
    }

    stage('Build (npm install)') {
      steps {
        sh '''
          docker run --rm -v $PWD:/app -w /app node:18 npm install
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          docker run --rm -v $PWD:/app -w /app node:18 npm test || true
        '''
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t myapp:latest .'
      }
    }
  }
}
