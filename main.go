package main

import (
	"encoding/json"
	"fmt"
	"html"
	"log"
	"net/http"
	"runtime"
	"strings"
	"sync"
	"time"

	"github.com/GeertJohan/go.rice"
	"github.com/googollee/go-socket.io"
)

// Should look like path
const websocketRoom = "/chat"

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
	// sets the number of maxium goroutines to the 2 * numberCPU + 1
	runtime.GOMAXPROCS((runtime.NumCPU() * 2) + 1)
	lastMessages := []string{}
	var lmMutex sync.Mutex

	// configuring socket.io Server
	sio, err := socketio.NewServer(nil)
	if err != nil {
		log.Fatal(err)
	}

	sio.On("connection", func(so socketio.Socket) {
		so.Join(websocketRoom)

		lmMutex.Lock()
		for i := range lastMessages {
			so.Emit("message", lastMessages[i])
		}
		lmMutex.Unlock()

		so.On("send_message", func(message string) {
			res := map[string]interface{}{
				"message": message,
				"time":    time.Now().UTC(),
			}
			jsonRes, _ := json.Marshal(res)
			lmMutex.Lock()
			if len(lastMessages) == 100 {
				lastMessages = lastMessages[1:100]
			}
			lastMessages = append(lastMessages, string(jsonRes))
			lmMutex.Unlock()
			so.Emit("message", string(jsonRes))
			so.BroadcastTo(websocketRoom, "message", string(jsonRes))
		})
	})
	sio.On("error", func(so socketio.Socket, err error) {
		log.Println("error:", err)
	})

	http.Handle("/socket.io/", sio)
	http.HandleFunc("/api", api)
	http.HandleFunc("/", fileHandler)

	log.Fatal(http.ListenAndServe("0.0.0.0:8080", nil))
}
