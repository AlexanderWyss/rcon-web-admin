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
        sh 'docker run -d --expose 80 --expose 443 --restart unless-stopped --name rcon -v /docker/rcon/db:/opt/rcon-web-admin/db -e VIRTUAL_HOST=rcon.wyss.tech -e VIRTUAL_PORT=80 -e LETSENCRYPT_HOST=rcon.wyss.tech alexanderwyss/rcon:latest'
    }
}
