FROM ubuntu:16.04
ADD install.sh /usr/bin/install.sh
ADD installEpicDemon.sh  /usr/bin/installEpicDemon.sh
RUN mkdir /app/
ADD package.json /app/
ADD package-lock.json /app/
ADD installEpicDemon.sh /app/
ADD dockerRun.sh /app/
ADD createConfig.js /app/
ADD app.js /app/
ADD Dockerfile /app/

WORKDIR /app
RUN mkdir /config/
RUN chmod +x /usr/bin/installEpicDemon.sh
RUN chmod +x  /usr/bin/install.sh
RUN apt-get update -y
RUN apt-get install wget -y
RUN /bin/bash -x /usr/bin/installEpicDemon.sh
RUN apt-get install -y nodejs
RUN apt-get install -y npm
RUN npm install
RUN apt-get install -y vim

RUN apt install dbus-user-session -y
RUN mkdir -p /run/dbus
RUN dbus-daemon --system
RUN systemctl restart dbus
RUN apt install net-tools -y
EXPOSE 3000
EXPOSE 1255
ENTRYPOINT ["nodejs"]
CMD ["app.js", "3000"]
