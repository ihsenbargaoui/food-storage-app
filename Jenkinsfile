
pipeline {
    agent any

    environment {
        IMAGE_NAME = "food-storage-app"
        REGISTRY = "docker.io"
        DOCKER_CREDENTIALS = "docker-hub-credentials" // Replace with your Jenkins Docker credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository
                git branch: 'main', url: 'https://github.com/your-username/food-storage-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Install dependencies on the agent
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build the NestJS application
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Build Docker image
                    sh 'docker build -t $REGISTRY/$IMAGE_NAME .'
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    // Login to Docker registry
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login --username $DOCKER_USER --password-stdin'
                    }

                    // Push Docker image to the registry
                    sh 'docker push $REGISTRY/$IMAGE_NAME'
                }
            }
        }

        stage('Deploy to Server') {
            steps {
                script {
                    // Deploy to server using SSH or other deployment methods
                    // This step assumes you have SSH setup for your server
                    sshagent(['your-ssh-credentials-id']) {
                        sh '''
                            ssh -o StrictHostKeyChecking=no your-user@your-server-ip <<EOF
                                docker pull $REGISTRY/$IMAGE_NAME
                                docker stop food-storage-app || true
                                docker rm food-storage-app || true
                                docker run -d -p 3000:3000 --name food-storage-app $REGISTRY/$IMAGE_NAME
                            EOF
                        '''
                    }
                }
            }
        }
    }

    post {
        always {
            // Clean up any resources if needed
            cleanWs()
        }
    }
}

