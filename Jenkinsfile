pipeline {
  agent any
  environment {
    MONGO_TEST_URI = "127.0.0.1:27017/jenkinsgaldb"
    NODE_ENV = "test"
    JWT_SECRET = "s3cr3tly"
  }
  stages {
    stage('Connect to database') {
      steps {
        sh "mongo jenkinsgaldb"
      }
    }
    stage('Install dependencies') {
      steps {
        sh "npm install"
      }
    }
    stage('Run tests') {
      steps {
        sh "npm test"
      }
    }
    stage('Run coverage') {
      steps {
        sh "npm run coverage"
      }
    }
  }
}