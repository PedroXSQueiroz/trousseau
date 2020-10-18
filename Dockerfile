from node:latest

VOLUME . /app/

RUN npm install -g @ionic/cli && \
    npm install

EXPOSE 8100:8100

ENTRYPOINT ["sh", "/app/startup-app.sh"]
