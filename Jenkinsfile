node {
    def dockerImage
    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        dockerImage = docker.build("alexanderwyss/rcon")
    }
    stage('Deploy') {
        sh 'docker stop rcon || true && docker rm -f rcon || true'
        sh 'docker run -d -p 4326:4326 -p 4327:4327 --restart unless-stopped --name rcon -v /docker/rcon/db:/opt/rcon-web-admin/db alexanderwyss/rcon:latest'
    }
}
