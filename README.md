CHAT
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
