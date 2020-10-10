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
    }
}
