FROM centos:7
MAINTAINER Mitya K. <dm-kamaev@rambler.ru>
ENV NODEJS_VERSION=v10.9.0
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

RUN yum -y install make gcc gcc-c++ && yum -y clean all
RUN yum -y install wget
RUN cd /usr/local && \
    wget https://nodejs.org/dist/${NODEJS_VERSION}/node-${NODEJS_VERSION}-linux-x64.tar.gz && \
    tar --strip-components 1 -xzf ./node-${NODEJS_VERSION}-linux-x64.tar.gz && \
    rm -f ./node-${NODEJS_VERSION}-linux-x64.tar.gz

RUN npm i pm2 -g    

# set your workdir
WORKDIR /home/dmitrijd/node_docker

# access to folder for logs
VOLUME ["./log"]

COPY . .

#EXPOSE 80:5000

CMD ["./start.sh"]
