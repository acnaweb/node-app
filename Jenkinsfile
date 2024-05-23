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
                withSonarQubeEnv(installationName:'sonar-server', envOnly: false) {
                    sh 'mvn clean package sonar:sonar'
                    // bat '''mvn clean verify sonar:sonar -Dsonar.projectKey=${env.SONAR_AUTH_TOKEN} -Dsonar.projectName='node-app' -Dsonar.host.url=${env.SONAR_HOST_URL}'''

                    // echo 'SonarQube Analysis Completed'

                    println "${env.SONAR_CONFIG_NAME} "
                    println "${env.SONAR_HOST_URL} "
                    println "${env.SONAR_AUTH_TOKEN} "                    
                }
            }
        }

        stage("Quality Gate"){
            steps {
              timeout(time: 1, unit: 'HOURS') {
                waitForQualityGate abortPipeline: true
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