pipeline {
    agent any

    environment {
        IMAGE_NAME = "food-storage-app"
        REGISTRY = "docker.io"
        DOCKER_CREDENTIALS = "docker-hub-credentials" // Replace with your Jenkins Docker credentials ID
        GIT_CREDENTIALS = '59b669ee-adbb-44c8-b6e0-dacdf9c14c4f' // Replace with your Git credentials ID
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout the repository with credentials
                git branch: 'main', 
                    url: 'https://github.com/ihsenbargaoui/food-storage-app.git',
                    credentialsId: GIT_CREDENTIALS // Utilise l'ID des credentials pour Git
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
