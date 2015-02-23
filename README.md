CHAT [![Codeship Status for tothandras/go-ng-chat](https://codeship.com/projects/893627f0-9dc5-0132-46b9-6e77ea26735b/status?branch=master)](https://codeship.com/projects/64613)
==

Simple Go (golang) & AngularJS application

### Fetch and install
Use "go get" to fetch and install the chat app in your workspace:

`$ go get github.com/tothandras/go-ng-app`

### Build and run the Docker image

Invoke Docker from the package directory to build an image using the Dockerfile:

`$ docker build -t chat .`

Run a container:

`$ docker run --publish 8080:8080 --name chatapp --rm chat`

### Development

Install dependencies and run gulp
```
$ npm install -g bower
$ npm install -g gulp
$ npm install && bower install
$ gulp --watch
```

Run the server

`$ go run main.go`

Open http://localhost:8080
