FROM node:12
WORKDIR /opt/rcon-web-admin
COPY . .
RUN npm install && \
    node src/main.js install-core-widgets && \
    chmod 0755 -R startscripts *
EXPOSE 80
VOLUME ["/opt/rcon-web-admin/db"]
ENTRYPOINT ["/usr/local/bin/node", "src/main.js", "start"]
