node {
    def dockerImage
    stage('Clone repository') {
        checkout scm
    }
    stage('Build image') {
        dockerImage = docker.build("alexanderwyss/rcon")
    }
    stage('Push image') {
        String version = "1";
        docker.withRegistry('https://registry.hub.docker.com', 'docker-hub-credentials') {
            dockerImage.push(version)
            dockerImage.push("latest")
        }
    }
    stage('Deploy') {
        sh 'docker pull alexanderwyss/rcon:latest'
        sh 'docker stop rcon || true && docker rm -f rcon || true'
        sh 'docker run -d -p 4326:4326 -p 4327:4327 --restart unless-stopped --name rcon -v /docker/rcon/db:/opt/rcon-web-admin/db alexanderwyss/rcon:latest'
    }
}
