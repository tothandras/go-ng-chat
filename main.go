package main

import (
	"fmt"
	"html"
	"log"
	"net/http"

	"github.com/GeertJohan/go.rice"
)

func api(w http.ResponseWriter, r *http.Request) {
	fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
}

func main() {
	http.HandleFunc("/api", api)

	box := rice.MustFindBox("static")
	staticFileServer := http.StripPrefix("/", http.FileServer(box.HTTPBox()))
	http.Handle("/", staticFileServer)

	log.Fatal(http.ListenAndServe(":8080", nil))
}
