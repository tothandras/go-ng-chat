package main

import (
    "fmt"
    "html"
    "log"
    "net/http"
    "strings"

    "github.com/GeertJohan/go.rice"
)

func api(w http.ResponseWriter, r *http.Request) {
    fmt.Fprintf(w, "Hello, %q", html.EscapeString(r.URL.Path))
}

func fileHandler(w http.ResponseWriter, r *http.Request) {
    url := r.URL.String()
    if strings.Contains(url, ".") {
        url = "/"
    }
    box := rice.MustFindBox("static")
    http.StripPrefix(url, http.FileServer(box.HTTPBox())).ServeHTTP(w, r)
}

func main() {
    http.HandleFunc("/api", api)
    http.HandleFunc("/", fileHandler)

    log.Fatal(http.ListenAndServe(":8080", nil))
}
