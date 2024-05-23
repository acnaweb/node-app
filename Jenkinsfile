pipeline {
    agent any
    stages {
        stage('Build image') {
            steps {
                sh 'docker build -t acnaweb/node-app .'
            }
        }

        stage('Run Container') {
            steps {
                sh 'docker compose up --build -d'
            } 
        }

        stage('Sleep') {
            steps {
                sh 'sleep 5'
            } 
        }

        stage('SonarQube Analysis') {
            steps {
                withSonarQubeEnv(installationName:'sonar-server', envOnly: true) {
                    echo 'SonarQube Analysis Completed'

                    println "${env.SONAR_CONFIG_NAME} "
                    println "${env.SONAR_HOST_URL} "
                    println "${env.SONAR_AUTH_TOKEN} "                    
                }
            }
        }

        stage('Run Tests') {
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