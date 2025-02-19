package graph

import (
	"github.com/3thanHead/apigateway/internal/config"
	"github.com/3thanHead/apigateway/internal/service"
)

// This file will not be regenerated automatically.
//
// It serves as dependency injection for your app, add any dependencies you require here.

type Resolver struct{}

var redisService *service.RedisService

func init() {
	redisService = service.NewRedisService(config.NewRedisConfig())
}
