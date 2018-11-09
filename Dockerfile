FROM centos:7
MAINTAINER Mitya K. <dm-kamaev@rambler.ru>
ENV NODEJS_VERSION=v10.9.0
ENV PATH=/usr/local/sbin:/usr/local/bin:/usr/sbin:/usr/bin:/root/bin

RUN yum -y install make gcc gcc-c++ && \
    yum -y clean all && \
    yum -y install wget && \
    yum -y clean all && \
    cd /usr/local && \
    wget https://nodejs.org/dist/${NODEJS_VERSION}/node-${NODEJS_VERSION}-linux-x64.tar.gz && \
    yum -y remove wget && \
    tar --strip-components 1 -xzf ./node-${NODEJS_VERSION}-linux-x64.tar.gz && \
    rm -f ./node-${NODEJS_VERSION}-linux-x64.tar.gz && \
    npm i pm2 -g

# set workdir in container
WORKDIR /node_docker

# access to folder for logs
#VOLUME ["./log"]

COPY . .

#EXPOSE 80:5000

CMD ["./start.sh"]





