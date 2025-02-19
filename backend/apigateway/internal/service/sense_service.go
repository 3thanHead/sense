package service

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/3thanHead/apigateway/graph/model"
	"github.com/redis/go-redis/v9"
)

func ReceiveColors(ctx context.Context, redisMessages <-chan *redis.Message) <-chan *model.Color {
	colorChan := make(chan *model.Color)
	color := &model.Color{}

	go func() {
		defer close(colorChan)
		for {
			msg := <-redisMessages

			fmt.Println("Received message:", msg.Payload)

			if err := json.Unmarshal([]byte(msg.Payload), &color); err != nil {
				fmt.Println("Error unmarshalling color:", err)
				continue
			}

			select {
			case colorChan <- color:
			case <-ctx.Done():
				return
			}
		}
	}()

	return colorChan
}
