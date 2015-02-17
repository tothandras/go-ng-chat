FROM centos:latest
MAINTAINER Andras Toth <andras.toth93@gmail.com>

RUN yum update -y
RUN yum install -y wget git hg golang

ENV GOPATH /gopath
ENV PATH $PATH:$GOROOT/bin:$GOPATH/bin

ADD . /gopath/src/github.com/tothandras/go-ng-chat
RUN go get -v -d all
RUN go install github.com/tothandras/go-ng-chat
ENTRYPOINT go-ng-chat
EXPOSE 8080
