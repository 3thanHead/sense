package service

import (
	"context"

	"github.com/3thanHead/apigateway/internal/config"
	"github.com/redis/go-redis/v9"
)

var ctx = context.Background()

type RedisService struct {
	client *redis.Client
}

func NewRedisService(config *config.RedisConfig) *RedisService {
	client := redis.NewClient(&redis.Options{
		Addr:     config.Host,
		Password: config.Password,
	})
	return &RedisService{client: client}
}

func (r *RedisService) Subscribe(channel string) <-chan *redis.Message {
	sub := r.client.Subscribe(ctx, channel)
	ch := sub.Channel()
	return ch
}
