pipeline {
    agent any

    environment {
        IMAGE_NAME = "food-storage-app"
        REGISTRY = "docker.io"
        DOCKER_CREDENTIALS = "docker-hub-credentials" // Remplacez par votre ID de credentials Docker Hub
        K8S_CLUSTER_NAME = "votre-cluster-k8s" // Nom de votre cluster Kubernetes
        K8S_NAMESPACE = "default" // Remplacez par le namespace approprié si nécessaire
        KUBECONFIG_CREDENTIALS = "kubeconfig-credentials" // Remplacez par vos credentials Kubernetes
    }

    stages {
        stage('Checkout') {
            steps {
                // Checkout le dépôt
                git branch: 'main', url: 'https://github.com/your-username/food-storage-app.git'
            }
        }

        stage('Install Dependencies') {
            steps {
                script {
                    // Installe les dépendances sur l'agent
                    sh 'npm install'
                }
            }
        }

        stage('Build') {
            steps {
                script {
                    // Build de l'application NestJS
                    sh 'npm run build'
                }
            }
        }

        stage('Docker Build') {
            steps {
                script {
                    // Build de l'image Docker
                    sh 'docker build -t $REGISTRY/$IMAGE_NAME .'
                }
            }
        }

        stage('Docker Push') {
            steps {
                script {
                    // Connexion au registre Docker
                    withCredentials([usernamePassword(credentialsId: DOCKER_CREDENTIALS, usernameVariable: 'DOCKER_USER', passwordVariable: 'DOCKER_PASS')]) {
                        sh 'echo $DOCKER_PASS | docker login --username $DOCKER_USER --password-stdin'
                    }

                    // Push de l'image Docker vers le registre
                    sh 'docker push $REGISTRY/$IMAGE_NAME'
                }
            }
        }

        stage('Deploy to Kubernetes') {
            steps {
                script {
                    // Configuration pour Kubernetes (assurez-vous que kubectl est configuré)
                    withCredentials([file(credentialsId: KUBECONFIG_CREDENTIALS, variable: 'KUBECONFIG')]) {
                        sh 'export KUBECONFIG=$KUBECONFIG' // Configure kubectl avec le fichier kubeconfig
                    }

                    // Mettre à jour l'image dans Kubernetes
                    sh """
                        kubectl config use-context $K8S_CLUSTER_NAME
                        kubectl set image deployment/food-storage-app food-storage-app=$REGISTRY/$IMAGE_NAME:latest -n $K8S_NAMESPACE
                        kubectl rollout status deployment/food-storage-app -n $K8S_NAMESPACE
                    """
                }
            }
        }
    }

    post {
        always {
            // Nettoyage des ressources si nécessaire
            cleanWs()
        }
    }
}
