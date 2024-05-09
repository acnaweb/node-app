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
        stage('Run tests') {
            steps {
                sh 'chmod +x test-app.sh'
                sh './test-app.sh'            
            } 
        }        
    }
}    