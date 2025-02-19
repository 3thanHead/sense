package config

import (
	"github.com/joho/godotenv"
)

type RedisConfig struct {
	Host     string
	Port     string
	Password string
}

func NewRedisConfig() *RedisConfig {
	godotenv.Load(".env")

	return &RedisConfig{
		Host: "localhost:6379",
	}
}
