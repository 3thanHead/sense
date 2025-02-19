package main

import (
	"log"
	"net/http"
	"os"
	"time"

	"github.com/3thanHead/apigateway/graph"
	"github.com/99designs/gqlgen/graphql/handler"
	"github.com/99designs/gqlgen/graphql/handler/extension"
	"github.com/99designs/gqlgen/graphql/handler/lru"
	"github.com/99designs/gqlgen/graphql/handler/transport"
	"github.com/99designs/gqlgen/graphql/playground"
	"github.com/gorilla/websocket"
	"github.com/vektah/gqlparser/v2/ast"
)

const defaultPort = "8080"

func main() {
	port := os.Getenv("PORT")
	if port == "" {
		port = defaultPort
	}

	staticFilesDir := os.Getenv("STATIC_FILES_DIR")

	if staticFilesDir == "" {
		staticFilesDir = "/www"
	}

	srv := handler.New(graph.NewExecutableSchema(graph.Config{Resolvers: &graph.Resolver{}}))

	// add ws transport configured by ourselves
	srv.AddTransport(&transport.Websocket{
		Upgrader: websocket.Upgrader{
			//ReadBufferSize:  1024,
			//WriteBufferSize: 1024,
			CheckOrigin: func(r *http.Request) bool {
				// add checking origin logic to decide return true or false
				return true
			},
		},
		KeepAlivePingInterval: 10 * time.Second,
	})
	srv.AddTransport(transport.Options{})
	srv.AddTransport(transport.GET{})
	srv.AddTransport(transport.POST{})

	srv.SetQueryCache(lru.New[*ast.QueryDocument](1000))

	srv.Use(extension.Introspection{})
	srv.Use(extension.AutomaticPersistedQuery{
		Cache: lru.New[string](100),
	})

	http.Handle("/playground", playground.Handler("GraphQL playground", "/graphql"))
	http.Handle("/graphql", srv)
	http.Handle("/", http.FileServer(http.Dir(staticFilesDir)))

	log.Printf("connect to http://localhost:%s/ for GraphQL playground", port)
	log.Fatal(http.ListenAndServe(":"+port, nil))
}
