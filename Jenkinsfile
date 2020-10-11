pipeline {
    agent any
    stages {
        stage('front end deploy') {
            steps {
                echo '安装依赖'
                nodejs('nodejs-12.16') {
                    sh 'yarn'
                    sh 'yarn run build'
                }
            }
        }
        stage('release') {
            steps {
                echo '上传到服务器'
                sshagent(['km-test-credentials']) {
                    sh 'ssh -o StrictHostKeyChecking=no root@121.41.16.183'
                }
            }
        }
    }
}
