pipeline{
    agent any
    tools {
        nodejs 'node.jsv20.0.0'
    }
    stages{
        stage("pull"){
            steps {
                sh 'sudo rm -rf public'
                sh 'sudo rm -rf logs'
                git branch: 'master', credentialsId: '0ece98b6-d540-446d-864e-619921b95636', url: 'git@github.com:liliphoenix/full-featured.git'
            }
        }
        stage("project build"){
            steps {
                sh 'npm install'
                sh 'npm run build'
                sh 'sudo rm -rf node_modules'
            }
        }
        stage("docker build"){
            steps {
                sh 'docker build -t xxx:v${BUILD_NUMBER} . '
            }
        }
        stage("docker run"){
            steps {
                sh 'docker stop $(docker ps -a -q)'
                sh 'docker run -p 80:80 --name xxx_v${BUILD_NUMBER} -d xxx:v${BUILD_NUMBER}'
            }
        }
    }
}
