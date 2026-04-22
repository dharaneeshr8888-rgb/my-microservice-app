pipeline {
  agent any

  environment {
    DOCKER_IMAGE = "rdharaneesh/myapp:latest"
  }

  stages {

    stage('Build (npm install)') {
      steps {
        sh '''
          docker run --rm \
            --dns 8.8.8.8 --dns 8.8.4.4 \
            --volumes-from jenkins \
            -w /var/jenkins_home/workspace/my-pipeline \
            node:18 npm install
        '''
      }
    }

    stage('Test') {
      steps {
        sh '''
          docker run --rm \
            --dns 8.8.8.8 --dns 8.8.4.4 \
            --volumes-from jenkins \
            -w /var/jenkins_home/workspace/my-pipeline \
            node:18 npm test || true
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

    stage('Kubernetes Deploy') {
      steps {
        sh '''
          kubectl set image deployment/myapp myapp=$DOCKER_IMAGE
        '''
      }
    }
  }
}
