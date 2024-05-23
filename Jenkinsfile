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
                sh 'sleep 5'
            } 
        }

        stage('SonarQube validation') {
            withSonarQubeEnv('sonar-server', envOnly: true) {
                println ${env.SONAR_CONFIG_NAME} 
                println ${env.SONAR_HOST_URL} 
                println ${env.SONAR_AUTH_TOKEN} 
            }
        }

        stage('Run tests') {
            steps {
                sh 'chmod +x test-app.sh'
                sh './test-app.sh'
            } 
        }  

        stage('Shutdown') {
            steps {
                sh 'docker compose down'
            } 
        }              
    }
}    