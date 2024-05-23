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
                    // bat '''mvn clean verify sonar:sonar -Dsonar.projectKey=ProjectNameSonar -Dsonar.projectName='ProjectNameSonar' -Dsonar.host.url=http://localhost:9000''' //port 9000 is default for sonar

                    echo 'SonarQube Analysis Completed'

                    println "${env.SONAR_CONFIG_NAME} "
                    println "${env.SONAR_HOST_URL} "
                    println "${env.SONAR_AUTH_TOKEN} "                    
                }
            }
        }

        stage("Quality Gate"){
            steps {
                timeout(time: 5, unit: 'MINUTES') {
                    def qg = waitForQualityGate()
                    if (qg.status != 'OK') {
                        error "Pipeline aborted due to quality gate failure: ${qg.status}"
                    }
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