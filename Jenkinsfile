pipeline {
    agent any
    stages {
        stage('front end deploy') {
            steps {
                noodejs('nodejs-12.16') {
                    echo '安装依赖'
                    sh 'yarn'
                    echo '开始打包应用'
                    sh 'yarn run build'
                }
            }
    }
}
