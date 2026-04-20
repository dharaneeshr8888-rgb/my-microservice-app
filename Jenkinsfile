pipeline {
    agent any

    stages {
        stage('Build') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh 'npm install'
                    }
                }
            }
        }

        stage('Test') {
            steps {
                script {
                    docker.image('node:18').inside {
                        sh 'npm test'
                    }
                }
            }
        }

        stage('Docker Build') {
            steps {
                sh 'docker build -t myapp .'
            }
        }
    }
}
