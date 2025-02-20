package service

import (
	"context"
	"encoding/json"
	"fmt"

	"github.com/redis/go-redis/v9"
)

func ReceiveData[T interface{}](ctx context.Context, redisMessages <-chan *redis.Message, outputChan chan<- T) {
	go func() {
		defer close(outputChan)
		for {
			select {
			case msg := <-redisMessages:
				fmt.Println("Received message:", msg.Payload)

				var data T
				if err := json.Unmarshal([]byte(msg.Payload), &data); err != nil {
					fmt.Println("Error unmarshalling data:", err)
					continue
				}

				select {
				case outputChan <- data:
				case <-ctx.Done():
					return
				}
			case <-ctx.Done():
				return
			}
		}
	}()
}
