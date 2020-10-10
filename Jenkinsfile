pipeline {
    agent any
    stages {
        stage('安装依赖') {
            steps {
                sh 'yarn'
            }
        }

        stage('打包') {
            steps {
                sh 'yarn run build'
            }
        }
    }
}
