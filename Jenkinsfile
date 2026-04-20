pipeline {
    agent {
        docker {
            image 'node:18'
        }
    }

    stages {
        stage('Build') {
            steps {
                sh 'npm install'
            }
        }

        stage('Test') {
            steps {
                sh 'npm test'
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t myapp .'
            }
        }
    }
}
