pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "rdharaneesh/myapp:latest"
  }

  stages {

    stage('Build (npm install)') {
      steps {
        sh '''
          docker run --rm -v $PWD:/app -w /app node:18 npm install
        '''
      }
    }

    stage('Docker Build') {
      steps {
        sh 'docker build -t myapp:latest .'
      }
    }

    stage('Docker Push') {
      steps {
        withCredentials([usernamePassword(
          credentialsId: 'dockerhub-creds',
          usernameVariable: 'DOCKER_USER',
          passwordVariable: 'DOCKER_PASS'
        )]) {
          sh '''
            echo $DOCKER_PASS | docker login -u $DOCKER_USER --password-stdin
            docker tag myapp:latest $DOCKER_IMAGE
            docker push $DOCKER_IMAGE
          '''
        }
      }
    }
  }
}
