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
            agent any
            steps {
                script {
                    scannerHome = tool 'sonar-scanner';
                }
                withSonarQubeEnv(installationName:'sonar-server', envOnly: false) {                    
                    sh "sonar-scanner -Dsonar.projectKey=node-app  -Dsonar.host.url=${env.SONAR_HOST_URL} -Dsonar.token=${env.SONAR_AUTH_TOKEN}"
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

        stage('Upload docker image') {
            steps {
                script {
                    withCredentials([usernamePassword(credentialsId: 'nexus-user', passwordVariable: 'PASSWORD', usernameVariable: 'USERNAME')]) {
                        sh 'docker login -u $USERNAME -p $PASSWORD ${NEXUS_URL}'
                        sh 'docker tag acnaweb/node-app:latest ${NEXUS_URL}/acnaweb/node-app'
                        sh 'docker push ${NEXUS_URL}/acnaweb/node-app'
                    }                    
                }
            } 
        }         
    }
}    
