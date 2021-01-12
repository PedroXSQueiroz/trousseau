from node:latest

RUN npm install -g @ionic/cli && \
    npm install -g @angular/cli && \
    npm install -g cordova

EXPOSE 8100:8100

ENTRYPOINT ["sh", "/app/startup-app.sh"]
