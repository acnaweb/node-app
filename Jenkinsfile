pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                sh 'docker build -t acnaweb/node-app .'
            }
        }
        stage('Run') {
            steps {
                sh 'docker compose up --build -d'
            } 
        }
        stage('Sleep') {
            steps {
                sh 'sleep 10'
            } 
        }
        stage('Sleep') {
            steps {
                sh 'test-app.sh'
            } 
        }        
    }
}    